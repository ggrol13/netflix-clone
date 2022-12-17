import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ContentEntity } from './content.entity';

@Entity('genre')
export class GenreEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20, name: 'genre', nullable: false })
  genre: string;

  @CreateDateColumn({ name: 'created_at', type: Date })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: Date })
  updatedAt: Date;

  @ManyToOne(() => ContentEntity, (content) => content.id, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @JoinColumn({ name: 'content_id' })
  content: ContentEntity;
}
