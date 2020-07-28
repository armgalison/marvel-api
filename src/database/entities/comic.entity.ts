import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UrlEntity } from './url.entity';

@Entity({ name: 'comic' })
export class ComicEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  digitalId?: number;

  @Column()
  title?: string;

  @Column()
  issueNumber?: number;

  @Column()
  variantDescription?: string;

  @Column()
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

  @Column()
  pageCount?: string;

  @ManyToMany(type => UrlEntity)
  @JoinTable()
  urls?: UrlEntity[];
}