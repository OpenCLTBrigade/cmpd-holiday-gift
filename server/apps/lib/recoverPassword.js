// @flow

const db = require('../../models');
const auth = require('./auth');
const path = require('path');
const sendMail = require('./mail')(path.join(__dirname, '../auth/templates'));

// TODO: should there be any restrictions on how often a user can reset their password?

// Step 1
async function sendRecoverEmail(rootUrl: string, email: string): Promise<boolean> {
  const user = await db.user.findOne({ where: { email: email } });
  if (user == null || user.confirmation_code != null || user.active === false || user.approved === false) {
    return false;
  }
  const confirmation_code = auth.generateConfirmationCode();
  user.set('confirmation_code', confirmation_code);
  await user.save();
  await sendMail('recover', {
    to: user.email,
    user,
    confirmation_code,
    // TODO: proper front-end path for confirmation
    recover_url: `${rootUrl}/auth/recover`
  });
  return true;
}

// Step 2
async function verifyConfirmationCode(user_id: number, confirmation_code: string): Promise<?{token: string}> {
  const user = await db.user.findById(user_id);
  if (user == null || user.confirmation_code == null || user.confirmation_code !== confirmation_code) {
    return null;
  }
  user.set('confirmation_code', null);
  await user.save();
  return { token: await auth.newAuthSession(user_id) };
}

// Step 3
async function resetPassword(user: $TODO, new_password: string): Promise<void> {
  // TODO: invalidate other sessions
  user.set('password', auth.hashPassword(new_password));
  await user.save();
}

module.exports = {
  sendRecoverEmail,
  verifyConfirmationCode,
  resetPassword
};
