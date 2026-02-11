import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { MarketplaceService } from './marketplace.service';

@Controller('marketplace')
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Post('channels')
  createChannel(
    @Query('companyId', ParseIntPipe) companyId: number,
    @Body() data: any,
  ) {
    return this.marketplaceService.createChannel(companyId, data);
  }

  @Post('listings')
  createListing(
    @Query('companyId', ParseIntPipe) companyId: number,
    @Body() data: any,
  ) {
    return this.marketplaceService.createListing(companyId, data);
  }

  @Get('listings')
  getListings(
    @Query('companyId', ParseIntPipe) companyId: number,
    @Query('channelId') channelId?: number,
  ) {
    return this.marketplaceService.getListings(companyId, channelId);
  }

  @Patch('listings/:id')
  updateListing(
    @Param('id', ParseIntPipe) id: number,
    @Query('companyId', ParseIntPipe) companyId: number,
    @Body() data: any,
  ) {
    return this.marketplaceService.updateListing(id, companyId, data);
  }
}
