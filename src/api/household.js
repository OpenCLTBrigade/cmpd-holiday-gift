// @flow
import {get} from 'lib/apiService';

export function getHousehold(householdId: number): Promise<any> {
  return get('nominations', `/household/${householdId}`);
}

export function getHouseholdList(pageNumber: number = 0, search: ?string): Promise<any> {
  return get('nominations', 'households', { page: pageNumber, search: search });
}

// TODO ATN
window.getHouseholdList = getHouseholdList;
