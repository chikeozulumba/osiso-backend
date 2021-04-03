import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserType } from '../../user-type/entities/user-type.entity';
import { Country } from '../../countries/entities/country.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserType, (type) => type.users)
  userType: UserType;

  @JoinColumn({ name: 'countryId' })
  @ManyToOne(() => Country, (country) => country.users)
  country: Country;

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
