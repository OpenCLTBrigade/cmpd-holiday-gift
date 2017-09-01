// @flow
import { get } from '../lib/apiService';
import type { DataTableResponse } from '../lib/apiService';

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
// TODO: make sure this works and doesn't give the error below on the server.
// Unhandled rejection SequelizeDatabaseError: SQLITE_ERROR: no such column: created_at
//  at Query.formatError
//    (/home/user/codeForCharlotte/cmpd-holiday-gift/node_modules/sequelize/lib/dialects/sqlite/query.js:418:16)
//  at afterExecute
//    (/home/user/codeForCharlotte/cmpd-holiday-gift/node_modules/sequelize/lib/dialects/sqlite/query.js:119:32)
//  at replacement (/home/user/codeForCharlotte/cmpd-holiday-gift/node_modules/sqlite3/lib/trace.js:19:31)
//  at Statement.errBack (/home/user/codeForCharlotte/cmpd-holiday-gift/node_modules/sqlite3/lib/sqlite3.js:16:21)
  return get('nominations', 'affiliations', { page: pageNumber, search: search });
}
