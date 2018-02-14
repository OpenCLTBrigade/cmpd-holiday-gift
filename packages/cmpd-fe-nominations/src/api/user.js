import { get, post, put } from '../lib/apiService';
// import type { DataTableResponse } from 'lib/apiService';

// export type UserType = {
//   id: number,
//   name_first: string,
//   name_last: string,
//   role: string,
//   rank: string,
//   phone: string,
//   email: string,
//   active: string,
//   nomination_limit: number,
//   confirmation_email: boolean,
//   confirmation_code?: string,
//   email_verified: boolean,
//   approved: string,
//   createdAt: string,
//   updatedAt: string,
//   affiliation_id: number
// };

// TODO add missing fields
// export type AffiliationType = {
//   id: number,
//   name: string
// };

export function getUser(id) {
  return get('nominations', `/users/${id}`);
}

export function getMe() {
  return get('nominations', 'me');
}

export function getUserList(pageNumber = 1, search, affiliation_id) {
  pageNumber = pageNumber < 1 ? 1 : pageNumber;
  return get('nominations', 'users', {
    page: pageNumber,
    search,
    affiliation_id
  });
}

export function getPendingUserList(pageNumber = 1, search) {
  return get('nominations', 'users/pending', {
    page: pageNumber,
    search: search
  });
}

export function createUser(user) {
  return post('nominations', 'users', { user: user });
}

export function updateUser(user) {
  return put('nominations', `users/${user.id}`, { user: user });
}

export function approveUser(id) {
  return post('nominations', `users/${id}/approve`);
}

export function declineUser(id) {
  return post('nominations', `users/${id}/decline`);
}
