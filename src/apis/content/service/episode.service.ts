import { Injectable } from '@nestjs/common';
import { CreateEpisodeDto, CreateSeasonDto } from '../dto/content.dto';
import { DubbingRepository } from '../repsositories/dubbing.repository';
import { SeasonRepository } from '../repsositories/season.repository';
import { EpisodeRepository } from '../repsositories/episode.repository';
import { SubtitleRepository } from '../repsositories/subtitle.repository';
import { DataSource } from 'typeorm';
import { EpisodeSave } from '../interface/content.interface';
import { EpisodeEntity } from '../entities/episode.entity';
import { DubbingEntity } from '../entities/dubbing.entity';
import { SubtitleEntity } from '../entities/subtitle.entity';
import { SeasonEntity } from '../entities/season.entity';
import { UploadService } from '../../upload/upload.service';

@Injectable()
export class EpisodeService {
  constructor(
    private seasonRepo: SeasonRepository,
    private episodeRepo: EpisodeRepository,
    private dubbingRepo: DubbingRepository,
    private subtitleRepo: SubtitleRepository,
    private uploadService: UploadService,
    private dataSource: DataSource,
  ) {}

  async createSeason(
    dto: CreateSeasonDto,
    contentId: string,
    files: Array<Express.Multer.File>,
  ): Promise<CreateSeasonDto> {
    await this.dataSource
      .transaction(async (manager) => {
        const season = await manager.save(SeasonEntity, {
          seasonNum: dto.seasonNum,
          content: { id: contentId },
        });

        const images = files['thumbEp'].filter((file) => file);
        const thumbEp = await this.uploadService.uploadFiles(
          images,
          '/thumbnail',
        );
        const videos = files['video'].filter((file) => file);
        const epVideos = await this.uploadService.uploadFiles(videos, '/video');

        for (let i = 0; i < dto.episode.length; i++) {
          //url 필요함
          dto.episode[i]['thumbnail'] = thumbEp[i];
          dto.episode[i]['videoFilePath'] = epVideos[i];
        }

        const episode = await Promise.all(
          dto.episode.map(async (episode) => {
            const saveEpisode: EpisodeSave = { ...episode };
            return await manager.save(EpisodeEntity, {
              ...saveEpisode,
              season: { id: season.id },
            });
          }),
        );

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

  async deleteSeason(seasonId: string): Promise<string> {
    const episode = await this.episodeRepo.find({
      select: { id: true },
      where: { season: { id: seasonId } },
    });
    await this.dataSource.transaction(async (manager) => {
      await manager.delete(SeasonEntity, { id: seasonId });
      episode.map(
        async (episode) =>
          await manager.delete(EpisodeEntity, { id: episode.id }),
      );
      episode.map(
        async (episode) =>
          await manager.delete(DubbingEntity, { episode: { id: episode.id } }),
      );
      episode.map(
        async (episode) =>
          await manager.delete(SubtitleEntity, { episode: { id: episode.id } }),
      );
    });
    return 'successfully deleted';
  }

  async createEp(
    dto: CreateEpisodeDto,
    seasonId: string,
    files: Array<Express.Multer.File>,
  ): Promise<CreateEpisodeDto> {
    const saveEpisode: EpisodeSave = { ...dto };
    await this.dataSource
      .transaction(async (manager) => {
        const images = files['thumbEp'].filter((file) => file);
        const thumbEp = await this.uploadService.uploadFiles(
          images,
          '/thumbnail',
        );
        const videos = files['video'].filter((file) => file);
        const epVideos = await this.uploadService.uploadFiles(videos, '/video');
        console.log(dto);

        //url 필요함
        saveEpisode['thumbnail'] = thumbEp[0];
        saveEpisode['videoFilePath'] = epVideos[0];

        const episode = await manager.save(EpisodeEntity, {
          ...saveEpisode,
          season: { id: seasonId },
        });
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
          await manager.save(DubbingEntity, {
            ...dto.dubbing[0],
            episode: { id: episode.id },
          });
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
          await manager.save(SubtitleEntity, {
            ...dto.subtitle[0],
            episode: { id: episode.id },
          });
        }
      })
      .catch((e) => {
        throw e;
      });
    return dto;
  }

  async deleteEp(episodeId: string) {
    await this.dataSource
      .transaction(async (manager) => {
        await manager.delete(EpisodeEntity, { id: episodeId }),
          await manager.delete(DubbingEntity, { episode: { id: episodeId } }),
          await manager.delete(SubtitleEntity, { episode: { id: episodeId } });
      })
      .catch((e) => {
        throw e;
      });

    return 'successfully deleted';
  }
}
