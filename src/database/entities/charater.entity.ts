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
  AfterInsert,
} from 'typeorm';

import { ImageEntity } from './image.entity';
import { UrlEntity } from './url.entity';
import { ComicEntity } from './comic.entity';

@Entity({ name: 'character' })
export class CharacterEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description?: string;

  @Column()
  modified?: Date;

  @Column({ unique: true })
  name?: string;

  @OneToOne(type => ImageEntity, { eager: true, cascade: true })
  @JoinColumn()
  thumbnail?: ImageEntity;

  @ManyToMany(type => UrlEntity, { eager: true, cascade: true })
  @JoinTable()
  urls?: UrlEntity[];

  @ManyToMany(type => ComicEntity, comic => comic.characters, { cascade: true })
  @JoinTable({ name: 'characters_comics' })
  comics?: ComicEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  updateModifiedDate() {
    this.modified = new Date();
  }
}
