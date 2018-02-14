import { get } from '../lib/apiService';

export function getPackingSlipData(household_id = null) {
  const queryParams = {};

  if (household_id !== null) {
    queryParams['household_id'] = household_id;
  }

  return get('nominations', 'slips/packing', queryParams);
}
