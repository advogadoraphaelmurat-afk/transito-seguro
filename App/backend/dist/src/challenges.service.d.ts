import { PrismaService } from './prisma/prisma.service';
export declare class ChallengesService {
    private prisma;
    constructor(prisma: PrismaService);
    getDailyChallenge(): Promise<{
        id: string;
        title: string;
        type: string;
        description: string | null;
        content: string | null;
        rewardXp: number;
        rewardCoins: number;
        date: Date;
    }>;
    completeChallenge(userId: string, challengeId: string): Promise<{
        userId: string;
        completedAt: Date;
        challengeId: string;
    } | {
        alreadyCompleted: boolean;
    }>;
}
