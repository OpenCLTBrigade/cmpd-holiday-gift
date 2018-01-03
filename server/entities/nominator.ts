import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import Household from './household';

@Entity('users')
export default class Nominator extends BaseEntity {
  private constructor(props) {
    super();

    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', {name: 'name_first'})
  firstName: string

  @Column('text', {name: 'name_last'})
  lastName: string

  @Column('text')
  email: string

  @OneToMany(() => Household, household => household.nominator)
  households: Household[]
}