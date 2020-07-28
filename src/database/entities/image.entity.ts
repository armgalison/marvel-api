import { PrimaryGeneratedColumn, Column, Entity, BaseEntity } from 'typeorm';

@Entity({ name: 'image' })
export class ImageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  extension?: string;

  @Column()
  path?: string;
}
