import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { sendError } from '../utils/errors';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      sendError(res, 401, 'Access denied. No token provided.');
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      sendError(res, 500, 'Server configuration error.');
      return;
    }

    const decoded = jwt.verify(token, jwtSecret) as { id: string; email: string };
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      sendError(res, 401, 'Invalid or expired token.');
    } else {
      sendError(res, 500, 'Token verification failed.');
    }
  }
};

