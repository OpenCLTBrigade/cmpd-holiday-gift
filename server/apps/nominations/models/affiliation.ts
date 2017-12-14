import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('affiliations')
export default class {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    type: string

    @Column('text')
    name: string

    @Column('text', {name: 'address_street'})
    addressStreet: string

    @Column('text', {name: 'address_street2'})
    addressStreet2: string

    @Column('text', {name: 'address_city'})
    addressCity: string

    @Column('text', {name: 'address_state'})
    addressState: string

    @Column('text', {name: 'address_zip'})
    addressZip: string

    @Column('text')
    phone: string
}