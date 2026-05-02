import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { StoreService } from './store.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('store')
@UseGuards(JwtAuthGuard)
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Get('items')
  async getItems() {
    return this.storeService.getItems();
  }

  @Post('purchase')
  async purchase(@Request() req, @Body('itemId') itemId: string) {
    return this.storeService.purchaseItem(req.user.userId, itemId);
  }

  @Get('inventory')
  async getInventory(@Request() req) {
    return this.storeService.getInventory(req.user.userId);
  }

  @Post('equip')
  async equip(@Request() req, @Body('itemId') itemId: string) {
    return this.storeService.equipItem(req.user.userId, itemId);
  }
}
