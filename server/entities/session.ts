import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BaseEntity } from 'typeorm';
import User from './user';

@Entity('sessions')
export default class Session {
    @PrimaryGeneratedColumn()
    id: number

    @Column('date', { name: 'created_at' })
    createdAt

    @Column('date', { name: 'updated_at' })
    updatedAt

    @OneToOne(() => User)
    @JoinColumn({name: 'user_id'})
    user: User
}