import { post } from '../lib/apiService';

export function sendRecoverEmail(email) {
  return post('auth', 'recover/send_email', { email });
}

export function resetPassword(id, confirmation_code, password) {
  return post('auth', 'recover/reset_password', {
    id,
    confirmation_code,
    password
  });
}
