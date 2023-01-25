import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, In } from 'typeorm';
import { GenreEntity } from '../entities/genre.entity';
import { SeasonEntity } from '../entities/season.entity';
import { EpisodeEntity } from '../entities/episode.entity';
import { DubbingEntity } from '../entities/dubbing.entity';
import { SubtitleEntity } from '../entities/subtitle.entity';
import { EpisodeOnly } from '../interface/content.interface';
import {
  CreateDubbingDto,
  CreateGenreDto,
  CreateSubtitleDto,
  DeleteEpSubDto,
} from '../dto/content.dto';
import { UploadService } from '../../upload/upload.service';
import { EpisodeRepository } from '../repsositories/episode.repository';

@Injectable()
export class ReusableService {
  constructor(
    private uploadService: UploadService,
    private episodeRepo: EpisodeRepository,
    private dataSource: DataSource,
  ) {}

  async insertWithContentId(
    contentId: string,
    field: string[],
    entityType: string,
    manager: EntityManager,
  ) {
    switch (entityType) {
      case 'genre':
        const genre = field.map((genre) => {
          return { genre, content: { id: contentId } };
        });
        await manager.insert(GenreEntity, genre);
        break;
      case 'season':
        const season = field.map((seasonNum) => {
          return { seasonNum, content: { id: contentId } };
        });
        const save = await manager.insert(SeasonEntity, season);
        return save.identifiers;
        break;
    }
  }

  async createEpDubSub(
    seasonNum: string[],
    seasonId: string[],
    episode: EpisodeOnly[],
    dubbing: CreateDubbingDto[],
    subtitle: CreateSubtitleDto[],
    contentId: string,
    manager: EntityManager,
    files: Array<Express.Multer.File>,
  ) {
    if (episode) {
      const thumbEp = await this.uploadService.uploadFiles(
        files,
        '/thumbnail',
        'thumbEp',
      );
      const epVideos = await this.uploadService.uploadFiles(
        files,
        '/video',
        'video',
      );
      const episodes = episode.map((ep) => {
        const index = episode.indexOf(ep);
        return {
          ...ep,
          thumbnail: thumbEp[index],
          videoFilePath: epVideos[index],
        };
      });
      seasonId.map((id) => {
        const index = seasonId.indexOf(id);
        episodes.map((ep) => {
          if (seasonNum[index] === ep.seasonNum) {
            ep['season'] = { id: id };
          }
        });
      });

      await manager.insert(EpisodeEntity, episodes);
    }

    if (dubbing) {
      const dubFiles = await this.uploadService.uploadFiles(
        files,
        '/dubbing',
        'dubbing',
      );
      dubbing.map((dub) => {
        const index = dubbing.indexOf(dub);
        dub['dubbingFilePath'] = dubFiles[index];
      });

      episode.map((ep) => {
        dubbing.map((dub) => {
          if (ep.name === dub.episodeName) {
            dub['episode'] = { id: ep['id'] };
          }
        });
      });
      await manager.insert(DubbingEntity, dubbing);
    }

    if (subtitle) {
      const subFiles = await this.uploadService.uploadFiles(
        files,
        '/subtitle',
        'subtitle',
      );
      subtitle.map((sub) => {
        const index = subtitle.indexOf(sub);
        sub['subtitleFilePath'] = subFiles[index];
      });

      episode.map((ep) => {
        subtitle.map((sub) => {
          if (ep.name === sub.episodeName) {
            sub['episode'] = { id: ep['id'] };
          }
        });
      });
      await manager.insert(SubtitleEntity, subtitle);
    }
  }

  async deleteEpDubSub(episodeId: DeleteSeasonDto) {
    await this.dataSource
      .transaction(async (manager) => {
        await manager.delete(EpisodeEntity, episodeId.ids);
        await manager.delete(DubbingEntity, { episode: In(episodeId.ids) });
        await manager.delete(SubtitleEntity, { episode: In(episodeId.ids) });
      })
      .catch((e) => {
        throw e;
      });
  }
}
