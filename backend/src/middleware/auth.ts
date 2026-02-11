import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { config } from '@/config';
import { JwtPayload, ApiResponse } from '@/types';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    const response: ApiResponse = {
      success: false,
      error: 'Access token required',
    };
    res.status(401).json(response);
    return;
  }

  jwt.verify(token, config.jwt.secret, (err, decoded) => {
    if (err) {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid or expired token',
      };
      res.status(403).json(response);
      return;
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export const generateTokens = (payload: Omit<JwtPayload, 'iat' | 'exp'>) => {
  const accessToken = jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });

  const refreshToken = jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.refreshExpiresIn,
  });

  return { accessToken, refreshToken };
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, config.jwt.secret) as JwtPayload;
};