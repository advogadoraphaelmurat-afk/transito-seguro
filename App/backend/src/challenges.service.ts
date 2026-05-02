import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class ChallengesService {
  constructor(private prisma: PrismaService) {}

  async getDailyChallenge() {
    // In a real app, this would return a specific challenge for the day
    // For now, we return a random one from a hardcoded list or DB
    const challenges = await this.prisma.dailyChallenge.findMany();
    if (challenges.length === 0) return null;
    
    // Simple deterministic random based on date
    const day = new Date().getDate();
    return challenges[day % challenges.length];
  }

  async completeChallenge(userId: string, challengeId: string) {
    const existing = await this.prisma.dailyChallengeCompletion.findUnique({
      where: {
        userId_challengeId: { userId, challengeId }
      }
    });

    if (existing) return { alreadyCompleted: true };

    const challenge = await this.prisma.dailyChallenge.findUnique({ where: { id: challengeId } });
    if (!challenge) throw new Error('Desafio não encontrado');

    return this.prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: userId },
        data: {
          coins: { increment: challenge.rewardCoins },
          xp: { increment: challenge.rewardXp }
        }
      });

      return tx.dailyChallengeCompletion.create({
        data: { userId, challengeId }
      });
    });
  }
}
