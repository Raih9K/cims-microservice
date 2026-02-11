import { Request, Response } from 'express';
import { PurchaseOrderService } from '@/services/purchaseOrderService';
import { ApiResponse, PaginationParams } from '@/types';
import { validationResult } from 'express-validator';

export class PurchaseOrderController {
  private purchaseOrderService: PurchaseOrderService;

  constructor() {
    this.purchaseOrderService = new PurchaseOrderService();
  }

  async getAllPurchaseOrders(req: Request, res: Response): Promise<void> {
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
        supplier_id: req.query.supplier_id as string,
        status: req.query.status as string,
      };
      const params: PaginationParams = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 20,
        sortBy: req.query.sortBy as string || 'created_at',
        sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc',
      };

      const result = await this.purchaseOrderService.getAllPurchaseOrders(userId, filters, params);
      
      res.status(200).json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      } as ApiResponse);
    } catch (error) {
      console.error('Error in getAllPurchaseOrders:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async getPurchaseOrderById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as any).user.userId;

      const purchaseOrder = await this.purchaseOrderService.getPurchaseOrderById(id, userId);
      
      if (!purchaseOrder) {
        res.status(404).json({
          success: false,
          error: 'Purchase order not found',
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        data: purchaseOrder,
      } as ApiResponse);
    } catch (error) {
      console.error('Error in getPurchaseOrderById:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async createPurchaseOrder(req: Request, res: Response): Promise<void> {
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
      const purchaseOrderData = req.body;

      const purchaseOrder = await this.purchaseOrderService.createPurchaseOrder(purchaseOrderData, userId);
      
      res.status(201).json({
        success: true,
        data: purchaseOrder,
        message: 'Purchase order created successfully',
      } as ApiResponse);
    } catch (error) {
      console.error('Error in createPurchaseOrder:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Internal server error',
      } as ApiResponse);
    }
  }

  async updatePurchaseOrder(req: Request, res: Response): Promise<void> {
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
      const purchaseOrderData = req.body;

      const purchaseOrder = await this.purchaseOrderService.updatePurchaseOrder(id, purchaseOrderData, userId);
      
      if (!purchaseOrder) {
        res.status(404).json({
          success: false,
          error: 'Purchase order not found',
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        data: purchaseOrder,
        message: 'Purchase order updated successfully',
      } as ApiResponse);
    } catch (error) {
      console.error('Error in updatePurchaseOrder:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Internal server error',
      } as ApiResponse);
    }
  }

  async deletePurchaseOrder(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as any).user.userId;

      const success = await this.purchaseOrderService.deletePurchaseOrder(id, userId);
      
      if (!success) {
        res.status(404).json({
          success: false,
          error: 'Purchase order not found',
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Purchase order deleted successfully',
      } as ApiResponse);
    } catch (error) {
      console.error('Error in deletePurchaseOrder:', error);
      if (error.message.includes('Cannot delete purchase order')) {
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

  async receivePurchaseOrder(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as any).user.userId;
      const { items } = req.body;

      if (!Array.isArray(items) || items.length === 0) {
        res.status(400).json({
          success: false,
          error: 'Items array is required',
        } as ApiResponse);
        return;
      }

      const purchaseOrder = await this.purchaseOrderService.receivePurchaseOrder(id, items, userId);
      
      if (!purchaseOrder) {
        res.status(404).json({
          success: false,
          error: 'Purchase order not found',
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        data: purchaseOrder,
        message: 'Purchase order received successfully',
      } as ApiResponse);
    } catch (error) {
      console.error('Error in receivePurchaseOrder:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Internal server error',
      } as ApiResponse);
    }
  }

  async updatePurchaseOrderStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const userId = (req as any).user.userId;

      const validStatuses = ['pending', 'confirmed', 'shipped', 'received', 'cancelled'];
      if (!validStatuses.includes(status)) {
        res.status(400).json({
          success: false,
          error: 'Invalid status',
        } as ApiResponse);
        return;
      }

      const purchaseOrder = await this.purchaseOrderService.updatePurchaseOrderStatus(id, status, userId);
      
      if (!purchaseOrder) {
        res.status(404).json({
          success: false,
          error: 'Purchase order not found',
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        data: purchaseOrder,
        message: `Purchase order status updated to ${status}`,
      } as ApiResponse);
    } catch (error) {
      console.error('Error in updatePurchaseOrderStatus:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }
}

export default new PurchaseOrderController();