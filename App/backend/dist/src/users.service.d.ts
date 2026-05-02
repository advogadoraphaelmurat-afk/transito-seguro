import { PrismaService } from './prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(id: string): Promise<{
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
    }>;
    addXP(id: string, amount: number): Promise<{
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
    }>;
    addCoins(id: string, amount: number): Promise<{
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
    }>;
}
