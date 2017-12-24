import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BaseEntity, BeforeInsert, BeforeUpdate } from 'typeorm';
import User from './user';

@Entity('sessions')
export default class Session extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column('date', { name: 'created_at' })
    createdAt

    @Column('date', { name: 'updated_at' })
    updatedAt

    @Column('int', { name: 'user_id' })
    userId: number

    @OneToOne(() => User, {eager: true})
    @JoinColumn({name: 'user_id'})
    user: User

    @BeforeInsert()
    updateCreated() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @BeforeUpdate()
    updateUpdatedDate() {
        this.updatedAt = new Date();
    }
}