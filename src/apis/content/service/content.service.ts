import { Injectable } from '@nestjs/common';
import {
  CreateContentDto,
  CreateGenreDto,
  CreateSeasonDto,
} from '../dto/content.dto';
import { ContentRepository } from '../repsositories/contents.repository';
import { GenreRepository } from '../repsositories/genre.repository';
import { DubbingRepository } from '../repsositories/dubbing.repository';
import { SubtitleRepository } from '../repsositories/subtitle.repository';
import { DataSource, In } from 'typeorm';
import { SeasonRepository } from '../repsositories/season.repository';
import { EpisodeRepository } from '../repsositories/episode.repository';
import { ContentEntity } from '../entities/content.entity';
import { GenreEntity } from '../entities/genre.entity';
import { SeasonEntity } from '../entities/season.entity';
import { EpisodeEntity } from '../entities/episode.entity';
import { DubbingEntity } from '../entities/dubbing.entity';
import { SubtitleEntity } from '../entities/subtitle.entity';
import { UploadService } from '../../upload/upload.service';
import { EpisodeService } from './episode.service';
import { ReusableService } from './reusable.service';
import { FindOneContentResponse } from '../response/content.response';

@Injectable()
export class ContentService {
  constructor(
    private contentRepo: ContentRepository,
    private genreRepo: GenreRepository,
    private seasonRepo: SeasonRepository,
    private episodeRepo: EpisodeRepository,
    private dubbingRepo: DubbingRepository,
    private subtitleRepo: SubtitleRepository,
    private uploadService: UploadService,
    private episodeService: EpisodeService,
    private reusableService: ReusableService,
    private dataSource: DataSource,
  ) {}

  async createContent(
    dto: CreateContentDto,
    files: Array<Express.Multer.File>,
  ): Promise<CreateContentDto> {
    await this.dataSource
      .transaction(async (manager) => {
        const thumbMain = await this.uploadService.uploadFiles(
          files,
          '/thumbnail',
          'thumbMain',
        );
        //url 필요
        const { title, cast, contentType, detail, year, language, ageLimit } =
          dto;
        const content = await manager.save(ContentEntity, {
          title,
          cast,
          contentType,
          detail,
          year,
          language,
          ageLimit,
          thumbnail: thumbMain[0],
        });

        const { genre } = dto;

        await this.reusableService.insertWithContentId(
          content.id,
          genre,
          'genre',
          manager,
        );

        const { seasonNum, episode, dubbing, subtitle } = dto;

        if (seasonNum) {
          await this.episodeService.createSeason(
            seasonNum,
            episode,
            dubbing,
            subtitle,
            content.id,
            files,
          );
        }
      })
      .catch((e) => {
        throw e;
      });
    return dto;
  }

  async deleteContent(contentId: string): Promise<string> {
    await this.dataSource.transaction(async (manager) => {
      const season = await manager.find(SeasonEntity, {
        select: { id: true },
        where: { content: { id: contentId } },
      });
      const seasonIds = season.map((season) => season.id);
      const episode = await manager.findBy(EpisodeEntity, {
        season: In(seasonIds),
      });
      const episodeIds = episode.map((ep) => ep.id);
      await manager.delete(ContentEntity, { id: contentId });
      await manager.delete(GenreEntity, { content: { id: contentId } });
      await manager.delete(SeasonEntity, { content: { id: contentId } });
      await this.reusableService.deleteEpDubSub({ ids: episodeIds });
    });

    return 'successfully deleted';
  }

  async findOneContent(contentId: string): Promise<FindOneContentResponse> {
    const { updatedAt, createdAt, view, ...rest } =
      await this.contentRepo.getContentWithSeasonByContentId(contentId);
    return rest;
  }

  createGenre(dto: CreateGenreDto) {
    return `This action returns all dubbings`;
  }
}
