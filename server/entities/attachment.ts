import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import Household from './household';
import User from './user';

@Entity('household_attachments')
export default class Attachment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    path: string

    @ManyToOne(() => Household)
    @JoinColumn({ name: "household_id" })
    household: Household

    @ManyToOne(() => User)
    @JoinColumn({ name: "owner_id" })
    user: User
}