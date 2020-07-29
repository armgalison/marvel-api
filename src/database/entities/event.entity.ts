
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';

import { ImageEntity } from './image.entity';
import { CharacterEntity } from './charater.entity';
import { SerieEntity } from './serie.entity';

@Entity({ name: 'event' })
export class EventEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @Column()
  modified: Date;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  start?: Date;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  end?: Date;

  @ApiPropertyOptional({ type: ImageEntity })
  @OneToOne(type => ImageEntity, { eager: true, cascade: true })
  @JoinColumn()
  thumbnail?: ImageEntity;

  @ManyToMany(type => CharacterEntity, character => character.events)
  characters?: CharacterEntity[];

  @ManyToMany(type => SerieEntity, serie => serie.events)
  series?: SerieEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  updateModifiedDate() {
    this.modified = new Date();
  }
}