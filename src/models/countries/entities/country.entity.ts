import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { State } from '../../states/entities/state.entity';

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  phone: string;

  @Column('varchar')
  continent: string;

  @Column('varchar')
  capital: string;

  @Column('varchar')
  currency: string;

  @Column('varchar', { array: true })
  languages: string[];

  @Column('varchar')
  emoji: string;

  @Column('varchar')
  emojiU: string;

  @Column('varchar')
  slug: string;

  @Column('varchar')
  alphaTwo: string;

  @Column('varchar')
  alphaThree: string;

  @Column('text')
  resourceUri: string;

  @OneToMany(() => State, (state) => state.country)
  states: State[];

  @Column('int2')
  active: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
