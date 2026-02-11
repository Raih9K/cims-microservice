import { Request, Response } from 'express';
import { BrandService } from '@/services/brandService';
import { ApiResponse, PaginationParams } from '@/types';
import { validationResult } from 'express-validator';

export class BrandController {
  private brandService: BrandService;

  constructor() {
    this.brandService = new BrandService();
  }

  async getAllBrands(req: Request, res: Response): Promise<void> {
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
      const params: PaginationParams = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 20,
        sortBy: req.query.sortBy as string || 'brand_name',
        sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'asc',
      };

      const result = await this.brandService.getAllBrands(userId, params);
      
      res.status(200).json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      } as ApiResponse);
    } catch (error) {
      console.error('Error in getAllBrands:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async getBrandById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as any).user.userId;

      const brand = await this.brandService.getBrandById(parseInt(id), userId);
      
      if (!brand) {
        res.status(404).json({
          success: false,
          error: 'Brand not found',
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        data: brand,
      } as ApiResponse);
    } catch (error) {
      console.error('Error in getBrandById:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async createBrand(req: Request, res: Response): Promise<void> {
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
      const brandData = req.body;

      const brand = await this.brandService.createBrand(brandData, userId);
      
      res.status(201).json({
        success: true,
        data: brand,
        message: 'Brand created successfully',
      } as ApiResponse);
    } catch (error) {
      console.error('Error in createBrand:', error);
      if (error.message.includes('Brand code already exists')) {
        res.status(409).json({
          success: false,
          error: error.message,
        } as ApiResponse);
        return;
      }
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async updateBrand(req: Request, res: Response): Promise<void> {
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
      const brandData = req.body;

      const brand = await this.brandService.updateBrand(parseInt(id), brandData, userId);
      
      if (!brand) {
        res.status(404).json({
          success: false,
          error: 'Brand not found',
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        data: brand,
        message: 'Brand updated successfully',
      } as ApiResponse);
    } catch (error) {
      console.error('Error in updateBrand:', error);
      if (error.message.includes('Brand code already exists')) {
        res.status(409).json({
          success: false,
          error: error.message,
        } as ApiResponse);
        return;
      }
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async deleteBrand(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as any).user.userId;

      const success = await this.brandService.deleteBrand(parseInt(id), userId);
      
      if (!success) {
        res.status(404).json({
          success: false,
          error: 'Brand not found',
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Brand deleted successfully',
      } as ApiResponse);
    } catch (error) {
      console.error('Error in deleteBrand:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async toggleBrandStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as any).user.userId;

      const brand = await this.brandService.toggleBrandStatus(parseInt(id), userId);
      
      if (!brand) {
        res.status(404).json({
          success: false,
          error: 'Brand not found',
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        data: brand,
        message: `Brand ${brand.is_active ? 'activated' : 'deactivated'} successfully`,
      } as ApiResponse);
    } catch (error) {
      console.error('Error in toggleBrandStatus:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }
}

export default new BrandController();