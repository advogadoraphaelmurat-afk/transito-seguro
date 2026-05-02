"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma/prisma.service");
let StoreService = class StoreService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getItems() {
        return this.prisma.item.findMany();
    }
    async purchaseItem(userId, itemId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        const item = await this.prisma.item.findUnique({ where: { id: itemId } });
        if (!user || !item) {
            throw new common_1.BadRequestException('Usuário ou item não encontrado');
        }
        if (user.coins < item.price) {
            throw new common_1.BadRequestException('Moedas insuficientes');
        }
        const existing = await this.prisma.userItem.findUnique({
            where: {
                userId_itemId: { userId, itemId }
            }
        });
        if (existing) {
            throw new common_1.BadRequestException('Você já possui este item');
        }
        return this.prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: { id: userId },
                data: { coins: { decrement: item.price } }
            });
            return tx.userItem.create({
                data: {
                    userId,
                    itemId,
                },
                include: { item: true }
            });
        });
    }
    async getInventory(userId) {
        return this.prisma.userItem.findMany({
            where: { userId },
            include: { item: true }
        });
    }
    async equipItem(userId, itemId) {
        const userItem = await this.prisma.userItem.findUnique({
            where: { userId_itemId: { userId, itemId } },
            include: { item: true }
        });
        if (!userItem) {
            throw new common_1.BadRequestException('Item não encontrado no inventário');
        }
        await this.prisma.userItem.updateMany({
            where: {
                userId,
                item: { category: userItem.item.category }
            },
            data: { isEquipped: false }
        });
        return this.prisma.userItem.update({
            where: { userId_itemId: { userId, itemId } },
            data: { isEquipped: true }
        });
    }
};
exports.StoreService = StoreService;
exports.StoreService = StoreService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StoreService);
//# sourceMappingURL=store.service.js.map