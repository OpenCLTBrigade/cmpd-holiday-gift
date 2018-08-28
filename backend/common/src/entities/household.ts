import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
  } from 'typeorm';
import { ExtendedColumnOptions } from 'typeorm-encrypted';
import encOptions from '../util/encryption-options';
import { Address } from './address';
import { Attachment } from './attachment';
import { Child } from './child';
import { PhoneNumber } from './phone-number';
import { User } from './user';




@Entity('households')
export class Household extends BaseEntity {
  private constructor(props) {
    super();

    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn() id: number;

  @Column('text', { name: 'nominator_id' })
  nominatorId: string;

  @Column('varchar', <ExtendedColumnOptions>{
    name: 'name_first',
    ...encOptions
  })
  firstName: string;

  @Column('varchar', <ExtendedColumnOptions>{
    name: 'name_middle',
    nullable: true,
    ...encOptions
  })
  middleName: string = '';

  @Column('text', { name: 'name_last' })
  lastName: string;

  @Column('varchar', <ExtendedColumnOptions>{ name: 'dob', ...encOptions })
  dob: string;

  @Column('text') race: string;

  @Column('text') gender: string;

  @Column('varchar', <ExtendedColumnOptions>encOptions)
  last4ssn: string;

  @Column('varchar', <ExtendedColumnOptions>encOptions)
  email: string;

  @Column('text', { name: 'preferred_contact_method', nullable: true })
  preferredContactMethod: string;

  @Column('boolean', { name: 'nomination_email_sent' })
  nominationEmailSent: boolean = false;

  @Column('boolean', { nullable: true })
  draft: boolean = true;

  @Column('boolean') reviewed: boolean = false;

  @Column('boolean') approved: boolean = false;

  @Column('text', { nullable: true })
  reason: string;

  @Column('boolean') deleted: boolean = false;

  @Column('date', { name: 'deleted_at', nullable: true })
  deletedAt;

  @OneToOne(() => Address, address => address.household)
  address: Address;

  @OneToMany(() => Child, child => child.household)
  children: Child[];

  @OneToMany(() => Attachment, attachment => attachment.household)
  attachments: Attachment[];

  @OneToMany(() => PhoneNumber, phone => phone.household)
  phoneNumbers: PhoneNumber[];

  @ManyToOne(() => User, user => user.households)
  @JoinColumn({ name: 'nominator_id' })
  nominator: User;

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  static fromJSON(props) {
    const entity = new Household(props);

    entity.address = null;

    return entity;
  }
}
