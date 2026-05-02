import { PrismaService } from './prisma/prisma.service';
import { UsersService } from './users.service';
export declare class MissionsService {
    private prisma;
    private usersService;
    constructor(prisma: PrismaService, usersService: UsersService);
    findAllVolumes(): Promise<({
        modules: ({
            missions: {
                id: string;
                title: string;
                type: string;
                order: number;
                description: string | null;
                xpReward: number;
                coinsReward: number;
                contentData: string;
                moduleId: string;
            }[];
        } & {
            id: string;
            title: string;
            bimonthly: number;
            volumeId: number;
        })[];
    } & {
        id: number;
        title: string;
        cycle: string;
    })[]>;
    findVolumeById(id: number): Promise<{
        modules: ({
            missions: {
                id: string;
                title: string;
                type: string;
                order: number;
                description: string | null;
                xpReward: number;
                coinsReward: number;
                contentData: string;
                moduleId: string;
            }[];
        } & {
            id: string;
            title: string;
            bimonthly: number;
            volumeId: number;
        })[];
    } & {
        id: number;
        title: string;
        cycle: string;
    }>;
    findMissionById(id: string): Promise<{
        id: string;
        title: string;
        type: string;
        order: number;
        description: string | null;
        xpReward: number;
        coinsReward: number;
        contentData: string;
        moduleId: string;
    }>;
    completeMission(userId: string, missionId: string, score: number): Promise<{
        id: string;
        userId: string;
        missionId: string;
        score: number | null;
        completed: boolean;
        completedAt: Date;
    }>;
}
