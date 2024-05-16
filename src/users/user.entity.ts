import { Entity, Unique, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 20 })
  coins: number;

  @Column('text', { nullable: true })
  favoriteGames: string;

}
