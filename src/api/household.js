// @flow
import { get } from 'lib/apiService';
import type { DataTableResponse } from 'lib/apiService';

export type HouseholdType = {
  id: number,
  children: Object[],
  name_first: string,
  nominator: Object,
  surname: string
};

export function getHousehold(householdId: number): Promise<{household: HouseholdType}> {
  return get('nominations', `/households/${householdId}`);
}

export function getHouseholdList(pageNumber: number = 0, search: ?string): Promise<{response: DataTableResponse}> {
  return get('nominations', 'households', { page: pageNumber, search: search });
}
