import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PickedContentsEntity } from '../entities/picked-contents.entity';

@Injectable()
export class PickedContentsRepository extends Repository<PickedContentsEntity> {
  constructor(private dataSource: DataSource) {
    super(PickedContentsEntity, dataSource.createEntityManager());
  }
}
