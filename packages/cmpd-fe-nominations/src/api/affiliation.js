import { get } from '../lib/apiService';
// import type { DataTableResponse } from 'lib/apiService';

// export type AffiliationType = {
//   id: number,
//   type: string,
//   name: string,
//   address_street: string,
//   address_street2: string,
//   address_city: string,
//   address_state: string,
//   address_zip: string,
//   phone: string,
//   createdAt: string,
//   updatedAt: string
// };

export function getAffiliation(affiliationId) {
  return get('nominations', `/affiliations/${affiliationId}`);
}

export function getAffiliationsByType(type) {
  return get('nominations', 'affiliations', { type });
}

export function getAffiliationList(pageNumber = 1, search) {
  return get('nominations', 'affiliations', {
    page: pageNumber,
    search: search
  });
}

export function getSchools() {
  return get('nominations', 'affiliations', { type: 'cms' });
}
