import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersService } from './users.service';

@Injectable()
export class MissionsService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async findAllVolumes() {
    return this.prisma.volume.findMany({
      include: {
        modules: {
          include: {
            missions: true,
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findVolumeById(id: number) {
    return this.prisma.volume.findUnique({
      where: { id },
      include: {
        modules: {
          include: {
            missions: true,
          },
        },
      },
    });
  }

  async findMissionById(id: string) {
    return this.prisma.mission.findUnique({
      where: { id },
    });
  }

  async completeMission(userId: string, missionId: string, score: number) {
    const mission = await this.prisma.mission.findUnique({
      where: { id: missionId },
    });

    if (mission) {
      await this.usersService.addXP(userId, mission.xpReward);
      await this.usersService.addCoins(userId, mission.coinsReward);
    }

    const completion = await this.prisma.studentProgress.upsert({
      where: {
        userId_missionId: {
          userId,
          missionId,
        },
      },
      update: {
        score,
        completed: true,
        completedAt: new Date(),
      },
      create: {
        userId,
        missionId,
        score,
        completed: true,
      },
    });

    // Badge Logic
    const completedCount = await this.prisma.studentProgress.count({
      where: { userId, completed: true }
    });

    if (completedCount === 1) {
      await this.prisma.userBadge.upsert({
        where: { userId_badgeId: { userId, badgeId: 'primeiros_passos' } },
        update: {},
        create: { userId, badgeId: 'primeiros_passos' }
      });
    }

    return completion;

  }
}
