import { Injectable } from '@nestjs/common';
import { PlayDto } from './dto/play.dto';
import { ProfileType } from '../../common/decorator/user.decorator';
import { WatchingRepository } from '../history/repositories/watching.repo';
import { EpisodeRepository } from '../content/repsositories/episode.repository';
import { SeasonRepository } from '../content/repsositories/season.repository';
import { EpisodeEntity } from '../content/entities/episode.entity';
import { PlayContentResponse } from './response/play.response';

@Injectable()
export class PlayService {
  constructor(
    private watchingRepo: WatchingRepository,
    private episodeRepo: EpisodeRepository,
    private seasonRepo: SeasonRepository,
  ) {}
  async playContent(
    profile: ProfileType,
    contentId: string,
  ): Promise<PlayContentResponse> {
    const watching = await this.watchingRepo.findOne({
      relations: { episode: true },
      where: { profile: { id: profile.profileId }, content: { id: contentId } },
    });
    if (watching) {
      const episode = await this.episodeRepo.findOne({
        select: {
          id: true,
          name: true,
          thumbnail: true,
          detail: true,
          videoFilePath: true,
        },
        where: { id: watching.episode.id },
      });
      return episode;
    }

    const season = await this.seasonRepo.find({
      relations: { episode: true },
      where: { content: { id: contentId } },
      order: { seasonNum: 'ASC' },
    });

    const episode = await this.episodeRepo.findOne({
      select: {
        id: true,
        name: true,
        thumbnail: true,
        detail: true,
        videoFilePath: true,
      },
      where: { season: { id: season[0].id } },
    });
    return episode;
  }

  async savePersonalized(profile: ProfileType, contentId: string) {}
}
