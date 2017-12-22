import { Entity, BeforeInsert, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', {name: 'name_first'})
  firstName: string

  @Column('text', {name: 'name_last'})
  lastName: string

  @Column('text', {nullable: true})
  role: string

  @Column('text', {nullable: true})
  rank: string

  @Column('text', {nullable: true})
  phone: string

  @Column('text')
  email: string

  @Column('text')
  password: string

  @Column('text')
  active: boolean

  @Column('text', {name: 'nomination_limit', default: 5})
  nominationLimit: number

  @Column('text', {name: 'confirmation_email', default: false})
  confirmationEmail: boolean

  @Column('text', {name: 'confirmation_code', nullable: true})
  confirmationCode: string

  @Column('text', {name: 'email_verified', default: false})
  emailVerified: boolean

  @Column('text', {default: false})
  approved: boolean


  @BeforeInsert() 
  encrypt() {
    console.warn('Encrypt values', this)
  }
}