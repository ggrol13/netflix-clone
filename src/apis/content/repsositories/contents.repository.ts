import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ContentEntity } from '../entities/content.entity';
import { FindOneContentResponse } from '../response/content.response';

@Injectable()
export class ContentRepository extends Repository<ContentEntity> {
  constructor(private dataSource: DataSource) {
    super(ContentEntity, dataSource.createEntityManager());
  }

  async getContentWithSeasonByContentId(contentId: string) {
    return await this.dataSource
      .getRepository(ContentEntity)
      .createQueryBuilder('c')
      .select([
        'c',
        's.id',
        's.seasonNum',
        'e.id',
        'e.thumbnail',
        'e.detail',
        'e.name',
        'p.id',
        'p.preference',
      ])
      .leftJoin('c.season', 's')
      .leftJoin('s.episode', 'e')
      .leftJoin('c.preference', 'p')
      .where('c.id = :contentId', { contentId })
      .getOne();
  }
}
