
import { Request, Response } from 'express';
import { PageModel } from '../models/PageModel';

const sendResponse = (res: Response, data: any = null, error: string | null = null, status = 200) => {
  res.status(status).json({ data, error });
};

export const PageController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      const pages = await PageModel.findAll();
      sendResponse(res, pages);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const page = await PageModel.findById(req.params.id);
      if (!page) return sendResponse(res, null, 'Page not found', 404);
      sendResponse(res, page);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  getBySlug: async (req: Request, res: Response) => {
    try {
      const page = await PageModel.findBySlug(req.params.slug);
      if (!page) return sendResponse(res, null, 'Page not found', 404);
      sendResponse(res, page);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { slug, title } = req.body;
      if (!slug || !title) {
        return sendResponse(res, null, 'Slug and Title are required', 400);
      }
      
      const existing = await PageModel.findBySlug(slug);
      if (existing) {
        return sendResponse(res, null, 'Slug already exists', 409);
      }

      const newPage = await PageModel.create(req.body);
      sendResponse(res, newPage, null, 201);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedPage = await PageModel.update(id, req.body);
      if (!updatedPage) return sendResponse(res, null, 'Page not found', 404);
      sendResponse(res, updatedPage);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await PageModel.delete(id);
      sendResponse(res, { success: true });
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  }
};
