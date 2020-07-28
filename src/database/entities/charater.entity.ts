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

  @Column()
  name?: string;

  @OneToOne(type => ImageEntity, { eager: true, cascade: true })
  @JoinColumn()
  thumbnail?: ImageEntity;

  @ManyToMany(type => UrlEntity, { eager: true, cascade: true })
  @JoinTable()
  urls?: UrlEntity[];

  @ManyToMany(type => ComicEntity, { eager: true, cascade: true })
  @JoinTable()
  comics?: ComicEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  updateModifiedDate() {
    this.modified = new Date();
  }
}
