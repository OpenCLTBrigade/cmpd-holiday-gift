import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, OneToMany, ManyToOne } from 'typeorm';

import Address from './address';
import User from './user';
import Child from './child';
import PhoneNumber from './phone-number';
import Attachment from './attachment';


@Entity('households')
export default class Household {
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

    //TODO: encrypt this field
    @Column('text') 
    email: string

    @Column('text', {name: 'preferred_contact_method', nullable: true}) 
    preferredContactMethod: string

    @Column('text', {name: 'nomination_email_sent'}) 
    nominationEmailSent = false

    @Column({nullable: true}) 
    draft: boolean = true

    @Column() 
    reviewed: boolean = false

    @Column() 
    approved: boolean = false

    @Column({nullable: true}) 
    reason: string

    @Column() 
    deleted: boolean = false

    @Column('date', {name: 'deleted_at'}) 
    deletedAt: boolean = false

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address;

    @OneToMany(() => Child, child => child.household) 
    children: Child[]

    @OneToMany(() => Attachment, attachment => attachment.household) 
    attachments: Attachment[]

    @OneToMany(() => PhoneNumber, phone => phone.household) 
    phones: PhoneNumber[]

    @ManyToOne(() => User, user => user.households) 
    nominator: User

    get fullName() {
        return `${this.firstName} ${this.lastName}`
    }
}