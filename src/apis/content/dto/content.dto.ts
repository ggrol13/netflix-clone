import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { EpisodeSave } from '../interface/content.interface';

export class CreateContentDto {
  @IsString()
  title: string;

  @IsString()
  detail: string;

  @IsString()
  ageLimit: string;

  @IsString()
  year: string;

  @IsString()
  contentType: string;

  @IsString()
  language: string;

  @IsString({ each: true })
  genre: string[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateEpisodeDto)
  episode?: EpisodeSave[];

  @IsString({ each: true })
  @IsOptional()
  seasonNum: string[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateDubbingDto)
  dubbing?: CreateDubbingDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateSubtitleDto)
  subtitle?: CreateSubtitleDto[];
}

export class CreateGenreDto {
  @IsString()
  genre: string;
}

export class CreateSeasonDto {
  @IsString()
  seasonNum: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEpisodeDto)
  episode: EpisodeSave[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateDubbingDto)
  dubbing?: CreateDubbingDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateSubtitleDto)
  subtitle?: CreateSubtitleDto[];
}

export class CreateEpisodeDto {
  @IsString()
  name: string;

  @IsString()
  detail: string;

  @IsString()
  seasonNum: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateDubbingDto)
  dubbing?: CreateDubbingDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateSubtitleDto)
  subtitle?: CreateSubtitleDto[];
}

export class CreateDubbingDto {
  @IsString()
  episodeName: string;

  @IsString()
  language: string;
}

export class CreateSubtitleDto {
  @IsString()
  episodeName: string;

  @IsString()
  language: string;
}
