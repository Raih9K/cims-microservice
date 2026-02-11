import { Request, Response } from 'express';
import { ListingService } from '@/services/listingService';
import { ApiResponse, PaginationParams } from '@/types';
import { validationResult } from 'express-validator';

export class ListingController {
  private listingService: ListingService;

  constructor() {
    this.listingService = new ListingService();
  }

  async getAllListings(req: Request, res: Response): Promise<void> {
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
        channelId: req.query.channelId as string,
        status: req.query.status as string,
        channelType: req.query.channelType as string,
      };
      const params: PaginationParams = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 20,
        sortBy: req.query.sortBy as string || 'created_at',
        sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc',
      };

      const result = await this.listingService.getAllListings(userId, filters, params);
      
      res.status(200).json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      } as ApiResponse);
    } catch (error) {
      console.error('Error in getAllListings:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async getListingById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as any).user.userId;

      const listing = await this.listingService.getListingById(id, userId);
      
      if (!listing) {
        res.status(404).json({
          success: false,
          error: 'Listing not found',
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        data: listing,
      } as ApiResponse);
    } catch (error) {
      console.error('Error in getListingById:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async createListing(req: Request, res: Response): Promise<void> {
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
      const listingData = req.body;

      const listing = await this.listingService.createListing(listingData, userId);
      
      res.status(201).json({
        success: true,
        data: listing,
        message: 'Listing created successfully',
      } as ApiResponse);
    } catch (error) {
      console.error('Error in createListing:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async updateListing(req: Request, res: Response): Promise<void> {
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
      const listingData = req.body;

      const listing = await this.listingService.updateListing(id, listingData, userId);
      
      if (!listing) {
        res.status(404).json({
          success: false,
          error: 'Listing not found',
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        data: listing,
        message: 'Listing updated successfully',
      } as ApiResponse);
    } catch (error) {
      console.error('Error in updateListing:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async deleteListing(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as any).user.userId;

      const success = await this.listingService.deleteListing(id, userId);
      
      if (!success) {
        res.status(404).json({
          success: false,
          error: 'Listing not found',
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Listing deleted successfully',
      } as ApiResponse);
    } catch (error) {
      console.error('Error in deleteListing:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async publishListing(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as any).user.userId;

      const listing = await this.listingService.publishListing(id, userId);
      
      if (!listing) {
        res.status(404).json({
          success: false,
          error: 'Listing not found',
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        data: listing,
        message: 'Listing published successfully',
      } as ApiResponse);
    } catch (error) {
      console.error('Error in publishListing:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async unpublishListing(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as any).user.userId;

      const listing = await this.listingService.unpublishListing(id, userId);
      
      if (!listing) {
        res.status(404).json({
          success: false,
          error: 'Listing not found',
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        data: listing,
        message: 'Listing unpublished successfully',
      } as ApiResponse);
    } catch (error) {
      console.error('Error in unpublishListing:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }

  async syncListing(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as any).user.userId;

      const result = await this.listingService.syncListing(id, userId);
      
      res.status(200).json({
        success: true,
        data: result,
        message: 'Listing sync initiated successfully',
      } as ApiResponse);
    } catch (error) {
      console.error('Error in syncListing:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  }
}

export default new ListingController();