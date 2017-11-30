// @flow
import { get, post, put, delete_ } from 'lib/apiService';
import type { DataTableResponse } from 'lib/apiService';

export type HouseholdType = {
  id: number,
  children: Object[],
  name_first: string,
  nominator: Object,
  surname: string,
  phoneNumbers: Object[],
  address: Object,
  attachments: Object[]
};

export function getHousehold(
  householdId: number
): Promise<{ household: HouseholdType }> {
  return get('nominations', `/households/${householdId}`);
}

export function getHouseholdList({
  page = 1,
  search,
  active = true
}): Promise<{ response: DataTableResponse<HouseholdType> }> {
  return get('nominations', 'households', { page, search: search, active });
}

export function createHousehold(json) {
  return post('nominations', 'households', json);
}

export function updateHousehold(id, json) {
  return put('nominations', `households/${id}`, json);
}

export function submitNomination({ id }) {
  return post('nominations', 'households/submit', { id });
}

export function uploadAttachment({ id, file }) {
  const formData = new FormData();
  formData.append('file', file[0]);
  return post('nominations', `households/${id}/upload`, formData);
}

export function reviewHousehold(
  id,
  payload: Object<{ approved: boolean, reason: string, message: string }>
) {
  const { approved, reason, message } = payload;
  return post('nominations', `households/${id}/feedback`, {
    approved,
    reason,
    message
  });
}

export function getNominationStatus() {
  return get('nominations', 'me/limit/status');
}

export function deleteNomination(id) {
  return delete_('nominations', `households/${id}`);
}
