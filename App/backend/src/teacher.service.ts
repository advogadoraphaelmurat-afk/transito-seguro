import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}

  async getClassProgress(teacherId: string, classId: string) {
    return this.prisma.class.findUnique({
      where: { 
        id: classId,
        teacherId: teacherId, // Security check
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

  async toggleModuleLock(teacherId: string, classId: string, moduleId: string, isUnlocked: boolean) {
    // Verify teacher owns the class
    const classInfo = await this.prisma.class.findUnique({
      where: { id: classId, teacherId }
    });
    if (!classInfo) throw new Error('Não autorizado');

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


  async getTeacherClasses(teacherId: string) {
    return this.prisma.class.findMany({
      where: { teacherId },
      include: {
        _count: {
          select: { students: true }
        }
      }
    });
  }
}
