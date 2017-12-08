import db from '../../models';

const auth = require('./auth');
const path = require('path');
const sendMail = require('./mail')(path.join(__dirname, '../auth/templates'));

// TODO: should there be any restrictions on how often a user can reset their password?

// Step 1
async function sendRecoverEmail(rootUrl: string, email: string): Promise<boolean> {
  const user = await db['user'].findOne({ where: { email: email } });
  if (user == null || user.active === false || user.approved === false) {
    console.log('sendRecoverEmail - User not found');
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
    recover_url: `${rootUrl}/auth/new_password`
  });
  return true;
}

// Step 2
// Not presently used. See auth/controllers for more details
// async function verifyConfirmationCode(user_id: number, confirmation_code: string): Promise<?{token: string}> {
async function verifyConfirmationCode(user_id: number, confirmation_code: string): Promise<boolean> {
  const user = await db['user'].findById(user_id);
  if (user == null || user.confirmation_code == null || user.confirmation_code !== confirmation_code) {
    return false;
  }
  // Uncomment these when implementing other method
  // user.set('confirmation_code', null);
  // await user.save();
  return true;
  // return { token: await auth.newAuthSession(user_id) };
}

// Step 3
// async function resetPassword(user, new_password: string) { // Needs step 2 implemented
async function resetPassword(id, confirmation_code, new_password: string) {
  // TODO: invalidate other sessions
  const user = await db['user'].findById(id);
  user.set('password', auth.hashPassword(new_password));
  user.set('confirmation_code', null); // Do this in the other method in future
  await user.save();
}

export default {
  sendRecoverEmail,
  verifyConfirmationCode,
  resetPassword
};
