import { Request, Response } from 'express';
import { WarehouseService } from '@/services/warehouseService';
import { ApiResponse, PaginationParams } from '@/types';
import { validationResult } from 'express-validator';

export class WarehouseController {
  private warehouseService: WarehouseService;

  constructor() {
    this.warehouseService = new WarehouseService();
  }

  async getAllWarehouses(req: Request, res: Response): Promise<void> {
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
        sortBy: req.query.sortBy as string || 'name',
        sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'asc',
      };

      const result = await this.warehouseService.getAllWarehouses(userId, params);
      
      res.status(200).json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      } as ApiResponse);
    } catch (error) {
      console.error('Error in getAllWarehouses:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async getWarehouseById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as any).user.userId;

      const warehouse = await this.warehouseService.getWarehouseById(id, userId);
      
      if (!warehouse) {
        res.status(404).json({
          success: false,
          error: 'Warehouse not found',
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        data: warehouse,
      } as ApiResponse);
    } catch (error) {
      console.error('Error in getWarehouseById:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async createWarehouse(req: Request, res: Response): Promise<void> {
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
      const warehouseData = req.body;

      const warehouse = await this.warehouseService.createWarehouse(warehouseData, userId);
      
      res.status(201).json({
        success: true,
        data: warehouse,
        message: 'Warehouse created successfully',
      } as ApiResponse);
    } catch (error) {
      console.error('Error in createWarehouse:', error);
      if (error.message.includes('Warehouse name already exists')) {
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

  async updateWarehouse(req: Request, res: Response): Promise<void> {
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
      const warehouseData = req.body;

      const warehouse = await this.warehouseService.updateWarehouse(id, warehouseData, userId);
      
      if (!warehouse) {
        res.status(404).json({
          success: false,
          error: 'Warehouse not found',
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        data: warehouse,
        message: 'Warehouse updated successfully',
      } as ApiResponse);
    } catch (error) {
      console.error('Error in updateWarehouse:', error);
      if (error.message.includes('Warehouse name already exists')) {
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

  async deleteWarehouse(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as any).user.userId;

      const success = await this.warehouseService.deleteWarehouse(id, userId);
      
      if (!success) {
        res.status(404).json({
          success: false,
          error: 'Warehouse not found',
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Warehouse deleted successfully',
      } as ApiResponse);
    } catch (error) {
      console.error('Error in deleteWarehouse:', error);
      if (error.message.includes('Cannot delete warehouse with existing stock levels')) {
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

  async setDefaultWarehouse(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as any).user.userId;

      const warehouse = await this.warehouseService.setDefaultWarehouse(id, userId);
      
      if (!warehouse) {
        res.status(404).json({
          success: false,
          error: 'Warehouse not found',
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        data: warehouse,
        message: 'Warehouse set as default successfully',
      } as ApiResponse);
    } catch (error) {
      console.error('Error in setDefaultWarehouse:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async getWarehouseStockLevels(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as any).user.userId;
      const params: PaginationParams = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 20,
      };

      const result = await this.warehouseService.getWarehouseStockLevels(id, userId, params);
      
      res.status(200).json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      } as ApiResponse);
    } catch (error) {
      console.error('Error in getWarehouseStockLevels:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }
}

export default new WarehouseController();