import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ContentEntity } from '../../content/entities/content.entity';
import { ProfileEntity } from '../../user/entities/profile.entity';

@Entity('history')
export class HistoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'end_date', type: Date })
  endDate: Date;

  @CreateDateColumn({ name: 'created_at', type: Date })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: Date })
  updatedAt: Date;

  @ManyToOne(() => ContentEntity, (content) => content.id, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'content_id' })
  content: ContentEntity;

  @ManyToOne(() => ProfileEntity, (profile) => profile.id, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @Index()
  @JoinColumn({ name: 'profile_id' })
  profile: ProfileEntity;
}
