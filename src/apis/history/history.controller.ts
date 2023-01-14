import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto, CreateWatchingDto } from './dto/create-history.dto';
import { UpdateHistoryDto, UpdateWatchingDto } from './dto/update-history.dto';
import { WatchingService } from './watching.service';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common/type/role.type';
import { Roles } from '../../common/decorator/role.decorator';
import { Profile, ProfileType } from '../../common/decorator/user.decorator';

@Controller('history')
@ApiTags('history')
export class HistoryController {
  constructor(
    private readonly playHistoryService: HistoryService,
    private readonly watchingService: WatchingService,
  ) {}

  @Post()
  create(@Body() createPlayHistoryDto: CreateHistoryDto) {
    return this.playHistoryService.create(createPlayHistoryDto);
  }

  @Get()
  findAll() {
    return this.playHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlayHistoryDto: UpdateHistoryDto,
  ) {
    return this.playHistoryService.update(+id, updatePlayHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playHistoryService.remove(+id);
  }

  //play-list
  @Roles(Role.Profile)
  @Post('watching/:contentId/:episodeId')
  async createList(
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

  @Get()
  findAllWatching() {
    return this.watchingService.findAllWatching();
  }

  @Get(':id')
  findOneWatching(@Param('id') id: string) {
    return this.watchingService.findOneWatching(+id);
  }

  @Patch(':id')
  updateWatching(
    @Param('id') id: string,
    @Body() updateWatchingDto: UpdateWatchingDto,
  ) {
    return this.watchingService.updateWatching(+id, updateWatchingDto);
  }

  @Delete(':id')
  removeWatching(@Param('id') id: string) {
    return this.watchingService.removeWatching(+id);
  }
}
