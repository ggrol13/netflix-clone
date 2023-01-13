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
} from './dto/content.dto';

import { TranslationService } from './service/translation.service';
import { EpisodeService } from './service/episode.service';
import { ApiTags } from '@nestjs/swagger';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
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
    return this.episodeService.createSeason(dto, contentId, files);
  }

  @Delete('season/:seasonId')
  deleteSeason(@Param('seasonId') seasonId: string) {
    return this.episodeService.deleteSeason(seasonId);
  }

  //ep
  @Post('episode/:seasonId')
  @UseInterceptors(FileFieldsInterceptor(uploadEpisode, multer))
  createEp(
    @Body() dto: CreateEpisodeDto,
    @Param('seasonId') seasonId: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.episodeService.createEp(dto, seasonId, files);
  }

  @Delete('episode/:episodeId')
  deleteEp(@Param('episodeId') episodeId: string) {
    return this.episodeService.deleteEp(episodeId);
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
