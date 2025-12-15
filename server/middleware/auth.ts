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

export const requireApplicant = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-applicant-token'];

  // SECURITY WARNING: Temporary token implementation for development
  // TODO: Replace with proper JWT verification before production deployment
  if (!token) {
    return res.status(401).json({ 
      data: null, 
      error: 'Unauthorized: Missing token' 
    });
  }

  // Simple token parsing (temp-token-{applicantId})
  // In production, use proper JWT verification
  const parts = token.toString().split('-');
  if (parts.length === 3 && parts[0] === 'temp' && parts[1] === 'token') {
    (req as any).applicantId = parts[2];
    next();
  } else {
    return res.status(401).json({ 
      data: null, 
      error: 'Unauthorized: Invalid token' 
    });
  }
};