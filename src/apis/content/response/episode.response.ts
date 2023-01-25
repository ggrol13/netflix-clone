import { PickType } from '@nestjs/swagger';
import { EpisodeEntity } from '../entities/episode.entity';

export class EpisodeResponse extends PickType(EpisodeEntity, [
  'id',
  'thumbnail',
  'name',
  'detail',
] as const) {}
