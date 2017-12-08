import * as path from 'path'

const auth = require('./auth.js');
const db = require('../../models');
import config from '../../config'
const sendMail = require('./mail')(path.join(__dirname, '../auth/templates'));
const asyncDo = require('./asyncDo');

// Step 1
async function register(rootUrl: string, userInfo) {
  const user = await db.user.findOne({ where: { email: userInfo.email } });
  if (user) {
    return {
      field: 'email',
      error: 'An account with that email already exists'
    };
  }
  const reason = auth.isInvalidPassword(userInfo.raw_password);
  if (reason != null) {
    return { field: 'password', error: `Invalid password: ${reason}` };
  }
  const hashedPassword = auth.hashPassword(userInfo.raw_password);
  let newUser;
  try {
    newUser = await db.user.create({
      name_first: userInfo.name_first,
      name_last: userInfo.name_last,
      rank: userInfo.rank,
      phone: userInfo.phone,
      affiliation_id: userInfo.affiliation_id,
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
async function sendVerification(rootUrl: string, user) {
  const confirmation_code = auth.generateConfirmationCode();
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
async function confirmEmail(
  rootUrl,
  { user_id, confirmation_code }
) {
  const user = await db.user.findById(user_id);
  if (!user) {
    return { error: 'confirmation code does not match' };
  }
  if (user.confirmation_email && user.confirmation_code !== confirmation_code && !user.email_verified) {
    return { error: 'confirmation code does not match' };
  } else {
    user.set('email_verified', true);
    user.set('confirmation_code', null);
    await user.save();
  }
  asyncDo(() => sendApproval(rootUrl, user));
  return null;
}

// Step 4
async function sendApproval(rootUrl: string, user) {
  const url = `${rootUrl}/dashboard/user/pending`;
  await sendMail('admin-approval', { to: config.email.adminAddress, url, user });
}

// Step 5
async function approve(user_id: number) {
  const user = await db.user.findById(user_id);
  if (!user) {
    return { error: 'unknown user' };
  }
  user.set('approved', true);
  user.set('active', true);
  await user.save();
  return null;
}

module.exports = {
  steps: {
    register,
    confirmEmail,
    approve
  }
};
