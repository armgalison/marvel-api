import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CharacterEntity } from './charater.entity';
import { ComicEntity } from './comic.entity';
import { ImageEntity } from './image.entity';
import { SerieEntity } from './serie.entity';

@Entity({ name: 'story' })
export class StoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  type?: string;

  @Column()
  modified: Date;

  @OneToOne(type => ImageEntity, { eager: true, cascade: true })
  @JoinColumn()
  thumbnail?: ImageEntity;

  @ManyToMany(type => CharacterEntity, character => character.stories)
  characters?: CharacterEntity[];

  @ManyToMany(type => ComicEntity, comic => comic.stories)
  comics?: ComicEntity[];

  @ManyToMany(type => SerieEntity, serie => serie.stories)
  series?: SerieEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  updateModifiedDate() {
    this.modified = new Date();
  }
}
