import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import Household from './household';
import User from './user';

@Entity('household_attachments')
export default class Attachment extends BaseEntity {
    private constructor(props) {
      super();
  
      Object.assign(this, props);
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    path: string

    @Column({name: 'household_id'})
    householdId: number

    @ManyToOne(() => Household)
    @JoinColumn({ name: "household_id" })
    household: Household

    @ManyToOne(() => User)
    @JoinColumn({ name: "owner_id" })
    user: User

    static fromJSON(props) {
      const entity = new Attachment(props);
  
      return entity;
    }
}