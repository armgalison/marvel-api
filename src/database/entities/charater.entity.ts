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

import { ComicEntity } from './comic.entity';
import { EventEntity } from './event.entity';
import { ImageEntity } from './image.entity';
import { UrlEntity } from './url.entity';

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

  @ManyToMany(type => EventEntity, event => event.characters, { cascade: true })
  @JoinTable({ name: 'characters_events' })
  events?: EventEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  updateModifiedDate() {
    this.modified = new Date();
  }
}
