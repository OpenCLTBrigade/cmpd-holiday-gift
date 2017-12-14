import { Entity, BeforeInsert, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    type: string

    @Column()
    name: string

    @Column({name: 'address_street'})
    addressStreet: string

    @Column({name: 'address_street2'})
    addressStreet2: string

    @Column({name: 'address_city'})
    addressCity: string

    @Column({name: 'address_state'})
    addressState: string

    @Column({name: 'address_zip'})
    addressZip: string

    @Column()
    phone: string
}