import { Request, Response } from 'express';
import { ImageService } from '@/services/imageService';
import { ApiResponse, PaginationParams } from '@/types';
import { validationResult } from 'express-validator';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';

export class ImageController {
  private imageService: ImageService;

  constructor() {
    this.imageService = new ImageService();
  }

  async uploadImage(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: errors.array(),
        } as ApiResponse);
        return;
      }

      if (!req.file) {
        res.status(400).json({
          success: false,
          error: 'No file uploaded',
        } as ApiResponse);
        return;
      }

      const userId = (req as any).user.userId;
      const imageData = {
        alt_text: req.body.alt_text,
        position: parseInt(req.body.position) || 1,
        is_main: req.body.is_main === 'true',
        stock_item_id: req.body.stock_item_id,
        listing_id: req.body.listing_id,
        kit_id: req.body.kit_id,
      };

      const image = await this.imageService.createImage(req.file, imageData, userId);
      
      res.status(201).json({
        success: true,
        data: image,
        message: 'Image uploaded successfully',
      } as ApiResponse);
    } catch (error) {
      console.error('Error in uploadImage:', error);
      
      if (req.file) {
        fs.unlink(req.file.path).catch(console.error);
      }

      res.status(500).json({
        success: false,
        error: error.message || 'Internal server error',
      } as ApiResponse);
    }
  }

  async getAllImages(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: errors.array(),
        } as ApiResponse);
        return;
      }

      const userId = (req as any).user.userId;
      const filters = {
        stock_item_id: req.query.stock_item_id as string,
        listing_id: req.query.listing_id as string,
        kit_id: req.query.kit_id as string,
        is_active: req.query.is_active === 'true' ? true : req.query.is_active === 'false' ? false : undefined,
      };
      const params: PaginationParams = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 20,
        sortBy: req.query.sortBy as string || 'position',
        sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'asc',
      };

      const result = await this.imageService.getAllImages(userId, filters, params);
      
      res.status(200).json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      } as ApiResponse);
    } catch (error) {
      console.error('Error in getAllImages:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async getImageById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as any).user.userId;

      const image = await this.imageService.getImageById(parseInt(id), userId);
      
      if (!image) {
        res.status(404).json({
          success: false,
          error: 'Image not found',
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        data: image,
      } as ApiResponse);
    } catch (error) {
      console.error('Error in getImageById:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async updateImage(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: errors.array(),
        } as ApiResponse);
        return;
      }

      const { id } = req.params;
      const userId = (req as any).user.userId;
      const imageData = req.body;

      const image = await this.imageService.updateImage(parseInt(id), imageData, userId);
      
      if (!image) {
        res.status(404).json({
          success: false,
          error: 'Image not found',
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        data: image,
        message: 'Image updated successfully',
      } as ApiResponse);
    } catch (error) {
      console.error('Error in updateImage:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async deleteImage(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as any).user.userId;

      const success = await this.imageService.deleteImage(parseInt(id), userId);
      
      if (!success) {
        res.status(404).json({
          success: false,
          error: 'Image not found',
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Image deleted successfully',
      } as ApiResponse);
    } catch (error) {
      console.error('Error in deleteImage:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async setMainImage(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as any).user.userId;

      const image = await this.imageService.setMainImage(parseInt(id), userId);
      
      if (!image) {
        res.status(404).json({
          success: false,
          error: 'Image not found',
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        data: image,
        message: 'Image set as main successfully',
      } as ApiResponse);
    } catch (error) {
      console.error('Error in setMainImage:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async reorderImages(req: Request, res: Response): Promise<void> {
    try {
      const { images } = req.body;
      const userId = (req as any).user.userId;

      if (!Array.isArray(images) || images.length === 0) {
        res.status(400).json({
          success: false,
          error: 'Images array is required',
        } as ApiResponse);
        return;
      }

      const result = await this.imageService.reorderImages(images, userId);
      
      res.status(200).json({
        success: true,
        data: result,
        message: 'Images reordered successfully',
      } as ApiResponse);
    } catch (error) {
      console.error('Error in reorderImages:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async getUserStorageUsage(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.userId;

      const usage = await this.imageService.getUserStorageUsage(userId);
      
      res.status(200).json({
        success: true,
        data: usage,
      } as ApiResponse);
    } catch (error) {
      console.error('Error in getUserStorageUsage:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }
}

export default new ImageController();