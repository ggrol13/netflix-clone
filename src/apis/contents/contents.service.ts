import { Injectable } from '@nestjs/common';
import { CreateContentDto, CreateGenreDto } from './dto/create-content.dto';
import { UpdateContentDto, UpdateGenreDto } from './dto/update-content.dto';

@Injectable()
export class ContentsService {
  create(createContentDto: CreateContentDto) {
    return 'This action adds a new content';
  }

  findAll() {
    return `This action returns all contents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} content`;
  }

  update(id: number, updateContentDto: UpdateContentDto) {
    return `This action updates a #${id} content`;
  }

  remove(id: number) {
    return `This action removes a #${id} content`;
  }

  createGenre(createGenreDto: CreateGenreDto) {
    return 'This action adds a new genre';
  }

  findAllGenre() {
    return `This action returns all genres`;
  }

  findOneGenre(id: number) {
    return `This action returns a #${id} genre`;
  }

  updateGenre(id: number, updateGenreDto: UpdateGenreDto) {
    return `This action updates a #${id} genre`;
  }

  removeGenre(id: number) {
    return `This action removes a #${id} genre`;
  }
}
