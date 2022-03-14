/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Cats {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'test@gmail.com',
    description: 'email',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  @Column({ unique: true, length: 20 })
  email: string;

  @ApiProperty({
    example: '안녕봇',
    description: 'nickname',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column({ length: 12 })
  name: string;

  @ApiProperty({
    example: '123123',
    description: 'password',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  password: string;

  @Column({ default: '' })
  imgUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
