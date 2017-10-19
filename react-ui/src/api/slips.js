// @flow

import { get } from 'lib/apiService';

export function getPackingSlipData(): Promise<$TODO> {
  return get('nominations', 'slips/packing');
}
