// @flow
import { get, post, put } from 'lib/apiService';


export function getAddressInfo(lat, long): Promise<void> {
  return get('nominations', `/cmpd/address_info/?lat=${lat}&long=${long}`);
}