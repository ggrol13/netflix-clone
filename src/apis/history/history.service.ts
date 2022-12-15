import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';

@Injectable()
export class HistoryService {
  create(createPlayHistoryDto: CreateHistoryDto) {
    return 'This action adds a new playHistory';
  }

  findAll() {
    return `This action returns all playHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playHistory`;
  }

  update(id: number, updatePlayHistoryDto: UpdateHistoryDto) {
    return `This action updates a #${id} playHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} playHistory`;
  }
}
