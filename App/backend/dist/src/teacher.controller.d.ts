import { TeacherService } from './teacher.service';
export declare class TeacherController {
    private teacherService;
    constructor(teacherService: TeacherService);
    getClasses(req: any): Promise<({
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
    getClassProgress(classId: string, req: any): Promise<{
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
    toggleLock(classId: string, moduleId: string, isUnlocked: boolean, req: any): Promise<{
        moduleId: string;
        classId: string;
        isUnlocked: boolean;
        unlockedAt: Date | null;
    }>;
}
