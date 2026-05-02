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
exports.TeacherService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma/prisma.service");
let TeacherService = class TeacherService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getClassProgress(teacherId, classId) {
        return this.prisma.class.findUnique({
            where: {
                id: classId,
                teacherId: teacherId,
            },
            include: {
                students: {
                    include: {
                        progress: {
                            include: {
                                mission: true
                            }
                        }
                    }
                },
                locks: true
            }
        });
    }
    async toggleModuleLock(teacherId, classId, moduleId, isUnlocked) {
        const classInfo = await this.prisma.class.findUnique({
            where: { id: classId, teacherId }
        });
        if (!classInfo)
            throw new Error('Não autorizado');
        return this.prisma.classModuleLock.upsert({
            where: {
                classId_moduleId: { classId, moduleId },
            },
            update: {
                isUnlocked,
                unlockedAt: isUnlocked ? new Date() : null,
            },
            create: {
                classId,
                moduleId,
                isUnlocked,
                unlockedAt: isUnlocked ? new Date() : null,
            },
        });
    }
    async getTeacherClasses(teacherId) {
        return this.prisma.class.findMany({
            where: { teacherId },
            include: {
                _count: {
                    select: { students: true }
                }
            }
        });
    }
};
exports.TeacherService = TeacherService;
exports.TeacherService = TeacherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TeacherService);
//# sourceMappingURL=teacher.service.js.map