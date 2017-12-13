import { Entity, BeforeInsert, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'name_first'})
  firstName: string

  @Column({name: 'name_last'})
  lastName: string

  @Column({nullable: true})
  role: string

  @Column({nullable: true})
  rank: string

  @Column({nullable: true})
  phone: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  active: boolean

  @Column({name: 'nomination_limit', default: 5})
  nominationLimit: number

  @Column({name: 'confirmation_email', default: false})
  confirmationEmail: boolean

  @Column({name: 'confirmation_code', nullable: true})
  confirmationCode: string

  @Column({name: 'email_verified', default: false})
  emailVerified: boolean

  @Column({default: false})
  approved: boolean


  @BeforeInsert() 
  encrypt() {
    console.warn('Encrypt values', this)
  }
}