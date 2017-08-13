// @flow
import { get } from 'lib/apiService';
import type { DataTableResponse } from 'lib/apiService';

// TODO: the types of some of these fields is wrong. We use proper booleans and dates instead of strings
/*
"id": 1,
"name_first": "Karelle",
"name_last": "Mante",
"role": "nominator",
"rank": null,
"phone": null,
"email": "Duane_Senger@yahoo.com",
"active": "N",
"nomination_limit": 5,
"confirmation_email": false,
"confirmation_code": null,
"email_verified": false,
"approved": "Y",
"createdAt": "2017-08-13T14:24:43.488Z",
"updatedAt": "2017-08-13T14:24:43.488Z",
"affiliation_id": 46,
 */

export type UserType = {
  id: number,
  name_first: string,
  name_last: string,
  role: string,
  rank: string,
  phone: string,
  email: string,
  active: string,
  nomination_limit: number,
  confirmation_email: boolean,
  confirmation_code?: string,
  email_verified: boolean,
  approved: string,
  createdAt: Date,
  updatedAt: Date,
  affiliation_id: number
};

export function getUser(id: number): Promise<{ user: UserType }> {
  return get('nominations', `/users/${id}`);
}

export function getUserList(pageNumber: number = 0, search: ?string): Promise<{ response: DataTableResponse }> {
  return get('nominations', 'users', { page: pageNumber, search: search });
}

export function getPendingUserList(pageNumber: number = 0, search: ?string): Promise<{ response: DataTableResponse }> {
  return get('nominations', 'users/pending', { page: pageNumber, search: search });
}
