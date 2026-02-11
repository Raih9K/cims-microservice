import { Request, Response } from 'express';
import { DashboardService } from '@/services/dashboardService';
import { ApiResponse } from '@/types';

export class DashboardController {
  private dashboardService: DashboardService;

  constructor() {
    this.dashboardService = new DashboardService();
  }

  async getDashboardOverview(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.userId;
      const timeframe = req.query.timeframe as string || '30';

      const overview = await this.dashboardService.getOverview(userId, parseInt(timeframe));
      
      res.status(200).json({
        success: true,
        data: overview,
      } as ApiResponse);
    } catch (error) {
      console.error('Error in getDashboardOverview:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async getInventoryAnalytics(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.userId;

      const analytics = await this.dashboardService.getInventoryAnalytics(userId);
      
      res.status(200).json({
        success: true,
        data: analytics,
      } as ApiResponse);
    } catch (error) {
      console.error('Error in getInventoryAnalytics:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async getSalesAnalytics(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.userId;
      const timeframe = req.query.timeframe as string || '30';

      const analytics = await this.dashboardService.getSalesAnalytics(userId, parseInt(timeframe));
      
      res.status(200).json({
        success: true,
        data: analytics,
      } as ApiResponse);
    } catch (error) {
      console.error('Error in getSalesAnalytics:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async getLowStockItems(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.userId;
      const limit = parseInt(req.query.limit as string) || 10;

      const items = await this.dashboardService.getLowStockItems(userId, limit);
      
      res.status(200).json({
        success: true,
        data: items,
      } as ApiResponse);
    } catch (error) {
      console.error('Error in getLowStockItems:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async getTopSellingItems(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.userId;
      const timeframe = req.query.timeframe as string || '30';
      const limit = parseInt(req.query.limit as string) || 10;

      const items = await this.dashboardService.getTopSellingItems(userId, parseInt(timeframe), limit);
      
      res.status(200).json({
        success: true,
        data: items,
      } as ApiResponse);
    } catch (error) {
      console.error('Error in getTopSellingItems:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async getChannelPerformance(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.userId;
      const timeframe = req.query.timeframe as string || '30';

      const performance = await this.dashboardService.getChannelPerformance(userId, parseInt(timeframe));
      
      res.status(200).json({
        success: true,
        data: performance,
      } as ApiResponse);
    } catch (error) {
      console.error('Error in getChannelPerformance:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }
}

export default new DashboardController();