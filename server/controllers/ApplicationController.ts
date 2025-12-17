import { Request, Response } from 'express';
import { JobApplicationModel } from '../models/JobApplicationModel.js';
import { JobListingModel } from '../models/JobListingModel.js';
import { ApplicationStatusHistoryModel } from '../models/CareersHelperModels.js';

const sendResponse = (res: Response, data: any = null, error: string | null = null, status = 200) => {
  res.status(status).json({ data, error });
};

export const ApplicationController = {
  // Applicant endpoints
  getMyApplications: async (req: Request, res: Response) => {
    try {
      const applicantId = (req as any).applicantId;
      if (!applicantId) return sendResponse(res, null, 'Unauthorized', 401);
      
      const applications = await JobApplicationModel.findAll({ applicantId });
      sendResponse(res, applications);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  getApplicationById: async (req: Request, res: Response) => {
    try {
      const applicantId = (req as any).applicantId;
      const { id } = req.params;
      
      const application = await JobApplicationModel.findById(id);
      if (!application) return sendResponse(res, null, 'Application not found', 404);
      
      // Verify ownership if applicant
      if (applicantId && application.applicantId !== applicantId) {
        return sendResponse(res, null, 'Forbidden', 403);
      }
      
      sendResponse(res, application);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  getApplicationHistory: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const history = await ApplicationStatusHistoryModel.findByApplicationId(id);
      sendResponse(res, history);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  submitApplication: async (req: Request, res: Response) => {
    try {
      const applicantId = (req as any).applicantId;
      if (!applicantId) return sendResponse(res, null, 'Unauthorized', 401);
      
      const { jobId } = req.body;
      if (!jobId) return sendResponse(res, null, 'Job ID is required', 400);
      
      // Check if job exists and is open
      const job = await JobListingModel.findById(jobId);
      if (!job) return sendResponse(res, null, 'Job not found', 404);
      if (job.status !== 'open') return sendResponse(res, null, 'Job is not accepting applications', 400);
      
      // Check if already applied
      const existing = await JobApplicationModel.findAll({ applicantId, jobId });
      if (existing.length > 0) {
        return sendResponse(res, null, 'Already applied to this job', 409);
      }
      
      const applicationData = { ...req.body, applicantId };
      const newApplication = await JobApplicationModel.create(applicationData);
      
      // Create status history
      await ApplicationStatusHistoryModel.create(
        newApplication.id,
        null,
        'submitted',
        'Application submitted'
      );
      
      // Increment application count
      await JobListingModel.incrementApplications(jobId);
      
      sendResponse(res, newApplication, null, 201);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  withdrawApplication: async (req: Request, res: Response) => {
    try {
      const applicantId = (req as any).applicantId;
      const { id } = req.params;
      
      const application = await JobApplicationModel.findById(id);
      if (!application) return sendResponse(res, null, 'Application not found', 404);
      
      if (application.applicantId !== applicantId) {
        return sendResponse(res, null, 'Forbidden', 403);
      }
      
      const previousStatus = application.status;
      const updatedApplication = await JobApplicationModel.update(id, { status: 'withdrawn' });
      
      // Create status history
      await ApplicationStatusHistoryModel.create(
        id,
        previousStatus,
        'withdrawn',
        'Application withdrawn by applicant'
      );
      
      sendResponse(res, updatedApplication);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  // Admin/HR endpoints
  getAllApplications: async (req: Request, res: Response) => {
    try {
      const { jobId, status } = req.query;
      const filters: any = {};
      
      if (jobId) filters.jobId = jobId as string;
      if (status) filters.status = status as any;
      
      const applications = await JobApplicationModel.findAll(filters);
      sendResponse(res, applications);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  updateApplicationStatus: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status, notes } = req.body;
      const reviewedBy = (req as any).userId; // From admin auth middleware
      
      const application = await JobApplicationModel.findById(id);
      if (!application) return sendResponse(res, null, 'Application not found', 404);
      
      const previousStatus = application.status;
      const updatedApplication = await JobApplicationModel.update(id, {
        status,
        reviewedBy
      });
      
      // Create status history
      await ApplicationStatusHistoryModel.create(
        id,
        previousStatus,
        status,
        notes || `Status changed from ${previousStatus} to ${status}`,
        reviewedBy
      );
      
      sendResponse(res, updatedApplication);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  updateApplication: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedApplication = await JobApplicationModel.update(id, req.body);
      if (!updatedApplication) return sendResponse(res, null, 'Application not found', 404);
      sendResponse(res, updatedApplication);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  deleteApplication: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await JobApplicationModel.delete(id);
      sendResponse(res, { success: true });
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  }
};
