import { Module } from '@nestjs/common';
import { PlayController } from './play.controller';
import { PlayService } from './play.service';
import { WatchingRepository } from '../history/repositories/watching.repo';
import { EpisodeRepository } from '../content/repsositories/episode.repository';
import { SeasonRepository } from '../content/repsositories/season.repository';

@Module({
  controllers: [PlayController],
  providers: [
    PlayService,
    WatchingRepository,
    EpisodeRepository,
    SeasonRepository,
  ],
})
export class PlayModule {}
