// @flow

import { get } from 'lib/apiService';
import { post } from 'lib/apiService';
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

// TODO add missing fields
export type AffiliationType = {
  id: number,
  name: string
};

export function getUser(id: number): Promise<{ user: UserType & {affiliation: AffiliationType} }> {
  return get('nominations', `/users/${id}`);
}

export function getMe(): Promise<{user: userType}> {
  return get('nominations', 'me');
}

export function getUserList(
  pageNumber: number = 1,
  search: ?string,
  affiliation_id: ?number
): Promise<{ response: DataTableResponse<UserType> }> {
  pageNumber = pageNumber < 1 ? 1 : pageNumber;
  return get('nominations', 'users', { page: pageNumber, search, affiliation_id });
}

export function getPendingUserList(
  pageNumber: number = 1, search: ?string
): Promise<{ response: DataTableResponse<UserType> }> {
  return get('nominations', 'users/pending', { page: pageNumber, search: search });
}

export function createUser(user: UserType): Promise<{user: UserType}> {
  return post('nominations', 'users', { user: user });
}


