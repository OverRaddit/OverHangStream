import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  kakaoId: string;

  // @Column()
  // email: string;

  @Column()
  nickname: string;

  @Column()
  profileImage: string;
}
