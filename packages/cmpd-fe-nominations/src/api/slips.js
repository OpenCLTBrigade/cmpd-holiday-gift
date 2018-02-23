import { get } from '../lib/apiService';

export function getPackingSlipData(householdId = null) {
  const queryParams = {};

  if (householdId !== null) {
    queryParams['householdId'] = householdId;
  }

  return get('nominations', 'tracking/packing-slips', queryParams);
}
