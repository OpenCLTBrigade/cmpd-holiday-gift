import { Affiliation, Household } from 'cmpd-common-api';
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('nominators')
export class Nominator extends BaseEntity {
  private constructor(props) {
    super();
    Object.assign(this, props);
  }

  @PrimaryColumn('text') id: string;

  @Column('text') name: string;

  @Column('text') email: string;

  @Column('text', { nullable: true })
  rank: string;

  // @Column('text', { nullable: true })
  // role: string;

  @Column('text', { nullable: true })
  phone: string;

  @Column('boolean', { default: true })
  disabled: boolean;

  @Column('boolean', { name: 'email_verified', default: false })
  emailVerified: boolean;

  @Column('text') phoneNumber: string;

  @Column('int', { name: 'nomination_limit', default: 5 })
  nominationLimit: number;

  @Column('int', { name: 'affiliation_id', nullable: true })
  affiliationId: number;

  @OneToOne(() => Affiliation)
  @JoinColumn({ name: 'affiliation_id' })
  affiliation: Affiliation;

  @OneToMany(() => Household, household => household.nominator)
  households: Household[];

  static fromJSON(props) {
    const entity = new Nominator(props);

    return entity;
  }
}
