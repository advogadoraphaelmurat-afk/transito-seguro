import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MissionsController } from './missions.controller';
import { MissionsService } from './missions.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users.service';

import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';

import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { ChallengesController } from './challenges.controller';
import { ChallengesService } from './challenges.service';

@Module({
  imports: [AuthModule],
  controllers: [AppController, MissionsController, TeacherController, StoreController, ChallengesController],
  providers: [AppService, MissionsService, PrismaService, UsersService, TeacherService, StoreService, ChallengesService],
})
export class AppModule {}
