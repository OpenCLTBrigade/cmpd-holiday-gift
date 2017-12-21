import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import * as moment from 'moment';
import Household from './household';

@Entity('children')
export default class Child {
    @PrimaryGeneratedColumn()
    id: number


    //TODO: encrypt this field
    @Column('text', {name: 'name_first'})
    firstName: string

    //TODO: encrypt this field
    @Column('text', {name: 'name_middle', nullable: true}) 
    middleName: string

    //TODO: encrypt this field
    @Column('text', {name: 'name_last'})
    lastName: string

    //TODO: encrypt this field
    @Column('text', {name: 'name_last'}) 
    dob: string

    @Column('text') 
    race: string

    @Column('text') 
    gender: string

    //TODO: encrypt this field
    @Column('text') 
    last4ssn: string

    @Column({name: 'free_or_reduced_lunch'})
    freeOrReducedLunch: boolean

    @Column('text', {name: 'reason_for_nomination'})
    reasonForNomination: string

    @Column({name: 'school_id', nullable: true})
    schoolId: number

    @Column({name: 'bike_want'})
    wantsBike: boolean = false

    @Column({name: 'bike_size', nullable: true})
    bikeSize: string

    @Column({name: 'bike_style', nullable: true})
    bikeStyle: string

    @Column({name: 'clothes_want'})
    wantsClothes: boolean = false

    @Column({name: 'clothes_size_shirt', nullable: true})
    clothesShirtSize: string

    @Column({name: 'clothes_size_pants', nullable: true})
    clothesPantsSize: string

    @Column({name: 'clothes_size_coat', nullable: true})
    clothesCoatSize: string

    @Column({name: 'shoe_size', nullable: true})
    shoeSize: string

    @Column({name: 'favourite_colour', nullable: true})
    favouriteColor: string

    @Column({nullable: true})
    interests: string

    @Column({name: 'additional_ideas', nullable: true})
    additionalIdeas: string

    @ManyToOne(() => Household) 
    household: Household

    get age() {
        return moment().diff(this.dob, 'years');
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}