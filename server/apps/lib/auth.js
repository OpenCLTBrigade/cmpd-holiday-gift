var bcrypt = require('bcrypt-nodejs');
var LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');
var db = require('../../models');
var { join } = require('path');
var sendMail = require('./mail')(join(__dirname, '../nominations/views/email'));
var asyncDo = require('./asyncDo');

function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

function validHashOfPassword(hash, password) {
  return bcrypt.compareSync(password, hash);
}

function generateConfirmationCode() {
  return crypto.randomBytes(32).toString('hex');
}

function configurePassport(passport) {
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async function (req, email, password, done) {
    try {
      var user = await db.user.findOne({ where: { email: email } });
      if (user) {
        done(null, false, { message: 'An account with that email already exists' });
      }
      var hashedPassword = hashPassword(password);
      var confirmCode = generateConfirmationCode();
      var newUser = await db.user.create({
        name_first: req.body.firstname,
        name_last: req.body.lastname,
        rank: req.body.rank,
        phone: req.body.phone,
        affiliation_id: req.body.affiliation,
        email: email,
        password: hashedPassword,
        confirmation_code: confirmCode
      });
      // TODO: regroup phases of sign-in process into same lib file
      asyncDo(sendMail('verify-email', {
        to: newUser.dataValues.email,
        user: newUser,
        confirm_email_url: req.protocol + '://' + req.get('host') + '/register/confirm_email'
      }));
      done(null, newUser);
    } catch (error) {
      done(error);
    }
  }));

  passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async function (req, email, password, done) {
    try {
      var user = await db.user.findOne({ where: { email: email } });
      if (!user || !validHashOfPassword(user.password, password)) {
        return done(null, false);
      }
      done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    try {
      var user = await db.user.findById(id);
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (err) {
      done(err);
    }
  });
}

module.exports = { configurePassport, hashPassword };
