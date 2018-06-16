import { get } from '../lib/apiService';

export function getAffiliation(affiliationId) {
  return get('nominations', `affiliations/${affiliationId}`);
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

export function getAllAffiliations() {
  return get('nominations', 'affiliations');
}

export function getSchools() {
  return get('nominations', 'affiliations', { type: 'cms' });
}
