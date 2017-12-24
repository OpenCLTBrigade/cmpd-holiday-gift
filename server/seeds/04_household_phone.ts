import { Connection } from 'typeorm';
import { PhoneNumber } from '../entities';

const faker = require('faker');

export default async (connection: Connection) => {
    for (let i = 0; i < 25; i++) {
        const number = new PhoneNumber();
        number.householdId = faker.random.number(25) + 1;
        number.type = 'home';
        number.number = '' + faker.phone.phoneNumberFormat();

        await number.save();
    }
};
