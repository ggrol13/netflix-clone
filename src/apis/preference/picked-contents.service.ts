import { Injectable } from '@nestjs/common';
import { CreatePickedContentsDto } from './dto/create-preference.dto';
import { UpdatePickedContentsDto } from './dto/update-preference.dto';

@Injectable()
export class PickedContentsService {
  createPicked(createPickedContentsDto: CreatePickedContentsDto) {
    return 'This action adds a new picked-content';
  }

  findAllPicked() {
    return `This action returns all picked-contents`;
  }

  findOnePicked(id: number) {
    return `This action returns a #${id} picked-contents`;
  }

  updatePicked(id: number, updatePickedContentsDto: UpdatePickedContentsDto) {
    return `This action updates a #${id} picked-contents`;
  }

  removePicked(id: number) {
    return `This action removes a #${id} picked-contents`;
  }
}
