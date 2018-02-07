import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('affiliations')
export default class Affiliation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    type: string

    @Column('text')
    name: string

    @Column('text', {name: 'address_street'})
    addressStreet: string

    @Column('text', {name: 'address_street2', nullable: true})
    addressStreet2: string

    @Column('text', {name: 'address_city'})
    addressCity: string

    @Column('text', {name: 'address_state'})
    addressState: string

    @Column('text', {name: 'address_zip', nullable: true})
    addressZip: string

    @Column('text', {nullable: true} )
    phone: string
}