import config from '../../config';
import { ExtendedColumnOptions } from 'typeorm-encrypted';

const options: ExtendedColumnOptions = {
  encrypt: {
    key: config.databaseEncryptionKey,
    algorithm: 'aes-256-cbc',
    ivLength: 16
  }
};

export default options;
