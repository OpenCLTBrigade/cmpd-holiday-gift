import bool from '../util/converters/boolean';
import {
  Entity,
  BeforeInsert,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import Affiliation from './affiliation';
import Household from './household';
import AbstractUser from './abstract/user';

@Entity('users')
export default class User extends AbstractUser {
  private constructor(props) {
    super();

    Object.assign(this, props);
  }

  @Column('text', { nullable: true })
  rank: string;

  @Column('text', { nullable: true })
  phone: string;

  @Column('text') password: string;

  @Column('int', { name: 'nomination_limit', default: 5 })
  nominationLimit: number;

  @Column('boolean', { name: 'email_verified', default: false })
  emailVerified: boolean;

  @Column('boolean', { name: 'confirmation_email', default: false })
  confirmationEmail: boolean;

  @Column('text', { name: 'confirmation_code', nullable: true })
  confirmationCode: string;

  @Column('int', { name: 'affiliation_id' })
  affiliationId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt;

  @OneToOne(() => Affiliation)
  @JoinColumn({ name: 'affiliation_id' })
  affiliation: Affiliation;

  static fromJSON({ active, emailVerified, affiliationId, nominationLimit, ...props }) {
    const entity = new User(props);

    entity.active = bool(active);
    entity.emailVerified = bool(emailVerified);
    entity.approved = true;

    entity.affiliationId = Number(affiliationId);
    entity.nominationLimit = Number(nominationLimit);

    return entity;
  }
}
