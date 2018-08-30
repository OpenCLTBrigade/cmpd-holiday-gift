import { encOptions } from 'cmpd-common-api';
import * as moment from 'moment';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
  } from 'typeorm';
import { ExtendedColumnOptions } from 'typeorm-encrypted';

@Entity('children')
export class Child extends BaseEntity {
  private constructor(props) {
    super();
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn() id: number;

  @Column('int', { name: 'household_id' })
  householdId: number;

  @Column('varchar', <ExtendedColumnOptions>{
    name: 'name_first',
    ...encOptions
  })
  firstName: string;

  @Column('varchar', <ExtendedColumnOptions>{ name: 'dob', ...encOptions })
  dob: string;

  @Column('text') gender: string;

  @Column('boolean', { name: 'bike_want' })
  wantsBike: boolean = false;

  @Column('text', { name: 'bike_size', nullable: true })
  bikeSize: string;

  @Column('text', { name: 'bike_style', nullable: true })
  bikeStyle: string;

  @Column('boolean', { name: 'clothes_want' })
  wantsClothes: boolean = false;

  @Column('text', { name: 'clothes_size_shirt', nullable: true })
  clothesShirtSize: string;

  @Column('text', { name: 'clothes_size_pants', nullable: true })
  clothesPantsSize: string;

  @Column('text', { name: 'clothes_size_coat', nullable: true })
  clothesCoatSize: string;

  @Column('text', { name: 'shoe_size', nullable: true })
  shoeSize: string;

  @Column('text', { name: 'favourite_colour', nullable: true })
  favouriteColor: string;

  @Column('text', { nullable: true })
  interests: string;

  @Column('text', { name: 'additional_ideas', nullable: true })
  additionalIdeas: string;

  @Column('boolean') deleted: boolean = false;

  get age() {
    return moment().diff(this.dob, 'years');
  }

  static fromJSON(props) {
    const entity = new Child(props);

    return entity;
  }
}
