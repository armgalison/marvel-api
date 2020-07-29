import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CharacterEntity } from './charater.entity';
import { ComicEntity } from './comic.entity';
import { EventEntity } from './event.entity';
import { ImageEntity } from './image.entity';
import { UrlEntity } from './url.entity';
import { StoryEntity } from './story.entity';

@Entity({ name: 'series' })
export class SerieEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;
  
  @ApiPropertyOptional({ type: UrlEntity, isArray: true })
  @ManyToMany(type => UrlEntity, { eager: true, cascade: true })
  @JoinTable()
  urls?: UrlEntity[];

  @ApiPropertyOptional()
  @Column({ nullable: true })
  startYear?: number;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  endYear?: number;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  rating?: string;

  @Column()
  modified: Date;

  @ApiPropertyOptional({ type: ImageEntity })
  @OneToOne(type => ImageEntity, { eager: true, cascade: true })
  @JoinColumn()
  thumbnail?: ImageEntity;

  @ManyToMany(type => ComicEntity, comic => comic.series)
  comics?: ComicEntity[];

  @ManyToMany(type => EventEntity, event => event.series)
  events?: EventEntity[];

  @ManyToMany(type => CharacterEntity, character => character.series)
  characters?: CharacterEntity[];

  @ManyToMany(type => StoryEntity, story => story.series)
  stories?: StoryEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  updateModifiedDate() {
    this.modified = new Date();
  }
}