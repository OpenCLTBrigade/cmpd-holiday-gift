import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import * as moment from 'moment';
import Household from './household';

import encOptions from '../common/util/encryption-options';

import { ExtendedColumnOptions } from "typeorm-encrypted";

@Entity('children')
export default class Child extends BaseEntity {
    private constructor(props) {
      super();
  
      Object.assign(this, props);
    }
    
    @PrimaryGeneratedColumn()
    id: number

    @Column('int')
    householdId: number

    @Column('varchar', <ExtendedColumnOptions>{name: 'name_first', ...encOptions}) 
    firstName: string

    @Column('varchar', <ExtendedColumnOptions>{name: 'name_middle', nullable: true, ...encOptions}) 
    middleName: string

    @Column('text', {name: 'name_last'}) 
    lastName: string

    @Column('varchar', <ExtendedColumnOptions>{name: 'dob', ...encOptions}) 
    dob: string

    @Column('text') 
    race: string

    @Column('text') 
    gender: string

    @Column('varchar',  <ExtendedColumnOptions> encOptions) 
    last4ssn: string

    @Column('boolean', {name: 'free_or_reduced_lunch'})
    freeOrReducedLunch: boolean

    @Column('text', {name: 'reason_for_nomination'})
    reasonForNomination: string

    @Column('int', {name: 'school_id', nullable: true})
    schoolId: number

    @Column('boolean', {name: 'bike_want'})
    wantsBike: boolean = false

    @Column('text', {name: 'bike_size', nullable: true})
    bikeSize: string

    @Column('text', {name: 'bike_style', nullable: true})
    bikeStyle: string

    @Column('boolean', {name: 'clothes_want'})
    wantsClothes: boolean = false

    @Column('text', {name: 'clothes_size_shirt', nullable: true})
    clothesShirtSize: string

    @Column('text', {name: 'clothes_size_pants', nullable: true})
    clothesPantsSize: string

    @Column('text', {name: 'clothes_size_coat', nullable: true})
    clothesCoatSize: string

    @Column('text', {name: 'shoe_size', nullable: true})
    shoeSize: string

    @Column('text', {name: 'favourite_colour', nullable: true})
    favouriteColor: string

    @Column('text', {nullable: true})
    interests: string

    @Column('text', {name: 'additional_ideas', nullable: true})
    additionalIdeas: string

    @ManyToOne(() => Household) 
    @JoinColumn({ name: "household_id" })
    household: Household

    get age() {
        return moment().diff(this.dob, 'years');
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    static fromJSON(props) {
      const entity = new Child(props);
  
      return entity;
    }
}