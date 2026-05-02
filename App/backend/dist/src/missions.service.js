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
exports.MissionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma/prisma.service");
const users_service_1 = require("./users.service");
let MissionsService = class MissionsService {
    constructor(prisma, usersService) {
        this.prisma = prisma;
        this.usersService = usersService;
    }
    async findAllVolumes() {
        return this.prisma.volume.findMany({
            include: {
                modules: {
                    include: {
                        missions: true,
                    },
                },
            },
            orderBy: {
                id: 'asc',
            },
        });
    }
    async findVolumeById(id) {
        return this.prisma.volume.findUnique({
            where: { id },
            include: {
                modules: {
                    include: {
                        missions: true,
                    },
                },
            },
        });
    }
    async findMissionById(id) {
        return this.prisma.mission.findUnique({
            where: { id },
        });
    }
    async completeMission(userId, missionId, score) {
        const mission = await this.prisma.mission.findUnique({
            where: { id: missionId },
        });
        if (mission) {
            await this.usersService.addXP(userId, mission.xpReward);
            await this.usersService.addCoins(userId, mission.coinsReward);
        }
        const completion = await this.prisma.studentProgress.upsert({
            where: {
                userId_missionId: {
                    userId,
                    missionId,
                },
            },
            update: {
                score,
                completed: true,
                completedAt: new Date(),
            },
            create: {
                userId,
                missionId,
                score,
                completed: true,
            },
        });
        const completedCount = await this.prisma.studentProgress.count({
            where: { userId, completed: true }
        });
        if (completedCount === 1) {
            await this.prisma.userBadge.upsert({
                where: { userId_badgeId: { userId, badgeId: 'primeiros_passos' } },
                update: {},
                create: { userId, badgeId: 'primeiros_passos' }
            });
        }
        return completion;
    }
};
exports.MissionsService = MissionsService;
exports.MissionsService = MissionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService])
], MissionsService);
//# sourceMappingURL=missions.service.js.map