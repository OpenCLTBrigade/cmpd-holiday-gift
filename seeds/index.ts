import seedAffiliations from './01_affiliations';
import seedUsers from './02_users';
import seedHouseholdAddresses from './03_household_addresses';
import seedHouseholdPhones from './04_household_phone';
import seedHouseholdChildren from './05_children';

async function createSeedData() {
  await seedAffiliations();
  await seedUsers();
  await seedHouseholdAddresses();
  await seedHouseholdPhones();
  await seedHouseholdChildren();

  console.log('Seeded data');
  process.exit();
}

createSeedData();
