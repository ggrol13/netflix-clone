import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { WatchingService } from './watching.service';

@Module({
  controllers: [HistoryController],
  providers: [HistoryService, WatchingService],
})
export class HistoryModule {}
