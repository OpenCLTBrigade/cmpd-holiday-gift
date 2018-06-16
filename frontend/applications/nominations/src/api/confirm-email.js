import { post } from '../lib/apiService';

export function emailConfirmation(id, confirmation_code) {
  return post('auth', 'confirm_email', { id, confirmation_code });
}
