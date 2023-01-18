import { Injectable } from '@nestjs/common';
import { ProfileType } from '../../common/decorator/user.decorator';
import { WatchingRepository } from '../history/repositories/watching.repo';
import { EpisodeRepository } from '../content/repsositories/episode.repository';
import { SeasonRepository } from '../content/repsositories/season.repository';
import { PlayResponse } from './response/play.response';

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
  ): Promise<PlayResponse> {
    const watching = await this.watchingRepo.findOne({
      select: {
        episode: {
          id: true,
          name: true,
          thumbnail: true,
          detail: true,
          videoFilePath: true,
        },
      },
      relations: { episode: true },
      where: { profile: { id: profile.profileId }, content: { id: contentId } },
    });
    if (watching) {
      const { episode } = watching;
      const seasonByEpisodeId = await this.episodeRepo.findOne({
        select: {
          id: true,
          season: {
            id: true,
            seasonNum: true,
          },
        },
        relations: { season: true },
        where: { id: watching.episode.id },
      });
      return {
        season: seasonByEpisodeId.season,
        episode: episode,
        timeStamp: watching.timeStamp,
      };
    }

    const season = await this.seasonRepo.findOne({
      select: {
        id: true,
        seasonNum: true,
        episode: {
          id: true,
          name: true,
          thumbnail: true,
          detail: true,
          videoFilePath: true,
        },
      },
      relations: { episode: true },
      where: { content: { id: contentId } },
      order: { seasonNum: 'ASC' },
    });
    const { episode, id, seasonNum } = season;
    await this.watchingRepo.save({
      timeStamp: 0,
      profile: { id: profile.profileId },
      content: { id: contentId },
      episode: { id: episode[0].id },
    });

    return {
      season: {
        id,
        seasonNum,
      },
      episode: episode[0],
      timeStamp: 0,
    };
  }
}
