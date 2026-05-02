import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class StoreService {
  constructor(private prisma: PrismaService) {}

  async getItems() {
    return this.prisma.item.findMany();
  }

  async purchaseItem(userId: string, itemId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const item = await this.prisma.item.findUnique({ where: { id: itemId } });

    if (!user || !item) {
      throw new BadRequestException('Usuário ou item não encontrado');
    }

    if (user.coins < item.price) {
      throw new BadRequestException('Moedas insuficientes');
    }

    // Check if already owned
    const existing = await this.prisma.userItem.findUnique({
      where: {
        userId_itemId: { userId, itemId }
      }
    });

    if (existing) {
      throw new BadRequestException('Você já possui este item');
    }

    return this.prisma.$transaction(async (tx) => {
      // Deduct coins
      await tx.user.update({
        where: { id: userId },
        data: { coins: { decrement: item.price } }
      });

      // Add to inventory
      return tx.userItem.create({
        data: {
          userId,
          itemId,
        },
        include: { item: true }
      });
    });
  }

  async getInventory(userId: string) {
    return this.prisma.userItem.findMany({
      where: { userId },
      include: { item: true }
    });
  }

  async equipItem(userId: string, itemId: string) {
    const userItem = await this.prisma.userItem.findUnique({
      where: { userId_itemId: { userId, itemId } },
      include: { item: true }
    });

    if (!userItem) {
      throw new BadRequestException('Item não encontrado no inventário');
    }

    // Unequip others in the same category
    await this.prisma.userItem.updateMany({
      where: {
        userId,
        item: { category: userItem.item.category }
      },
      data: { isEquipped: false }
    });

    // Equip this one
    return this.prisma.userItem.update({
      where: { userId_itemId: { userId, itemId } },
      data: { isEquipped: true }
    });
  }
}
