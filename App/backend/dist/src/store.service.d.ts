import { PrismaService } from './prisma/prisma.service';
export declare class StoreService {
    private prisma;
    constructor(prisma: PrismaService);
    getItems(): Promise<{
        id: string;
        name: string;
        description: string | null;
        price: number;
        category: string;
        imageUrl: string;
    }[]>;
    purchaseItem(userId: string, itemId: string): Promise<{
        item: {
            id: string;
            name: string;
            description: string | null;
            price: number;
            category: string;
            imageUrl: string;
        };
    } & {
        userId: string;
        itemId: string;
        isEquipped: boolean;
        acquiredAt: Date;
    }>;
    getInventory(userId: string): Promise<({
        item: {
            id: string;
            name: string;
            description: string | null;
            price: number;
            category: string;
            imageUrl: string;
        };
    } & {
        userId: string;
        itemId: string;
        isEquipped: boolean;
        acquiredAt: Date;
    })[]>;
    equipItem(userId: string, itemId: string): Promise<{
        userId: string;
        itemId: string;
        isEquipped: boolean;
        acquiredAt: Date;
    }>;
}
