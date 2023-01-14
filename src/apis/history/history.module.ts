import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { WatchingService } from './watching.service';
import { WatchingRepository } from './repositories/watching.repo';

@Module({
  controllers: [HistoryController],
  providers: [HistoryService, WatchingService, WatchingRepository],
})
export class HistoryModule {}
