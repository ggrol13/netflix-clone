import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';
import { TranslationService } from './translation.service';
import { EpisodeService } from './episode.service';

@Module({
  controllers: [ContentsController],
  providers: [ContentsService, TranslationService, EpisodeService],
})
export class ContentsModule {}
