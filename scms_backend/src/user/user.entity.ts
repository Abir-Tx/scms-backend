import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('user')
@Unique(['username', 'email', 'phone'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'name', type: 'character varying' })
  name: string;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  phone: string;
  @Column()
  address: string;
  @Column()
  avater: string;
  @Column()
  role: string;
}
