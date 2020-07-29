import { PrimaryGeneratedColumn, Column, Entity, BaseEntity } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity({ name: 'image' })
export class ImageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  extension?: string;

  @ApiProperty()
  @Column()
  path?: string;
}
