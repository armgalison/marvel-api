import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CharacterEntity } from './charater.entity';
import { SerieEntity } from './serie.entity';
import { StoryEntity } from './story.entity';
import { UrlEntity } from './url.entity';

@Entity({ name: 'comic' })
export class ComicEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  digitalId?: number;

  @ApiProperty()
  @Column({ nullable: false, unique: true })
  title: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  issueNumber?: number;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  variantDescription?: string;

  @ApiProperty()
  @Column()
  description: string;

  @Column()
  modified: Date;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  isbn?: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  upc?: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  diamondCode?: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  ean?: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  issn?: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  format?: string;

  @ApiPropertyOptional({ type: UrlEntity })
  @ManyToMany(type => UrlEntity)
  @JoinTable()
  urls?: UrlEntity[];

  @ManyToMany(type => CharacterEntity, character => character.comics)
  characters?: CharacterEntity[];

  @ManyToMany(type => StoryEntity, story => story.comics)
  stories?: StoryEntity[];

  @ManyToMany(type => SerieEntity, serie => serie.comics)
  series?: SerieEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  updateModifiedDate() {
    this.modified = new Date();
  }
}