import { Controller, Get, Param, Post, Body, ParseIntPipe } from '@nestjs/common';
import { MissionsService } from './missions.service';

@Controller('missions')
export class MissionsController {
  constructor(private readonly missionsService: MissionsService) {}

  @Get('volumes')
  async getAllVolumes() {
    return this.missionsService.findAllVolumes();
  }

  @Get('volumes/:id')
  async getVolume(@Param('id', ParseIntPipe) id: number) {
    return this.missionsService.findVolumeById(id);
  }

  @Get(':id')
  async getMission(@Param('id') id: string) {
    return this.missionsService.findMissionById(id);
  }

  @Post('complete')
  async completeMission(
    @Body() body: { userId: string; missionId: string; score: number },
  ) {
    return this.missionsService.completeMission(
      body.userId,
      body.missionId,
      body.score,
    );
  }
}
