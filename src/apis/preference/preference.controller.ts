import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PreferenceService } from './service/preference.service';

import { PickedContentsService } from './service/picked-contents.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorator/role.decorator';
import { Role } from '../../common/type/role.type';
import { Profile, ProfileType } from '../../common/decorator/user.decorator';
import { CreatePreferenceDto } from './dto/preference.dto';

@Controller('preference')
@ApiTags('preference')
export class PreferenceController {
  constructor(
    private readonly preferenceService: PreferenceService,
    private readonly pickedContentsService: PickedContentsService,
  ) {}

  //preference
  @Roles(Role.Profile)
  @Post('/:contentId')
  async createPreference(
    @Body() dto: CreatePreferenceDto,
    @Param('contentId') contentId: string,
    @Profile() profile: ProfileType,
  ) {
    const { profileId } = profile;
    return await this.preferenceService.createPreference(
      dto,
      contentId,
      profileId,
    );
  }

  @Roles(Role.Profile)
  @Delete(':preferenceId')
  async deletePreference(@Param('preferenceId') preferenceId: string) {
    return this.preferenceService.deletePreference(preferenceId);
  }

  //picked-content
  @Roles(Role.Profile)
  @Post('picked/:contentId')
  createPicked(
    @Profile() profile: ProfileType,
    @Param('contentId') contentId: string,
  ) {
    const { profileId } = profile;
    return this.pickedContentsService.createPicked(profileId, contentId);
  }

  @Roles(Role.Profile)
  @Get('picked')
  async getPicked(@Profile() profile: ProfileType) {
    const { profileId } = profile;
    return await this.pickedContentsService.getPicked(profileId);
  }

  @Roles(Role.Profile)
  @Delete('picked/:pickedId')
  async deletePicked(@Param('pickedId') pickedId: string) {
    return await this.pickedContentsService.deletePicked(pickedId);
  }
}
