import { Request, Response } from 'express';
import { ChannelService } from '@/services/channelService';
import { ApiResponse, PaginationParams } from '@/types';
import { validationResult } from 'express-validator';

export class ChannelController {
  private channelService: ChannelService;

  constructor() {
    this.channelService = new ChannelService();
  }

  async getAllChannels(req: Request, res: Response): Promise<void> {
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

      const result = await this.channelService.getAllChannels(userId, params);
      
      res.status(200).json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      } as ApiResponse);
    } catch (error) {
      console.error('Error in getAllChannels:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async getChannelById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as any).user.userId;

      const channel = await this.channelService.getChannelById(id, userId);
      
      if (!channel) {
        res.status(404).json({
          success: false,
          error: 'Channel not found',
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        data: channel,
      } as ApiResponse);
    } catch (error) {
      console.error('Error in getChannelById:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async createChannel(req: Request, res: Response): Promise<void> {
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
      const channelData = req.body;

      const channel = await this.channelService.createChannel(channelData, userId);
      
      res.status(201).json({
        success: true,
        data: channel,
        message: 'Channel created successfully',
      } as ApiResponse);
    } catch (error) {
      console.error('Error in createChannel:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async updateChannel(req: Request, res: Response): Promise<void> {
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
      const channelData = req.body;

      const channel = await this.channelService.updateChannel(id, channelData, userId);
      
      if (!channel) {
        res.status(404).json({
          success: false,
          error: 'Channel not found',
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        data: channel,
        message: 'Channel updated successfully',
      } as ApiResponse);
    } catch (error) {
      console.error('Error in updateChannel:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async deleteChannel(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as any).user.userId;

      const success = await this.channelService.deleteChannel(id, userId);
      
      if (!success) {
        res.status(404).json({
          success: false,
          error: 'Channel not found',
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Channel deleted successfully',
      } as ApiResponse);
    } catch (error) {
      console.error('Error in deleteChannel:', error);
      if (error.message.includes('Cannot delete channel with existing listings')) {
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

  async testChannelConnection(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as any).user.userId;

      const result = await this.channelService.testChannelConnection(id, userId);
      
      res.status(200).json({
        success: true,
        data: result,
        message: result.success ? 'Connection successful' : 'Connection failed',
      } as ApiResponse);
    } catch (error) {
      console.error('Error in testChannelConnection:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async syncChannel(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as any).user.userId;

      const result = await this.channelService.syncChannel(id, userId);
      
      res.status(200).json({
        success: true,
        data: result,
        message: 'Sync initiated successfully',
      } as ApiResponse);
    } catch (error) {
      console.error('Error in syncChannel:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }
}

export default new ChannelController();