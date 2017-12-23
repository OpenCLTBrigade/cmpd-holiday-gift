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
    @Column('text', {name: 'dob'}) 
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

    @Column('boolean', {nullable: true}) 
    draft: boolean = true

    @Column('boolean') 
    reviewed: boolean = false

    @Column('boolean') 
    approved: boolean = false

    @Column('text', {nullable: true}) 
    reason: string

    @Column('boolean') 
    deleted: boolean = false

    @Column('date', {name: 'deleted_at', nullable: true}) 
    deletedAt

    @OneToOne(() => Address)
    address: Address;

    @OneToMany(() => Child, child => child.household) 
    children: Child[]

    @OneToMany(() => Attachment, attachment => attachment.household) 
    attachments: Attachment[]

    @OneToMany(() => PhoneNumber, phone => phone.household) 
    phones: PhoneNumber[]

    @ManyToOne(() => User, user => user.households) 
    @JoinColumn({ name: "nominator_id" })
    nominator: User

    get fullName() {
        return `${this.firstName} ${this.lastName}`
    }
}