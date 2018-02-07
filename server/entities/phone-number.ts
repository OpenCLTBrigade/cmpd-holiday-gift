import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import Household from './household';

import encOptions from '../common/util/encryption-options';

import { ExtendedColumnOptions } from "typeorm-encrypted";

@Entity('household_phones')
export default class PhoneNumber extends BaseEntity {
    private constructor(props) {
        super();

        Object.assign(this, props);
    }

    @PrimaryGeneratedColumn() 
    id: number

    @Column('int', {name: 'household_id'})
    householdId: number

    @Column('text') 
    type: string

    @Column('varchar',  <ExtendedColumnOptions> encOptions)
    number: string
    
    @ManyToOne(() => Household)
    @JoinColumn({ name: "household_id" })
    household: Household

    @Column('boolean') 
    deleted: boolean = false

    static fromJSON(props) {
      const entity = new PhoneNumber(props);
  
      return entity;
    }
}