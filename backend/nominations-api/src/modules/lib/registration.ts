import * as path from 'path';
import { isInvalidPassword, hashPassword, generateConfirmationCode } from './auth';

import config from '../../config';
const sendMail = require('./mail')(path.join(__dirname, '../auth/templates'));
const asyncDo = require('./asyncDo');
import { User } from 'cmpd-common-api';

// Step 1
export async function register(rootUrl: string, userInfo) {
  const user = await User.findOne({ where: { email: userInfo.email } });
  if (user) {
    return {
      field: 'email',
      error: 'An account with that email already exists'
    };
  }
  const reason = isInvalidPassword(userInfo.raw_password);
  if (reason != null) {
    return { field: 'password', error: `Invalid password: ${reason}` };
  }
  const hashedPassword = hashPassword(userInfo.raw_password);
  let newUser;
  try {
    newUser = await User.fromJSON({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      rank: userInfo.rank,
      phone: userInfo.phone,
      affiliationId: userInfo.affiliationId,
      email: userInfo.email,
      password: hashedPassword,
      role: 'nominator'
    });
  } catch (error) {
    // TODO: generate better error message or log error
    return { error: 'unknown error' };
  }
  asyncDo(() => sendVerification(rootUrl, newUser));
  return null;
}

// Step 2
export async function sendVerification(rootUrl: string, user) {
  const confirmation_code = generateConfirmationCode();
  user.set('confirmation_code', confirmation_code);
  await user.save();
  await sendMail('verify-email', {
    to: user.dataValues.email,
    user,
    confirmation_code,
    // TODO: proper front-end path for confirmation
    confirm_email_url: `${rootUrl}/auth/confirm_email`
  });
  user.set('confirmation_email', true);
  await user.save();
}

// Step 3
export async function confirmEmail(rootUrl, { user_id, confirmation_code }) {
  const user = await User.findOneById(user_id);
  if (!user) {
    return { error: 'confirmation code does not match' };
  }
  if (user.confirmationEmail && user.confirmationCode !== confirmation_code && !user.emailVerified) {
    return { error: 'confirmation code does not match' };
  } else {
    user.emailVerified = true;
    user.confirmationCode = null;
    await user.save();
  }
  asyncDo(() => sendApproval(rootUrl, user));
  return null;
}

// Step 4
export async function sendApproval(rootUrl: string, user) {
  const url = `${rootUrl}/dashboard/user/pending`;
  await sendMail('admin-approval', {
    to: config.email.adminAddress,
    url,
    user
  });
}

// Step 5
export async function approve(user_id: number) {
  const user = await User.findOneById(user_id);
  if (!user) {
    return { error: 'unknown user' };
  }
  user.approved = true;
  user.active = true;

  await user.save();
  return null;
}
