import { Request, Response } from 'express';
import { PaginationParams } from '@/types';

export const getPaginationParams = (req: Request): PaginationParams => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = Math.min(parseInt(req.query.limit as string) || 20, 100);
  const sortBy = req.query.sortBy as string || 'created_at';
  const sortOrder = (req.query.sortOrder as string)?.toLowerCase() === 'asc' ? 'asc' : 'desc';

  return { page, limit, sortBy, sortOrder };
};

export const buildSearchQuery = (search: string, searchableFields: string[]): string => {
  if (!search || searchableFields.length === 0) return '';
  
  const searchConditions = searchableFields.map(field => `${field} ILIKE '%${search}%'`);
  return `(${searchConditions.join(' OR ')})`;
};

export const sanitizeSortField = (field: string, allowedFields: string[]): string => {
  return allowedFields.includes(field) ? field : allowedFields[0];
};

export const formatApiResponse = <T>(
  success: boolean,
  data?: T,
  message?: string,
  error?: string,
  pagination?: any
) => {
  const response: any = {
    success,
  };

  if (data !== undefined) response.data = data;
  if (message) response.message = message;
  if (error) response.error = error;
  if (pagination) response.pagination = pagination;

  return response;
};

export const handleAsync = (fn: Function) => {
  return (req: Request, res: Response, next: Function) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const validateUUID = (uuid: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const calculateOffset = (page: number, limit: number): number => {
  return (page - 1) * limit;
};

export const calculateTotalPages = (total: number, limit: number): number => {
  return Math.ceil(total / limit);
};