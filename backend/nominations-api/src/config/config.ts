import * as envalid from 'envalid';
import * as path from 'path';

const { str, email, json, bool } = envalid;

const env = envalid.cleanEnv(process.env, {
  SEED_FIREBASE: bool({ default: false })
});

export default {
  mode: env.NODE_ENV,
  isProduction: env.isProduction,
  port: 3002,
  useCompression: env.isProduction,
  enableAccessLog: true,
  verboseAccessLog: true,
  verboseSeed: false,
  verbose: true,
  seedFirebase: env.SEED_FIREBASE,
  email: {
    fromAddress: 'noreply@codeforcharlotte.org',
    fromName: 'noreply', // TODO: nicer from_name?
    adminAddress: 'info@codeforcharlotte.org'
  },
  db: {
    dialect: 'sqlite',
    storage: `${path.join(process.cwd(), '../../run')}/db.development.sqlite`,
    logging: false
  },
  databaseEncryptionKey: '53E19CAB12F077ECDCC03C01BC621C8E950F9198C568A41A6DFDCE2E2D155469',
  raceOptions: [
    'American Indian',
    'Alaskan Native',
    'Asian',
    'African American',
    'Hispanic',
    'Pacific Islander',
    'White',
    'Other'
  ],
  bikeSizes: [
    'Tricycle',
    '12” Bicycle',
    '16” Bicycle',
    '20” Coaster Brake Bicycle',
    '20” Geared Bicycle',
    '24” Geared Bicycle'
  ],
  clothesSizes: ['S', 'M', 'L'],
  bikeStyles: ['Mountain', 'BMX', 'Tricycle'],
  genders: ['F', 'M']
};
