import { PrismaService } from './prisma/prisma.service';
export declare class TeacherService {
    private prisma;
    constructor(prisma: PrismaService);
    getClassProgress(teacherId: string, classId: string): Promise<{
        locks: {
            moduleId: string;
            classId: string;
            isUnlocked: boolean;
            unlockedAt: Date | null;
        }[];
        students: ({
            progress: ({
                mission: {
                    id: string;
                    title: string;
                    type: string;
                    order: number;
                    description: string | null;
                    xpReward: number;
                    coinsReward: number;
                    contentData: string;
                    moduleId: string;
                };
            } & {
                id: string;
                userId: string;
                missionId: string;
                score: number | null;
                completed: boolean;
                completedAt: Date;
            })[];
        } & {
            id: string;
            name: string;
            email: string;
            password: string;
            role: string;
            currentGrade: number;
            xp: number;
            coins: number;
            schoolId: string | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
    } & {
        id: string;
        name: string;
        schoolId: string;
        createdAt: Date;
        teacherId: string;
    }>;
    toggleModuleLock(teacherId: string, classId: string, moduleId: string, isUnlocked: boolean): Promise<{
        moduleId: string;
        classId: string;
        isUnlocked: boolean;
        unlockedAt: Date | null;
    }>;
    getTeacherClasses(teacherId: string): Promise<({
        _count: {
            students: number;
        };
    } & {
        id: string;
        name: string;
        schoolId: string;
        createdAt: Date;
        teacherId: string;
    })[]>;
}
