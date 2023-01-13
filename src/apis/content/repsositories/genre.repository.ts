import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { GenreEntity } from '../entities/genre.entity';

@Injectable()
export class GenreRepository extends Repository<GenreEntity> {
  constructor(private dataSource: DataSource) {
    super(GenreEntity, dataSource.createEntityManager());
  }
}
