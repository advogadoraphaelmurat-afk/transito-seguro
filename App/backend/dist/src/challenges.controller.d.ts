import { ChallengesService } from './challenges.service';
export declare class ChallengesController {
    private challengesService;
    constructor(challengesService: ChallengesService);
    getDaily(): Promise<{
        id: string;
        title: string;
        type: string;
        description: string | null;
        content: string | null;
        rewardXp: number;
        rewardCoins: number;
        date: Date;
    }>;
    complete(req: any, challengeId: string): Promise<{
        userId: string;
        completedAt: Date;
        challengeId: string;
    } | {
        alreadyCompleted: boolean;
    }>;
}
