import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { Country } from '../../countries/entities/country.entity';

@Entity('states')
export class State {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  slug: string;

  @Column('varchar')
  code: string;

  @ManyToOne(() => Country, (country) => country.states)
  country: Country;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
