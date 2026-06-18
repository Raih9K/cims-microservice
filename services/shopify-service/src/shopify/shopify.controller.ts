import { Body, Controller, Post, Query, Param, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ShopifyService } from './shopify.service';

@Controller('shopify')
export class ShopifyController {
  constructor(private readonly shopifyService: ShopifyService) {}

  @Post('connect')
  async connect(
    @Query('companyId', new DefaultValuePipe(1), ParseIntPipe) companyId: number,
    @Body() data: { shop_domain: string; access_token: string },
  ) {
    return this.shopifyService.connectManual(companyId, data);
  }

  @Post('channels/:id/sync')
  async syncChannel(
    @Param('id', ParseIntPipe) id: number,
    @Query('companyId', new DefaultValuePipe(1), ParseIntPipe) companyId: number,
  ) {
    return this.shopifyService.syncChannel(id, companyId);
  }
}
