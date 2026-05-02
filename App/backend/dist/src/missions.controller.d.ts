import { MissionsService } from './missions.service';
export declare class MissionsController {
    private readonly missionsService;
    constructor(missionsService: MissionsService);
    getAllVolumes(): Promise<({
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
    getVolume(id: number): Promise<{
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
    getMission(id: string): Promise<{
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
    completeMission(body: {
        userId: string;
        missionId: string;
        score: number;
    }): Promise<{
        id: string;
        userId: string;
        missionId: string;
        score: number | null;
        completed: boolean;
        completedAt: Date;
    }>;
}
