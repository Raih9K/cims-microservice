import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  ParseIntPipe,
  Delete,
  Put,
  DefaultValuePipe,
} from '@nestjs/common';
import { MarketplaceService } from './marketplace.service';

function mapChannelToFrontend(channel: any) {
  return {
    id: channel.id,
    channel_id: channel.id.toString(),
    name: channel.name,
    marketplace: channel.platform.toLowerCase(),
    marketplace_data: channel.credentials || {},
    belongs_to: channel.companyId,
    status: channel.status,
    store_url: channel.storeUrl,
    createdAt: channel.createdAt,
    updatedAt: channel.updatedAt,
  };
}

function mapFrontendToChannel(data: any) {
  return {
    name: data.name,
    platform: data.marketplace ? data.marketplace.toUpperCase() : 'SHOPIFY',
    credentials: data.marketplace_data || {},
    status: data.status || 'active',
    storeUrl: data.store_url,
  };
}

@Controller('marketplace')
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Post('channels')
  async createChannel(
    @Query('companyId', new DefaultValuePipe(1), ParseIntPipe) companyId: number,
    @Body() data: any,
  ) {
    const dbData = mapFrontendToChannel(data);
    const channel = await this.marketplaceService.createChannel(companyId, dbData);
    return { success: true, data: mapChannelToFrontend(channel) };
  }

  @Get('channels')
  async getChannels(
    @Query('companyId', new DefaultValuePipe(1), ParseIntPipe) companyId: number,
  ) {
    const channels = await this.marketplaceService.getChannels(companyId);
    return { success: true, data: channels.map(mapChannelToFrontend) };
  }

  @Get('channels/stats')
  async getStats(
    @Query('companyId', new DefaultValuePipe(1), ParseIntPipe) companyId: number,
  ) {
    const stats = await this.marketplaceService.getChannelStats(companyId);
    return { success: true, data: stats };
  }

  @Get('channels/:id')
  async findOneChannel(
    @Param('id', ParseIntPipe) id: number,
    @Query('companyId', new DefaultValuePipe(1), ParseIntPipe) companyId: number,
  ) {
    const channel = await this.marketplaceService.findOneChannel(id, companyId);
    return { success: true, data: mapChannelToFrontend(channel) };
  }

  @Put('channels/:id')
  async updateChannel(
    @Param('id', ParseIntPipe) id: number,
    @Query('companyId', new DefaultValuePipe(1), ParseIntPipe) companyId: number,
    @Body() data: any,
  ) {
    const dbData = mapFrontendToChannel(data);
    const channel = await this.marketplaceService.updateChannel(id, companyId, dbData);
    return { success: true, data: mapChannelToFrontend(channel) };
  }

  @Delete('channels/:id')
  async deleteChannel(
    @Param('id', ParseIntPipe) id: number,
    @Query('companyId', new DefaultValuePipe(1), ParseIntPipe) companyId: number,
  ) {
    const channel = await this.marketplaceService.deleteChannel(id, companyId);
    return { success: true, data: mapChannelToFrontend(channel) };
  }

  @Post('listings')
  createListing(
    @Query('companyId', new DefaultValuePipe(1), ParseIntPipe) companyId: number,
    @Body() data: any,
  ) {
    return this.marketplaceService.createListing(companyId, data);
  }

  @Get('listings')
  getListings(
    @Query('companyId', new DefaultValuePipe(1), ParseIntPipe) companyId: number,
    @Query('channelId') channelId?: number,
  ) {
    return this.marketplaceService.getListings(companyId, channelId ? Number(channelId) : undefined);
  }

  @Patch('listings/:id')
  updateListing(
    @Param('id', ParseIntPipe) id: number,
    @Query('companyId', new DefaultValuePipe(1), ParseIntPipe) companyId: number,
    @Body() data: any,
  ) {
    return this.marketplaceService.updateListing(id, companyId, data);
  }
}
