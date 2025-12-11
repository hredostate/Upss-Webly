
import { Request, Response } from 'express';
import { SectionModel } from '../models/SectionModel';

const sendResponse = (res: Response, data: any = null, error: string | null = null, status = 200) => {
  res.status(status).json({ data, error });
};

export const SectionController = {
  getByPageId: async (req: Request, res: Response) => {
    try {
      const { pageId } = req.params;
      const sections = await SectionModel.findByPageId(pageId);
      sendResponse(res, sections);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { pageId } = req.params;
      const { type, orderIndex } = req.body;

      if (!type || orderIndex === undefined) {
        return sendResponse(res, null, 'Type and orderIndex are required', 400);
      }

      const section = await SectionModel.create({
        ...req.body,
        pageId // Ensure pageId comes from URL
      });
      sendResponse(res, section, null, 201);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedSection = await SectionModel.update(id, req.body);
      if (!updatedSection) return sendResponse(res, null, 'Section not found', 404);
      sendResponse(res, updatedSection);
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await SectionModel.delete(id);
      sendResponse(res, { success: true });
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  },

  reorder: async (req: Request, res: Response) => {
    try {
      // Expects body: { items: [{ id: string, order: number }] } or just ordered IDs
      // The model reorder expects string[] of IDs in correct order
      const { orderedIds } = req.body;
      
      if (!Array.isArray(orderedIds)) {
        return sendResponse(res, null, 'orderedIds array is required', 400);
      }

      await SectionModel.reorder(orderedIds);
      sendResponse(res, { success: true });
    } catch (e: any) {
      sendResponse(res, null, e.message, 500);
    }
  }
};
