import { Connection } from "typeorm";
import {PhoneNumber} from "../entities";

const faker = require('faker');

export default async (connection: Connection) => {
  const repo = connection.getRepository(PhoneNumber)

  for (let i = 0; i < 55; i++) {
    await repo.create({
      householdId: faker.random.number(48) + 1,
      type: 'home',
      number: faker.phone.phoneNumberFormat()
    });
  }
};
