import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { DubbingEntity } from '../entities/dubbing.entity';

@Injectable()
export class DubbingRepository extends Repository<DubbingEntity> {
  constructor(private dataSource: DataSource) {
    super(DubbingEntity, dataSource.createEntityManager());
  }
}
