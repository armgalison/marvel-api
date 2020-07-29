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

@Entity({ name: 'event' })
export class EventEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  modified: Date;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @OneToOne(type => ImageEntity, { eager: true, cascade: true })
  @JoinColumn()
  thumbnail?: ImageEntity;

  @ManyToMany(type => CharacterEntity, character => character.events)
  characters?: CharacterEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  updateModifiedDate() {
    this.modified = new Date();
  }
}