import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ContentEntity } from '../../contents/entities/content.entity';
import { ProfileEntity } from '../../user/entities/profile.entity';

@Entity('picked-contents')
export class PickedContentsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at', type: Date })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: Date })
  updatedAt: Date;

  @ManyToOne(() => ContentEntity, (content) => content.id)
  content: ContentEntity;

  @ManyToOne(() => ProfileEntity, (profile) => profile.id)
  profile: ProfileEntity;
}
