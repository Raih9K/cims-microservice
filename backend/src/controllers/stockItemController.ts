import { Response } from 'express';
import { StockItemService } from '@/services/stockItemService';
import { AuthenticatedRequest, ApiResponse } from '@/types';

export class StockItemController {
  private stockItemService = new StockItemService();

  createStockItem = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        const response: ApiResponse = {
          success: false,
          error: 'User not authenticated',
        };
        res.status(401).json(response);
        return;
      }

      const itemData = { ...req.body, belongs_to: req.user.userId };
      const pricingData = req.body.pricing;
      const dimensionsData = req.body.dimensions;
      
      const stockItem = await this.stockItemService.createStockItem(itemData, pricingData, dimensionsData);

      const response: ApiResponse = {
        success: true,
        data: { stockItem },
        message: 'Stock item created successfully',
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Create stock item error:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Failed to create stock item',
      };
      res.status(500).json(response);
    }
  };

  getStockItems = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        const response: ApiResponse = {
          success: false,
          error: 'User not authenticated',
        };
        res.status(401).json(response);
        return;
      }

      const params = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 20,
        sortBy: req.query.sortBy as string,
        sortOrder: req.query.sortOrder as 'asc' | 'desc',
        search: req.query.search as string,
        status: req.query.status as string,
        stock_type: req.query.stock_type as string,
        brand_id: req.query.brand_id ? parseInt(req.query.brand_id as string) : undefined,
      };

      const result = await this.stockItemService.getStockItems(req.user.userId, params);

      const response: ApiResponse = {
        success: true,
        data: result.data,
        pagination: result.pagination,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Get stock items error:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Failed to get stock items',
      };
      res.status(500).json(response);
    }
  };

  getStockItemById = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        const response: ApiResponse = {
          success: false,
          error: 'User not authenticated',
        };
        res.status(401).json(response);
        return;
      }

      const { stockItemId } = req.params;
      const stockItem = await this.stockItemService.getStockItemById(stockItemId, req.user.userId);

      if (!stockItem) {
        const response: ApiResponse = {
          success: false,
          error: 'Stock item not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        data: { stockItem },
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Get stock item error:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Failed to get stock item',
      };
      res.status(500).json(response);
    }
  };

  updateStockItem = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        const response: ApiResponse = {
          success: false,
          error: 'User not authenticated',
        };
        res.status(401).json(response);
        return;
      }

      const { stockItemId } = req.params;
      const updates = req.body;
      
      const stockItem = await this.stockItemService.updateStockItem(stockItemId, req.user.userId, updates);

      if (!stockItem) {
        const response: ApiResponse = {
          success: false,
          error: 'Stock item not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        data: { stockItem },
        message: 'Stock item updated successfully',
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Update stock item error:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Failed to update stock item',
      };
      res.status(500).json(response);
    }
  };

  deleteStockItem = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        const response: ApiResponse = {
          success: false,
          error: 'User not authenticated',
        };
        res.status(401).json(response);
        return;
      }

      const { stockItemId } = req.params;
      const success = await this.stockItemService.deleteStockItem(stockItemId, req.user.userId);

      if (!success) {
        const response: ApiResponse = {
          success: false,
          error: 'Stock item not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        message: 'Stock item deleted successfully',
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Delete stock item error:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Failed to delete stock item',
      };
      res.status(500).json(response);
    }
  };

  getStockItemVariants = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        const response: ApiResponse = {
          success: false,
          error: 'User not authenticated',
        };
        res.status(401).json(response);
        return;
      }

      const { stockItemId } = req.params;
      const variants = await this.stockItemService.getStockItemVariants(stockItemId, req.user.userId);

      const response: ApiResponse = {
        success: true,
        data: { variants },
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Get stock item variants error:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Failed to get stock item variants',
      };
      res.status(500).json(response);
    }
  };

  addStockItemVariant = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        const response: ApiResponse = {
          success: false,
          error: 'User not authenticated',
        };
        res.status(401).json(response);
        return;
      }

      const { stockItemId } = req.params;
      const variantData = req.body;
      
      const variant = await this.stockItemService.addStockItemVariant(stockItemId, req.user.userId, variantData);

      const response: ApiResponse = {
        success: true,
        data: { variant },
        message: 'Stock item variant added successfully',
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Add stock item variant error:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Failed to add stock item variant',
      };
      res.status(500).json(response);
    }
  };
}