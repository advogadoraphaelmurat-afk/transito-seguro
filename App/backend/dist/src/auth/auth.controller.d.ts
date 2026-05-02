import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: any): Promise<{
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
    login(body: any): Promise<{
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
