import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ContentService } from './service/content.service';
import {
  CreateContentDto,
  CreateDubbingDto,
  CreateEpisodeDto,
  CreateGenreDto,
  CreateSeasonDto,
  CreateSubtitleDto,
  DeleteEpisodeDto,
  DeleteSeasonDto,
} from './dto/content.dto';

import { TranslationService } from './service/translation.service';
import { EpisodeService } from './service/episode.service';
import { ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multer } from '../upload/options/multer';
import {
  uploadContents,
  uploadEpisode,
  uploadSeason,
} from '../upload/options/uploadFields';

@Controller('content')
@ApiTags('content')
export class ContentController {
  constructor(
    private readonly contentsService: ContentService,
    private readonly translationService: TranslationService,
    private readonly episodeService: EpisodeService,
  ) {}

  @Post('')
  @UseInterceptors(FileFieldsInterceptor(uploadContents, multer))
  async create(
    @Body() dto: CreateContentDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.contentsService.createContent(dto, files);
  }

  @Delete('/:contentId')
  async delete(@Param('contentId') contentId: string) {
    return this.contentsService.deleteContent(contentId);
  }

  @Get('/:contentId')
  async get(@Param('contentId') contentId: string) {
    return this.contentsService.getContent(contentId);
  }

  //genre
  @Post('genre')
  createGenre(@Body() dto: CreateGenreDto) {
    return this.contentsService.createGenre(dto);
  }

  //season
  @Post('season/:contentId')
  @UseInterceptors(FileFieldsInterceptor(uploadSeason, multer))
  createSeason(
    @Body() dto: CreateSeasonDto,
    @Param('contentId') contentId: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const { seasonNum, episode, dubbing, subtitle } = dto;
    return this.episodeService.createSeason(
      seasonNum,
      episode,
      dubbing,
      subtitle,
      contentId,
      files,
    );
  }

  @Delete('season')
  deleteSeason(@Body() dto: DeleteEpSubDto) {
    return this.episodeService.deleteSeason(dto);
  }

  //ep
  @Post('episode/:contentId')
  @UseInterceptors(FileFieldsInterceptor(uploadEpisode, multer))
  createEp(
    @Body() dto: CreateEpisodeDto,
    @Param('contentId') contentId: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.episodeService.createEp(dto, contentId, files);
  }

  @Delete('episode')
  deleteEp(@Body() dto: DeleteEpisodeDto) {
    return this.episodeService.deleteEp(dto);
  }

  //subtitles
  @Post('subtitle')
  createSub(@Body() createSubtitleDto: CreateSubtitleDto) {
    return this.translationService.createSub(createSubtitleDto);
  }

  @Get('subtitle')
  findAllSub() {
    return this.translationService.findAllSub();
  }

  @Get('subtitle/:id')
  findOneSub(@Param('id') id: string) {
    return this.translationService.findOneSub(+id);
  }

  @Delete('subtitle/:id')
  removeSub(@Param('id') id: string) {
    return this.translationService.removeSub(+id);
  }

  //dubbing
  @Post('dubbing')
  createDub(@Body() createDubbingDto: CreateDubbingDto) {
    return this.translationService.createDub(createDubbingDto);
  }

  @Get('dubbing')
  findAllDub() {
    return this.translationService.findAllDub();
  }

  @Get('dubbing/:id')
  findOneDub(@Param('id') id: string) {
    return this.translationService.findOneDub(+id);
  }

  @Delete('dubbing/:id')
  removeDub(@Param('id') id: string) {
    return this.translationService.removeDub(+id);
  }
}
