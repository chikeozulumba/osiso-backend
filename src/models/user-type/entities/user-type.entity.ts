import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('user-types')
export class UserType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => User, (user) => user.userType)
  users: User[];

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  slug: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
