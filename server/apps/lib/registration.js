// @flow
var path = require('path');

var auth = require('./auth.js');
var db = require('../../models');
var config = require('../../config');
var sendMail = require('./mail')(path.join(__dirname, '../auth/templates'));
var asyncDo = require('./asyncDo');

export type NullOrError<T={}> = null | { error: string, ...T };

// Step 1
async function register(rootUrl: string, userInfo: $TODO): Promise<NullOrError<{field?: $Keys<$TODO>}>> {
  var user = await db.user.findOne({ where: { email: userInfo.email } });
  if (user) {
    return {
      field: 'email',
      error: 'An account with that email already exists'
    };
  }
  var reason = auth.isInvalidPassword(userInfo.raw_password);
  if (reason != null) {
    return { field: 'password', error: `Invalid password: ${reason}` };
  }
  var hashedPassword = auth.hashPassword(userInfo.raw_password);
  try {
    var newUser = await db.user.create({
      name_first: userInfo.name_first,
      name_last: userInfo.name_last,
      rank: userInfo.rank,
      phone: userInfo.phone,
      affiliation_id: userInfo.affiliation_id,
      email: userInfo.email,
      password: hashedPassword,
    });
  } catch (error) {
    // TODO: generate better error message or log error
    return { error: 'unknown error' };
  }
  asyncDo(() => sendVerification(rootUrl, newUser));
  return null;
}

// Step 2
async function sendVerification(rootUrl: string, user: $TODO): Promise<void> {
  var confirmation_code = auth.generateConfirmationCode();
  user.confirmation_code = confirmation_code;
  await user.save();
  await sendMail('verify-email', {
    to: user.dataValues.email,
    user,
    confirmation_code,
    // TODO: proper froent-end path for confirmation
    confirm_email_url: `${rootUrl}/register/confirm_email`
  });
  user.set('confirmation_email', true);
  await user.save();
}

async function confirmEmail(
  rootUrl: string,
  { user_id, confirmation_code }: {| user_id: number, confirmation_code: string |}
): Promise<NullOrError<>> {
  var user = await db.user.findById(user_id);
  if (!user) {
    return { error: 'confirmation code does not match' };
  }
  if (user.confirmation_email && user.confirmation_code !== confirmation_code && !user.email_verified) {
    return { error: 'confirmation code does not match' };
  } else {
    user.set('email_verified', true);
    await user.save();
  }
  asyncDo(() => sendApproval(rootUrl, user));
  return null;
}

// Step 4
async function sendApproval(rootUrl: string, user: $TODO): Promise<void> {
  var url = `${rootUrl}/users/needing/approval`; // TODO: correct url
  await sendMail('admin-approval', { to: config.email.adminAddress, url, user });
}

// Step 5
async function approve(user_id: number): Promise<NullOrError<>> {
  var user = await db.user.findById(user_id);
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
