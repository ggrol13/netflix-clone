import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HistoryService } from './service/history.service';
import { WatchingService } from './service/watching.service';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common/type/role.type';
import { Roles } from '../../common/decorator/role.decorator';
import { Profile, ProfileType } from '../../common/decorator/user.decorator';
import { CreateWatchingDto } from './dto/watching.dto';

@Controller('history')
@ApiTags('history')
export class HistoryController {
  constructor(
    private readonly playHistoryService: HistoryService,
    private readonly watchingService: WatchingService,
  ) {}

  @Post()
  create() {
    return this.playHistoryService.create();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playHistoryService.remove(+id);
  }

  //play-list
  @Roles(Role.Profile)
  @Post('watching/:contentId/:episodeId')
  async createWatching(
    @Body() dto: CreateWatchingDto,
    @Param('contentId') contentId: string,
    @Param('episodeId') episodeId: string,
    @Profile() profile: ProfileType,
  ) {
    return await this.watchingService.createWatching(
      dto,
      contentId,
      profile,
      episodeId,
    );
  }

  @Roles(Role.Profile)
  @Patch('watching/:watchingId')
  async updateWatching(
    @Body() dto: CreateWatchingDto,
    @Param('watchingId') watchingId: string,
    @Profile() profile: ProfileType,
  ) {
    return await this.watchingService.updateWatching(dto, profile, watchingId);
  }

  @Roles(Role.Profile)
  @Get('watching/latest')
  async getLatestWatching(@Profile() profile: ProfileType) {
    const { profileId } = profile;
    return await this.watchingService.getLatestWatching(profileId);
  }

  @Roles(Role.Profile)
  @Get('watching')
  async getWatching(@Profile() profile: ProfileType) {
    const { profileId } = profile;
    return await this.watchingService.getWatching(profileId);
  }
}
