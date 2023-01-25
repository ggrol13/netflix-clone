import { Injectable } from '@nestjs/common';

@Injectable()
export class HistoryService {
  create() {
    return 'This action adds a new playHistory';
  }
  remove(id: number) {
    return `This action removes a #${id} playHistory`;
  }
}
