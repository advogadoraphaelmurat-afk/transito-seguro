import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async addXP(id: string, amount: number) {
    return this.prisma.user.update({
      where: { id },
      data: {
        xp: {
          increment: amount,
        },
      },
    });
  }

  async addCoins(id: string, amount: number) {
    return this.prisma.user.update({
      where: { id },
      data: {
        coins: {
          increment: amount,
        },
      },
    });
  }
}
