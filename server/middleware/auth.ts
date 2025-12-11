import { Request, Response, NextFunction } from 'express';

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-admin-token'];

  // In production, verify JWT or session
  if (!token || token !== 'dummy_token') {
    return res.status(401).json({ 
      data: null, 
      error: 'Unauthorized: Invalid or missing token' 
    });
  }

  next();
};