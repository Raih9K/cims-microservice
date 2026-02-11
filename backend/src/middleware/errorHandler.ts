import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '@/types';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);

  const response: ApiResponse = {
    success: false,
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message,
  };

  if (err.name === 'ValidationError') {
    response.error = 'Validation failed';
    res.status(400).json(response);
    return;
  }

  if (err.name === 'UnauthorizedError') {
    response.error = 'Unauthorized';
    res.status(401).json(response);
    return;
  }

  if (err.name === 'JsonWebTokenError') {
    response.error = 'Invalid token';
    res.status(401).json(response);
    return;
  }

  if (err.name === 'TokenExpiredError') {
    response.error = 'Token expired';
    res.status(401).json(response);
    return;
  }

  res.status(500).json(response);
};

export const notFoundHandler = (
  req: Request,
  res: Response
): void => {
  const response: ApiResponse = {
    success: false,
    error: `Route ${req.originalUrl} not found`,
  };
  res.status(404).json(response);
};

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
  });
  
  next();
};