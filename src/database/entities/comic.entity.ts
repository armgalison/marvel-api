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

import { UrlEntity } from './url.entity';
import { CharacterEntity } from './charater.entity';
import { SerieEntity } from './serie.entity';
import { StoryEntity } from './story.entity';

@Entity({ name: 'comic' })
export class ComicEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  digitalId?: number;

  @Column({ nullable: false, unique: true })
  title: string;

  @Column({ nullable: true })
  issueNumber?: number;

  @Column({ nullable: true })
  variantDescription?: string;

  @Column()
  description: string;

  @Column()
  modified: Date;

  @Column({ nullable: true })
  isbn?: string;

  @Column({ nullable: true })
  upc?: string;

  @Column({ nullable: true })
  diamondCode?: string;

  @Column({ nullable: true })
  ean?: string;

  @Column({ nullable: true })
  issn?: string;

  @Column({ nullable: true })
  format?: string;

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