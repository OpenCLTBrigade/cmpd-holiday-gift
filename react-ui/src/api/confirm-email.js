// @flow
import { post } from 'lib/apiService';

export function emailConfirmation(
  id: number,
  confirmation_code: string
): Promise<void> {
  return post('auth', 'confirm_email', { id, confirmation_code });
}
