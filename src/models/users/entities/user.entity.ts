import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BeforeInsert,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserType } from '../../user-type/entities/user-type.entity';
import { Rider } from '../../riders/entities/rider.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserType, (type) => type.users)
  userType: UserType;

  @OneToOne(() => Rider, (rider) => rider.user, {
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
  })
  rider: Rider;

  @Column('varchar')
  firstName: string;

  @Column('varchar')
  lastName: string;

  @Column('varchar', { nullable: true, unique: true })
  email: string;

  @Column('varchar', { nullable: false, unique: true })
  phoneNumber: string;

  @Column('varchar')
  password: string;

  @Column('enum', {
    enum: ['pending', 'active', 'restricted', 'blacklisted'],
    default: 'pending',
  })
  accountStatus: string;

  @Column({ type: 'timestamp', nullable: true })
  emailVerifiedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  phoneNumberVerifiedAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: true,
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
