import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import Household from './household';

//TODO: Encrypt all fields
@Entity('household_addresses')
export default class {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    type: string

    @Column('text')
    street: string

    @Column('text', {nullable: true})
    street2: string

    @Column('text')
    city: string

    @Column('text')
    state: string

    @Column('text')
    zip: string

    @Column('text', {nullable: true})
    cmpdDivision: string

    @Column('text', {nullable: true})
    cmpdResponseArea: string

    @OneToOne(() => Household)
    @JoinColumn({name: 'household_id'})
    household: Household
}