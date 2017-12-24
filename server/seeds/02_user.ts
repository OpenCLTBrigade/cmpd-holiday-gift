import { props, join, compose } from 'ramda';
import { Connection } from 'typeorm';
const faker = require('faker');

import auth from '../apps/lib/auth';

import { User } from '../entities'

const fullName = compose(join(' '), props(['firstName', 'lastName']));

const createUser = (props = {}) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  affilationId: faker.random.number({ min: 1, max: 57 }),
  email: faker.internet.email(),
  password: auth.hashPassword('admin'),
  nominationLimit: 5,
  active: true,
  confirmationEmail: true,
  approved: true,
  role: 'nominator',
  ...props
});

export default async (connection: Connection, verbose = true) => {
    // const repo = connection.getRepository(User)

    for (let i = 0; i < 5; i++) {
        const user = createUser();
    
        const entity = new User();
        entity.firstName = user.firstName;
        entity.lastName = user.lastName;
        entity.email = user.email;
        entity.active = user.active;
        entity.affilationId = user.affilationId;
        entity.approved = user.approved;
        entity.confirmationEmail = user.confirmationEmail;
        entity.password = user.password;
        entity.nominationLimit = user.nominationLimit;
        entity.role = user.role;

        await entity.save();
    
        if (verbose) {
          console.log(`Seeded user ${fullName(entity)}`);
        }
      }

      const developer = new User();
      developer.firstName = 'Developer';
      developer.lastName = 'lastName';
      developer.affilationId = 1;
      developer.email = 'developer@codeforcharlotte.org';
      developer.password = auth.hashPassword('admin');
      developer.nominationLimit = 1000000;
      developer.active = true;
      developer.approved = true;
      developer.role = 'admin';

      await developer.save();

      const nominator = new User();

      nominator.firstName = 'Developer';
      nominator.lastName = 'Account';
      nominator.affilationId = 2;
      nominator.email = 'nominator@codeforcharlotte.org';
      nominator.password = auth.hashPassword('admin');
      nominator.nominationLimit = 5;
      nominator.active = true;
      nominator.approved = true;
      nominator.role = 'nominator';

      await nominator.save();

      const notApproved = new User();

      notApproved.firstName = 'NotYetApproved';
      notApproved.lastName = 'Account';
      notApproved.affilationId = 1;
      notApproved.email = 'notyetapproved@codeforcharlotte.org';
      notApproved.password = auth.hashPassword('admin');
      notApproved.nominationLimit = 5;
      notApproved.active = true;
      notApproved.approved = false;
      notApproved.role = 'nominator';

      await notApproved.save();

      const denied = new User();

      denied.firstName = 'Unapproved';
      denied.lastName = 'Account';
      denied.affilationId = 1;
      denied.email = 'unapproved@codeforcharlotte.org';
      denied.password = auth.hashPassword('admin');
      denied.nominationLimit = 5;
      denied.active = false;
      denied.approved = false;
      denied.role = 'nominator';

      await denied.save();

      const deactivated = new User();

      deactivated.firstName = 'Deactivated';
      deactivated.lastName = 'Account';
      deactivated.affilationId = 1;
      deactivated.email = 'deactivated@codeforcharlotte.org';
      deactivated.password = auth.hashPassword('admin');
      deactivated.nominationLimit = 5;
      deactivated.active = false;
      deactivated.approved = true;
      deactivated.role = 'nominator';

      await deactivated.save();
}