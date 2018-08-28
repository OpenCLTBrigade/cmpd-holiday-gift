import { get, post, put } from '../lib/apiService';

export function getUser(id) {
  return get('nominations', `users/${id}`);
}

export function getMe() {
  return get('v2', 'auth/account');
}

export function getUserList(pageNumber = 1, search, affiliationId) {
  pageNumber = pageNumber < 1 ? 1 : pageNumber;
  return get('nominations', 'users', {
    page: pageNumber,
    search,
    affiliationId
  });
}

export function getPendingUserList(pageNumber = 1, search) {
  return get('nominations', 'users/pending', {
    page: pageNumber,
    search: search
  });
}

export function createUser(user) {
  return post('nominations', 'users', user);
}

export function updateUser({ households, ...user }) {
  return put('nominations', `users/${user.id}`, user);
}

export function approveUser(id) {
  return post('nominations', `users/${id}/approve`);
}

export function declineUser(id) {
  return post('nominations', `users/${id}/decline`);
}
