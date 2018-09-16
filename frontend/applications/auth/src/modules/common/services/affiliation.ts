import { get } from '../lib/apiService';

export function getAffiliationList(pageNumber = 1, search) {
  return get('nominations', 'affiliations', {
    page: pageNumber,
    search: search
  });
}

export function getAllAffiliations() {
  return get('nominations', 'affiliations');
}
