
import { Request, Response } from 'express';

export const AuthController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Simple stub authentication
    // In a real app, hash passwords and check DB
    if (email === 'admin@upss.edu.ng' && password === 'admin123') {
      return res.json({
        data: {
          token: 'upss_fake_jwt_token_' + Date.now(),
          user: {
            id: 'admin-1',
            name: 'UPSS Administrator',
            email: 'admin@upss.edu.ng',
            role: 'admin'
          }
        },
        error: null
      });
    }

    return res.status(401).json({
      data: null,
      error: 'Invalid credentials'
    });
  }
};
