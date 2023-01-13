import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ContentEntity } from '../entities/content.entity';

@Injectable()
export class ContentRepository extends Repository<ContentEntity> {
  constructor(private dataSource: DataSource) {
    super(ContentEntity, dataSource.createEntityManager());
  }
}
