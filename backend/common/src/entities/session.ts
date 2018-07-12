import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Nominator } from '.';

@Entity('sessions')
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt;

  @Column('int', { name: 'user_id' })
  userId: number;

  @OneToOne(() => Nominator, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: Nominator;
}
