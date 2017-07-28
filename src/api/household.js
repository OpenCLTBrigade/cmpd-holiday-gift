// @flow
import { get } from 'lib/apiService';

export type Household = {
  id: number,
  children: Object[],
  name_first: string,
  nominator: Object,
  surname: string
};

export function getHousehold(householdId: number): Promise<{household: Household}> {
  return get('nominations', `/household/${householdId}`);
}

export function getHouseholdList(pageNumber: number = 0, search: ?string): Promise<{households: Household[]}> {
  return get('nominations', 'households', { page: pageNumber, search: search });
}

