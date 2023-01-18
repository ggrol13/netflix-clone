import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PlayService } from './play.service';
import { Roles } from '../../common/decorator/role.decorator';
import { Profile, ProfileType } from '../../common/decorator/user.decorator';

@Controller('play')
@ApiTags('play')
export class PlayController {
  constructor(private readonly playService: PlayService) {}

  @Roles('profile')
  @Get(':contentId')
  async playContent(
    @Profile() profile: ProfileType,
    @Param('contentId') contentId: string,
  ) {
    return await this.playService.playContent(profile, contentId);
  }
}
