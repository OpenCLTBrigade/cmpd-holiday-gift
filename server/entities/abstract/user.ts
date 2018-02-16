import { BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export default abstract class extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column('text', { name: 'name_first' })
  firstName: string;

  @Column('text', { name: 'name_last' })
  lastName: string;

  @Column('text') email: string;

  @Column('text') active: boolean;

  @Column('text', { default: false })
  approved: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt;
}
