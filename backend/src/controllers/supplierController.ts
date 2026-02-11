import { Request, Response } from 'express';
import { SupplierService } from '@/services/supplierService';
import { ApiResponse, PaginationParams } from '@/types';
import { validationResult } from 'express-validator';

export class SupplierController {
  private supplierService: SupplierService;

  constructor() {
    this.supplierService = new SupplierService();
  }

  async getAllSuppliers(req: Request, res: Response): Promise<void> {
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
        sortBy: req.query.sortBy as string || 'supplier_name',
        sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'asc',
      };

      const result = await this.supplierService.getAllSuppliers(userId, params);
      
      res.status(200).json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      } as ApiResponse);
    } catch (error) {
      console.error('Error in getAllSuppliers:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async getSupplierById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as any).user.userId;

      const supplier = await this.supplierService.getSupplierById(id, userId);
      
      if (!supplier) {
        res.status(404).json({
          success: false,
          error: 'Supplier not found',
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        data: supplier,
      } as ApiResponse);
    } catch (error) {
      console.error('Error in getSupplierById:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async createSupplier(req: Request, res: Response): Promise<void> {
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
      const supplierData = req.body;

      const supplier = await this.supplierService.createSupplier(supplierData, userId);
      
      res.status(201).json({
        success: true,
        data: supplier,
        message: 'Supplier created successfully',
      } as ApiResponse);
    } catch (error) {
      console.error('Error in createSupplier:', error);
      if (error.message.includes('Supplier code already exists')) {
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

  async updateSupplier(req: Request, res: Response): Promise<void> {
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
      const supplierData = req.body;

      const supplier = await this.supplierService.updateSupplier(id, supplierData, userId);
      
      if (!supplier) {
        res.status(404).json({
          success: false,
          error: 'Supplier not found',
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        data: supplier,
        message: 'Supplier updated successfully',
      } as ApiResponse);
    } catch (error) {
      console.error('Error in updateSupplier:', error);
      if (error.message.includes('Supplier code already exists')) {
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

  async deleteSupplier(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as any).user.userId;

      const success = await this.supplierService.deleteSupplier(id, userId);
      
      if (!success) {
        res.status(404).json({
          success: false,
          error: 'Supplier not found',
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Supplier deleted successfully',
      } as ApiResponse);
    } catch (error) {
      console.error('Error in deleteSupplier:', error);
      if (error.message.includes('Cannot delete supplier with existing purchase orders')) {
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

  async searchSuppliers(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.userId;
      const { q } = req.query;
      
      if (!q || typeof q !== 'string') {
        res.status(400).json({
          success: false,
          error: 'Search query is required',
        } as ApiResponse);
        return;
      }

      const suppliers = await this.supplierService.searchSuppliers(userId, q);
      
      res.status(200).json({
        success: true,
        data: suppliers,
      } as ApiResponse);
    } catch (error) {
      console.error('Error in searchSuppliers:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async getSupplierPurchaseOrders(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as any).user.userId;
      const params: PaginationParams = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 20,
        sortBy: req.query.sortBy as string || 'created_at',
        sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc',
      };

      const result = await this.supplierService.getSupplierPurchaseOrders(id, userId, params);
      
      res.status(200).json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      } as ApiResponse);
    } catch (error) {
      console.error('Error in getSupplierPurchaseOrders:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }
}

export default new SupplierController();