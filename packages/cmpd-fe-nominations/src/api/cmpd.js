import { get, post, put } from '../lib/apiService';

export function getAddressInfo(lat, long) {
  return get('nominations', `cmpd/address-info?lat=${lat}&long=${long}`);
}
