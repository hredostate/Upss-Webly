import { Request, Response } from 'express';
import { JobListingModel } from '../models/JobListingModel.js';
import { JobCategoryModel } from '../models/JobCategoryModel.js';

const sendResponse = (res: Response, data: any = null, error: string | null = null, status = 200) => {
  res.status(status).json({ data, error });
};

export const JobController = {
  // Public endpoints
  getAllJobs: async (req: Request, res: Response) => {
    try {
      const { status, categoryId, featured } = req.query;
      const filters: any = {};
      
      if (status) filters.status = status as string;
      if (categoryId) filters.categoryId = categoryId as string;
      if (featured) filters.isFeatured = featured === 'true';
      
      const jobs = await JobListingModel.findAll(filters);
      sendResponse(res, jobs);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  getJobBySlug: async (req: Request, res: Response) => {
    try {
      const job = await JobListingModel.findBySlug(req.params.slug);
      if (!job) return sendResponse(res, null, 'Job not found', 404);
      
      // Increment view count
      await JobListingModel.incrementViews(job.id);
      
      sendResponse(res, job);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  getAllCategories: async (_req: Request, res: Response) => {
    try {
      const categories = await JobCategoryModel.findAll();
      sendResponse(res, categories);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  // Admin endpoints
  getJobById: async (req: Request, res: Response) => {
    try {
      const job = await JobListingModel.findById(req.params.id);
      if (!job) return sendResponse(res, null, 'Job not found', 404);
      sendResponse(res, job);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  createJob: async (req: Request, res: Response) => {
    try {
      const { title, slug } = req.body;
      if (!title || !slug) {
        return sendResponse(res, null, 'Title and slug are required', 400);
      }
      
      const existing = await JobListingModel.findBySlug(slug);
      if (existing) {
        return sendResponse(res, null, 'Slug already exists', 409);
      }

      const newJob = await JobListingModel.create(req.body);
      sendResponse(res, newJob, null, 201);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  updateJob: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedJob = await JobListingModel.update(id, req.body);
      if (!updatedJob) return sendResponse(res, null, 'Job not found', 404);
      sendResponse(res, updatedJob);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  deleteJob: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await JobListingModel.delete(id);
      sendResponse(res, { success: true });
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  // Category management
  createCategory: async (req: Request, res: Response) => {
    try {
      const { name, slug } = req.body;
      if (!name || !slug) {
        return sendResponse(res, null, 'Name and slug are required', 400);
      }
      
      const existing = await JobCategoryModel.findBySlug(slug);
      if (existing) {
        return sendResponse(res, null, 'Slug already exists', 409);
      }

      const newCategory = await JobCategoryModel.create(req.body);
      sendResponse(res, newCategory, null, 201);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  updateCategory: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedCategory = await JobCategoryModel.update(id, req.body);
      if (!updatedCategory) return sendResponse(res, null, 'Category not found', 404);
      sendResponse(res, updatedCategory);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  deleteCategory: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await JobCategoryModel.delete(id);
      sendResponse(res, { success: true });
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  }
};
