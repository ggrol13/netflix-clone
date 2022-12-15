import { Injectable } from '@nestjs/common';
import { CreateWatchingDto } from './dto/create-history.dto';
import { UpdateWatchingDto } from './dto/update-history.dto';

@Injectable()
export class WatchingService {
  createWatching(createWatchingDto: CreateWatchingDto) {
    return 'This action adds a new watching';
  }

  findAllWatching() {
    return `This action returns all watching`;
  }

  findOneWatching(id: number) {
    return `This action returns a #${id} watching`;
  }

  updateWatching(id: number, updateWatchingDto: UpdateWatchingDto) {
    return `This action updates a #${id} watching`;
  }

  removeWatching(id: number) {
    return `This action removes a #${id} watching`;
  }
}
