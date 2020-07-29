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

@Entity({ name: 'comic' })
export class ComicEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  digitalId?: number;

  @Column({ nullable: false, unique: true })
  title: string;

  @Column()
  issueNumber?: number;

  @Column()
  variantDescription?: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  modified?: Date;

  @Column()
  isbn?: string;

  @Column()
  upc?: string;

  @Column()
  diamondCode?: string;

  @Column()
  ean?: string;

  @Column()
  issn?: string;

  @Column()
  format?: string;

  @ManyToMany(type => UrlEntity)
  @JoinTable()
  urls?: UrlEntity[];

  @ManyToMany(type => CharacterEntity, character => character.comics)
  characters?: CharacterEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  updateModifiedDate() {
    this.modified = new Date();
  }
}