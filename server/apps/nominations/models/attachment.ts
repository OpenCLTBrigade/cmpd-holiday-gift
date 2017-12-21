import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Household from './household';
import User from './user';

@Entity('household_attachments')
export default class Attachment {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    path: string

    @ManyToOne(() => Household)
    household: Household

    @ManyToOne(() => User)
    user: User
}