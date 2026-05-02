import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('teacher')
@UseGuards(JwtAuthGuard)
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @Get('classes')
  async getClasses(@Request() req) {
    return this.teacherService.getTeacherClasses(req.user.userId);
  }

  @Get('class/:id/progress')
  async getClassProgress(@Param('id') classId: string, @Request() req) {
    return this.teacherService.getClassProgress(req.user.userId, classId);
  }

  @Post('class/:id/toggle-lock')
  async toggleLock(
    @Param('id') classId: string,
    @Body('moduleId') moduleId: string,
    @Body('isUnlocked') isUnlocked: boolean,
    @Request() req,
  ) {
    return this.teacherService.toggleModuleLock(req.user.userId, classId, moduleId, isUnlocked);
  }
}

