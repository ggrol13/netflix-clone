import { Injectable } from '@nestjs/common';
import { CreateDubbingDto, CreateSubtitleDto } from '../dto/content.dto';

@Injectable()
export class TranslationService {
  createDub(createDubbingDto: CreateDubbingDto) {
    return 'This action adds a new dubbing';
  }

  findAllDub() {
    return `This action returns all dubbings`;
  }

  findOneDub(id: number) {
    return `This action returns a #${id} dubbings`;
  }

  removeDub(id: number) {
    return `This action removes a #${id} dubbing`;
  }

  createSub(createSubtitleDto: CreateSubtitleDto) {
    return 'This action adds a new subtitle';
  }

  findAllSub() {
    return `This action returns all subtitles`;
  }

  findOneSub(id: number) {
    return `This action returns a #${id} subtitle`;
  }

  removeSub(id: number) {
    return `This action removes a #${id} subtitle`;
  }
}
