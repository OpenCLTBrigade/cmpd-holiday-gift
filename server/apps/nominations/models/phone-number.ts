import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import Household from './household';

@Entity('household_phones')
export default class PhoneNumber {
    @PrimaryGeneratedColumn() 
    id: number

    //TODO: Encrypt field
    @Column('text')
    type: string

    @Column('text')
    number: string
    
    @ManyToOne(() => Household)
    @JoinColumn({ name: "household_id" })
    household: Household
}