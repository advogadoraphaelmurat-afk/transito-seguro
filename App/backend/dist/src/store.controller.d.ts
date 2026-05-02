import { StoreService } from './store.service';
export declare class StoreController {
    private storeService;
    constructor(storeService: StoreService);
    getItems(): Promise<{
        id: string;
        name: string;
        description: string | null;
        price: number;
        category: string;
        imageUrl: string;
    }[]>;
    purchase(req: any, itemId: string): Promise<{
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
    getInventory(req: any): Promise<({
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
    equip(req: any, itemId: string): Promise<{
        userId: string;
        itemId: string;
        isEquipped: boolean;
        acquiredAt: Date;
    }>;
}
