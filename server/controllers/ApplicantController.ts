import { Request, Response } from 'express';
import { JobApplicantModel } from '../models/JobApplicantModel';
import { SavedJobModel, JobAlertModel } from '../models/CareersHelperModels';

const sendResponse = (res: Response, data: any = null, error: string | null = null, status = 200) => {
  res.status(status).json({ data, error });
};

export const ApplicantController = {
  // Auth endpoints
  register: async (req: Request, res: Response) => {
    try {
      const { email, password, firstName, lastName } = req.body;
      
      if (!email || !password || !firstName || !lastName) {
        return sendResponse(res, null, 'All fields are required', 400);
      }
      
      const existing = await JobApplicantModel.findByEmail(email);
      if (existing) {
        return sendResponse(res, null, 'Email already registered', 409);
      }
      
      const newApplicant = await JobApplicantModel.create(req.body);
      
      // Remove password hash from response
      const { passwordHash, ...applicantData } = newApplicant;
      
      sendResponse(res, applicantData, null, 201);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return sendResponse(res, null, 'Email and password are required', 400);
      }
      
      const applicant = await JobApplicantModel.verifyPassword(email, password);
      if (!applicant) {
        return sendResponse(res, null, 'Invalid credentials', 401);
      }
      
      if (!applicant.isActive) {
        return sendResponse(res, null, 'Account is deactivated', 403);
      }
      
      // Remove password hash from response
      const { passwordHash, ...applicantData } = applicant;
      
      // In production, generate JWT token here
      sendResponse(res, { applicant: applicantData, token: `temp-token-${applicant.id}` });
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  // Profile endpoints
  getProfile: async (req: Request, res: Response) => {
    try {
      const applicantId = (req as any).applicantId;
      if (!applicantId) return sendResponse(res, null, 'Unauthorized', 401);
      
      const applicant = await JobApplicantModel.findById(applicantId);
      if (!applicant) return sendResponse(res, null, 'Applicant not found', 404);
      
      const { passwordHash, ...applicantData } = applicant;
      sendResponse(res, applicantData);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  updateProfile: async (req: Request, res: Response) => {
    try {
      const applicantId = (req as any).applicantId;
      if (!applicantId) return sendResponse(res, null, 'Unauthorized', 401);
      
      const updatedApplicant = await JobApplicantModel.update(applicantId, req.body);
      if (!updatedApplicant) return sendResponse(res, null, 'Applicant not found', 404);
      
      const { passwordHash, ...applicantData } = updatedApplicant;
      sendResponse(res, applicantData);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  // Saved jobs endpoints
  getSavedJobs: async (req: Request, res: Response) => {
    try {
      const applicantId = (req as any).applicantId;
      if (!applicantId) return sendResponse(res, null, 'Unauthorized', 401);
      
      const savedJobs = await SavedJobModel.findByApplicantId(applicantId);
      sendResponse(res, savedJobs);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  saveJob: async (req: Request, res: Response) => {
    try {
      const applicantId = (req as any).applicantId;
      if (!applicantId) return sendResponse(res, null, 'Unauthorized', 401);
      
      const { jobId } = req.body;
      if (!jobId) return sendResponse(res, null, 'Job ID is required', 400);
      
      const savedJob = await SavedJobModel.create(applicantId, jobId);
      sendResponse(res, savedJob, null, 201);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  unsaveJob: async (req: Request, res: Response) => {
    try {
      const applicantId = (req as any).applicantId;
      if (!applicantId) return sendResponse(res, null, 'Unauthorized', 401);
      
      const { jobId } = req.params;
      await SavedJobModel.delete(applicantId, jobId);
      sendResponse(res, { success: true });
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  // Job alerts endpoints
  getJobAlerts: async (req: Request, res: Response) => {
    try {
      const applicantId = (req as any).applicantId;
      if (!applicantId) return sendResponse(res, null, 'Unauthorized', 401);
      
      const alerts = await JobAlertModel.findByApplicantId(applicantId);
      sendResponse(res, alerts);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  createJobAlert: async (req: Request, res: Response) => {
    try {
      const applicantId = (req as any).applicantId;
      if (!applicantId) return sendResponse(res, null, 'Unauthorized', 401);
      
      const alertData = { ...req.body, applicantId };
      const newAlert = await JobAlertModel.create(alertData);
      sendResponse(res, newAlert, null, 201);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  updateJobAlert: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedAlert = await JobAlertModel.update(id, req.body);
      if (!updatedAlert) return sendResponse(res, null, 'Alert not found', 404);
      sendResponse(res, updatedAlert);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  deleteJobAlert: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await JobAlertModel.delete(id);
      sendResponse(res, { success: true });
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  }
};
