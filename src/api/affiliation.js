import { get } from 'lib/apiService';
import type { DataTableResponse } from 'lib/apiService';

export type AffiliationType = {
  type: string,
  name: string,
  address_street: string,
  address_street2: string,
  address_city: string,
  address_state: string,
  address_zip: string,
  phone: string,
  createdAt: string,
  updatedAt: string
};

export function getAffiliation(affiliationId: number): Promise<{affiliation: AffiliationType}> {
  return get('nominations', `/affiliations/${affiliationId}`);
}

export function getAffiliationList(pageNumber: number = 0, search: ?string): Promise<{response: DataTableResponse}> {
  return get('nominations', 'affiliations', { page: pageNumber, search: search });
}
