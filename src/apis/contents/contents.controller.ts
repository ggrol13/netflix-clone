import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContentsService } from './contents.service';
import {
  CreateContentDto,
  CreateDubbingDto,
  CreateEpisodeDto,
  CreateGenreDto,
  CreateSeasonDto,
  CreateSubtitleDto,
} from './dto/create-content.dto';
import {
  UpdateContentDto,
  UpdateDubbingDto,
  UpdateEpisodeDto,
  UpdateGenreDto,
  UpdateSeasonDto,
  UpdateSubtitleDto,
} from './dto/update-content.dto';
import { TranslationService } from './translation.service';
import { EpisodeService } from './episode.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('contents')
@ApiTags('contents')
export class ContentsController {
  constructor(
    private readonly contentsService: ContentsService,
    private readonly translationService: TranslationService,
    private readonly episodeService: EpisodeService,
  ) {}

  @Post('content')
  create(@Body() createContentDto: CreateContentDto) {
    return this.contentsService.create(createContentDto);
  }

  @Get('content')
  findAll() {
    return this.contentsService.findAll();
  }

  @Get('content/:id')
  findOne(@Param('id') id: string) {
    return this.contentsService.findOne(+id);
  }

  @Patch('content/:id')
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.contentsService.update(+id, updateContentDto);
  }

  @Delete('content/:id')
  remove(@Param('id') id: string) {
    return this.contentsService.remove(+id);
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

  @Patch('subtitle/:id')
  updateSub(
    @Param('id') id: string,
    @Body() updateSubtitleDto: UpdateSubtitleDto,
  ) {
    return this.translationService.updateSub(+id, updateSubtitleDto);
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

  @Patch('dubbing/:id')
  updateDub(
    @Param('id') id: string,
    @Body() updateDubbingDto: UpdateDubbingDto,
  ) {
    return this.translationService.updateDub(+id, updateDubbingDto);
  }

  @Delete('dubbing/:id')
  removeDub(@Param('id') id: string) {
    return this.translationService.removeDub(+id);
  }

  //ep
  @Post('episode')
  createEp(@Body() createEpisodeDto: CreateEpisodeDto) {
    return this.episodeService.createEp(createEpisodeDto);
  }

  @Get('episode')
  findAllEp() {
    return this.episodeService.findAllEp();
  }

  @Get('episode/:id')
  findOneEp(@Param('id') id: string) {
    return this.episodeService.findOneEp(+id);
  }

  @Patch('episode/:id')
  updateEp(
    @Param('id') id: string,
    @Body() updateEpisodeDto: UpdateEpisodeDto,
  ) {
    return this.episodeService.updateEp(+id, updateEpisodeDto);
  }

  @Delete('episode/:id')
  removeEp(@Param('id') id: string) {
    return this.episodeService.removeEp(+id);
  }

  //season
  @Post('season')
  createSeason(@Body() createSeasonDto: CreateSeasonDto) {
    return this.episodeService.createSeason(createSeasonDto);
  }

  @Get('season')
  findAllSeason() {
    return this.episodeService.findAllSeason();
  }

  @Get('season/:id')
  findOneSeason(@Param('id') id: string) {
    return this.episodeService.findOneSeason(+id);
  }

  @Patch('season/:id')
  updateSeason(
    @Param('id') id: string,
    @Body() updateSeasonDto: UpdateSeasonDto,
  ) {
    return this.episodeService.updateSeason(+id, updateSeasonDto);
  }

  @Delete('season/:id')
  removeSeason(@Param('id') id: string) {
    return this.episodeService.removeSeason(+id);
  }

  //genre
  @Post('genre')
  createGenre(@Body() createGenreDto: CreateGenreDto) {
    return this.contentsService.createGenre(createGenreDto);
  }

  @Get('genre')
  findAllGenre() {
    return this.contentsService.findAllGenre();
  }

  @Get('genre/:id')
  findOneGenre(@Param('id') id: string) {
    return this.contentsService.findOneGenre(+id);
  }

  @Patch('genre/:id')
  updateGenre(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.contentsService.updateGenre(+id, updateGenreDto);
  }

  @Delete('genre/:id')
  removeGenre(@Param('id') id: string) {
    return this.contentsService.removeGenre(+id);
  }
}
