import { Injectable } from '@nestjs/common';
import { CreateContentDto, CreateGenreDto } from '../dto/content.dto';
import { ContentRepository } from '../repsositories/contents.repository';
import { GenreRepository } from '../repsositories/genre.repository';
import { DubbingRepository } from '../repsositories/dubbing.repository';
import { SubtitleRepository } from '../repsositories/subtitle.repository';
import { DataSource } from 'typeorm';
import { SeasonRepository } from '../repsositories/season.repository';
import { EpisodeRepository } from '../repsositories/episode.repository';
import { ContentSave, EpisodeSave } from '../interface/content.interface';
import { ContentEntity } from '../entities/content.entity';
import { GenreEntity } from '../entities/genre.entity';
import { SeasonEntity } from '../entities/season.entity';
import { EpisodeEntity } from '../entities/episode.entity';
import { DubbingEntity } from '../entities/dubbing.entity';
import { SubtitleEntity } from '../entities/subtitle.entity';
import { UploadService } from '../../upload/upload.service';

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
    private dataSource: DataSource,
  ) {}

  async createContent(
    dto: CreateContentDto,
    files: Array<Express.Multer.File>,
  ): Promise<CreateContentDto> {
    let season;
    let episode;
    const contentSave: ContentSave = { ...dto };

    await this.dataSource
      .transaction(async (manager) => {
        const mainImage = files['thumbMain'].filter((file) => file);
        const thumbMain = await this.uploadService.uploadFiles(
          mainImage,
          '/thumbnail',
        );
        contentSave['thumbnail'] = thumbMain[0];
        const content = await manager.save(ContentEntity, { ...contentSave });

        dto.genre.map(async (genre) => {
          await manager.save(GenreEntity, {
            genre,
            content: { id: content.id },
          });
        });
        if (dto.seasonNum) {
          season = await Promise.all(
            dto.seasonNum.map(
              async (seasonNum) =>
                await manager.save(SeasonEntity, {
                  seasonNum,
                  content: { id: content.id },
                }),
            ),
          );
        }

        if (dto.episode) {
          const images = files['thumbEp'].filter((file) => file);
          const thumbEp = await this.uploadService.uploadFiles(
            images,
            '/thumbnail',
          );
          const videos = files['video'].filter((file) => file);
          const epVideos = await this.uploadService.uploadFiles(
            videos,
            '/video',
          );

          for (let i = 0; i < dto.episode.length; i++) {
            //url 필요함
            dto.episode[i]['thumbnail'] = thumbEp[i];
            dto.episode[i]['videoFilePath'] = epVideos[i];
          }
          episode = await Promise.all(
            season.map(async (season) => {
              return await Promise.all(
                dto.episode.map(async (episode) => {
                  if (season.seasonNum === episode.seasonNum) {
                    const saveEpisode: EpisodeSave = { ...episode };
                    return await manager.save(EpisodeEntity, {
                      ...saveEpisode,
                      season: { id: season.id },
                    });
                  }
                }),
              );
            }),
          );
          episode = episode[0];
        }
        if (dto.dubbing) {
          const dubFiles = files['dubbing'].filter((file) => file);
          const dubbing = await this.uploadService.uploadFiles(
            dubFiles,
            '/dubbing',
          );
          for (let i = 0; i < dto.dubbing.length; i++) {
            //url 필요함
            dto.dubbing[i]['dubbingFilePath'] = dubbing[i];
          }
          await Promise.all(
            episode.map(async (episode) => {
              await Promise.all(
                dto.dubbing.map(async (dubbing) => {
                  if (episode.name === dubbing.episodeName) {
                    await manager.save(DubbingEntity, {
                      ...dubbing,
                      episode: { id: episode.id },
                    });
                  }
                }),
              );
            }),
          );
        }
        if (dto.subtitle) {
          const subFiles = files['subtitle'].filter((file) => file);
          const subtitle = await this.uploadService.uploadFiles(
            subFiles,
            '/subtitle',
          );
          for (let i = 0; i < dto.subtitle.length; i++) {
            //url 필요함
            dto.subtitle[i]['subtitleFilePath'] = subtitle[i];
          }
          await Promise.all(
            episode.map(async (episode) => {
              await Promise.all(
                dto.subtitle.map(async (subtitle) => {
                  if (episode.name === subtitle.episodeName) {
                    await manager.save(SubtitleEntity, {
                      ...subtitle,
                      episode: { id: episode.id },
                    });
                  }
                }),
              );
            }),
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
      const episode = await Promise.all(
        season.map(
          async (season) =>
            await manager.find(EpisodeEntity, {
              select: { id: true },
              where: { season: { id: season.id } },
            }),
        ),
      );
      await manager.delete(ContentEntity, { id: contentId });
      await manager.delete(GenreEntity, { content: { id: contentId } });
      await manager.delete(SeasonEntity, { content: { id: contentId } });
      season.map(
        async (season) =>
          await manager.delete(EpisodeEntity, { season: { id: season.id } }),
      );
      episode[0].map(
        async (episode) =>
          await manager.delete(DubbingEntity, { episode: { id: episode.id } }),
      );
      episode[0].map(
        async (episode) =>
          await manager.delete(SubtitleEntity, { episode: { id: episode.id } }),
      );
    });

    return 'successfully deleted';
  }

  createGenre(dto: CreateGenreDto) {
    return `This action returns all dubbings`;
  }
}
