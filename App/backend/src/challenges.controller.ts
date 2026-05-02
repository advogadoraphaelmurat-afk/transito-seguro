import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('challenges')
@UseGuards(JwtAuthGuard)
export class ChallengesController {
  constructor(private challengesService: ChallengesService) {}

  @Get('daily')
  async getDaily() {
    return this.challengesService.getDailyChallenge();
  }

  @Post('complete')
  async complete(@Request() req, @Body('challengeId') challengeId: string) {
    return this.challengesService.completeChallenge(req.user.userId, challengeId);
  }
}
