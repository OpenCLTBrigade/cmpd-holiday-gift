import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import Household from './household';
import AbstractUser from './abstract/user'

@Entity('users')
export default class Nominator extends AbstractUser {
  private constructor(props) {
    super();

    Object.assign(this, props);
  }

  @OneToMany(() => Household, household => household.nominator)
  households: Household[]
}