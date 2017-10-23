// @flow
import { post } from 'lib/apiService';

export function sendRecoverEmail(email: string): Promise<{success: true} | {error: string}> {
  return post('auth', 'recover/send_email', { email });
}

export function resetPassword(id: number, confirmation_code: string, password: string): Promise<{success: true} | {error: string}> {
  return post('auth', 'recover/reset_password', { id, confirmation_code, password });
}
