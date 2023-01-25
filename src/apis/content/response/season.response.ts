import { PickType } from '@nestjs/swagger';
import { SeasonEntity } from '../entities/season.entity';
import { EpisodeResponse } from './episode.response';

export class SeasonResponse extends PickType(SeasonEntity, [
  'id',
  'seasonNum',
] as const) {
  episode: EpisodeResponse[];
}
