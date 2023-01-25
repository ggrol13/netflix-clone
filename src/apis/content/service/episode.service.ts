import { Injectable } from '@nestjs/common';
import {
  CreateDubbingDto,
  CreateEpisodeDto,
  CreateSeasonDto,
  CreateSubtitleDto,
  DeleteEpSubDto,
} from '../dto/content.dto';
import { DubbingRepository } from '../repsositories/dubbing.repository';
import { SeasonRepository } from '../repsositories/season.repository';
import { EpisodeRepository } from '../repsositories/episode.repository';
import { SubtitleRepository } from '../repsositories/subtitle.repository';
import { DataSource, EntityManager, In } from 'typeorm';
import { EpisodeOnly } from '../interface/content.interface';
import { EpisodeEntity } from '../entities/episode.entity';
import { DubbingEntity } from '../entities/dubbing.entity';
import { SubtitleEntity } from '../entities/subtitle.entity';
import { SeasonEntity } from '../entities/season.entity';
import { UploadService } from '../../upload/upload.service';
import { ContentService } from './content.service';
import { ReusableService } from './reusable.service';

@Injectable()
export class EpisodeService {
  constructor(
    private seasonRepo: SeasonRepository,
    private episodeRepo: EpisodeRepository,
    private dubbingRepo: DubbingRepository,
    private subtitleRepo: SubtitleRepository,
    private uploadService: UploadService,
    private reusableService: ReusableService,
    private dataSource: DataSource,
  ) {}

  async createSeason(
    seasonNum: string[],
    episode: EpisodeOnly[],
    dubbing: CreateDubbingDto[],
    subtitle: CreateSubtitleDto[],
    contentId: string,
    files: Array<Express.Multer.File>,
  ): Promise<CreateSeasonDto> {
    await this.dataSource
      .transaction(async (manager) => {
        if (seasonNum[0] === '2') {
          await manager.update(
            SeasonEntity,
            { content: { id: contentId } },
            { seasonNum: '1' },
          );
        }
        const season = await this.reusableService.insertWithContentId(
          contentId,
          seasonNum,
          'season',
          manager,
        );
        const seasonId = season.map((season) => season.id);

        if (episode) {
          await this.reusableService.createEpDubSub(
            seasonNum,
            seasonId,
            episode,
            dubbing,
            subtitle,
            contentId,
            manager,
            files,
          );
        }
      })
      .catch((e) => {
        throw e;
      });
    return { seasonNum, episode, dubbing, subtitle };
  }

  async deleteSeason(dto: DeleteSeasonDto): Promise<string> {
    const episode = await this.episodeRepo.findBy({
      season: In(dto.ids),
    });
    const episodeIds = episode.map((ep) => ep.id);
    await this.dataSource.transaction(async (manager) => {
      await manager.delete(SeasonEntity, { id: In(dto.ids) });
      await this.reusableService.deleteEpDubSub({ ids: episodeIds });
    });
    return 'successfully deleted';
  }

  async createEp(
    dto: CreateEpisodeDto,
    contentId: string,
    files: Array<Express.Multer.File>,
  ): Promise<CreateEpisodeDto> {
    const season = await this.seasonRepo.find({
      select: {
        id: true,
        seasonNum: true,
        content: {
          id: true,
        },
      },
      relations: { content: true },
      where: { content: { id: contentId } },
    });
    const seasonId = season.map((season) => season.id);
    const seasonNum = season.map((season) => season.seasonNum);
    await this.dataSource
      .transaction(async (manager) => {
        const { episode, dubbing, subtitle } = dto;
        await this.reusableService.createEpDubSub(
          seasonNum,
          seasonId,
          episode,
          dubbing,
          subtitle,
          contentId,
          manager,
          files,
        );
      })
      .catch((e) => {
        throw e;
      });
    return dto;
  }

  async deleteEp(dto: DeleteEpisodeDto) {
    await this.reusableService.deleteEpDubSub(dto);
    return 'successfully deleted';
  }
}
