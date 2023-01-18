import { IsString } from 'class-validator';

export class EpisodeOnly {
  @IsString()
  name: string;

  @IsString()
  detail: string;

  @IsString()
  seasonNum: string | null;
}
