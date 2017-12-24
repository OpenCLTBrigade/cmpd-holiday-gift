import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BaseEntity } from 'typeorm';
import { ExtendedColumnOptions } from "typeorm-encrypted";

import Household from './household';
import encOptions from '../common/util/encryption-options';

@Entity('household_addresses')
export default class HouseholdAddress extends BaseEntity {
    private constructor(props) {
      super();
  
      Object.assign(this, props);
    }
    
    @PrimaryGeneratedColumn()
    id: number

    @Column('text') 
    type: string

    @Column('varchar',  <ExtendedColumnOptions> encOptions) 
    street: string

    @Column('varchar',  <ExtendedColumnOptions> encOptions) 
    street2: string

    @Column('varchar',  <ExtendedColumnOptions> encOptions) 
    city: string

    @Column('varchar',  <ExtendedColumnOptions> encOptions) 
    state: string

    @Column('varchar',  <ExtendedColumnOptions> encOptions) 
    zip: string

    @Column('int', {name: 'household_id'})
    householdId: number

    @Column('text', {nullable: true})
    cmpdDivision: string

    @Column('text', {nullable: true})
    cmpdResponseArea: string

    @OneToOne(() => Household)
    @JoinColumn({name: 'household_id'})
    household: Household

    static fromJSON(props) {
      const entity = new HouseholdAddress(props);
  
      return entity;
    }
}