import { BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export default abstract class extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column('text', { name: 'name_first' })
  firstName: string;

  @Column('text', { name: 'name_last' })
  lastName: string;

  @Column('text') email: string;

  @Column() active: boolean;

  @Column({ default: false })
  approved: boolean;

  @Column('text', { nullable: true })
  role: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt;
}
