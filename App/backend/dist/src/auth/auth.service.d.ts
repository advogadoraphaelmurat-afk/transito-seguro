import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(data: any): Promise<{
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
    login(email: string, pass: string): Promise<{
        access_token: string;
        user: {
            id: string;
            name: string;
            email: string;
            currentGrade: number;
            xp: number;
        };
    }>;
}
