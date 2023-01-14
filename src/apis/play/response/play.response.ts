import { PickType } from '@nestjs/swagger';
import { EpisodeEntity } from '../../content/entities/episode.entity';

export class PlayContentResponse extends PickType(EpisodeEntity, [
  'id',
  'name',
  'thumbnail',
  'detail',
  'videoFilePath',
]) {}
