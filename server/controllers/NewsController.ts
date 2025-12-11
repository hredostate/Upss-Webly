
import { Request, Response } from 'express';
import { NewsItemModel } from '../models/NewsItemModel';

const sendResponse = (res: Response, data: any = null, error: string | null = null, status = 200) => {
  res.status(status).json({ data, error });
};

export const NewsController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const featured = req.query.featured === 'true';
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const news = await NewsItemModel.findAll({ featured, limit });
      sendResponse(res, news);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  getBySlug: async (req: Request, res: Response) => {
    try {
      const news = await NewsItemModel.findBySlug(req.params.slug);
      if (!news) return sendResponse(res, null, 'News item not found', 404);
      sendResponse(res, news);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const news = await NewsItemModel.findById(req.params.id);
      if (!news) return sendResponse(res, null, 'News item not found', 404);
      sendResponse(res, news);
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
      const existing = await NewsItemModel.findBySlug(slug);
      if (existing) {
        return sendResponse(res, null, 'Slug already exists', 409);
      }
      const news = await NewsItemModel.create(req.body);
      sendResponse(res, news, null, 201);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updated = await NewsItemModel.update(id, req.body);
      if (!updated) return sendResponse(res, null, 'News item not found', 404);
      sendResponse(res, updated);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await NewsItemModel.delete(id);
      sendResponse(res, { success: true });
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  }
};
