// @flow
import { get } from 'lib/apiService';
import type { DataTableResponse } from 'lib/apiService';

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
  createdAt: string,
  updatedAt: string,
  affiliation_id: number
};

export function getUser(id: number): Promise<{ user: UserType }> {
  return get('nominations', `/users/${id}`);
}

export function getUserList(
<<<<<<< HEAD
  pageNumber: number = 0,
  search: ?string
): Promise<{ response: DataTableResponse<UserType> }> {
  return get('nominations', 'users', { page: pageNumber, search: search });
}

export function getPendingUserList(
  pageNumber: number = 0,
  search: ?string
): Promise<DataTableResponse<UserType>> {
=======
  pageNumber: number = 1,
  search: ?string,
  affiliation_id: ?number
): Promise<{ response: DataTableResponse }> {
  pageNumber = pageNumber < 1 ? 1 : pageNumber;
  return get('nominations', 'users', { page: pageNumber, search, affiliation_id });
}

export function getPendingUserList(pageNumber: number = 1, search: ?string): Promise<{ response: DataTableResponse }> {
>>>>>>> c13bfbda3a58756f060509df39b08049ae4e7eef
  return get('nominations', 'users/pending', { page: pageNumber, search: search });
}
