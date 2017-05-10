// TODO: move logic to another file

var bCrypt = require('bcrypt-nodejs');
var nodemailer = require('nodemailer');
var ses = require('nodemailer-ses-transport');
var config = require('../config');

/* TODO: Setup separate transporters for SES vs test environment
var transporter = nodemailer.createTransport(ses({
  accessKeyId: 'amazon_id',
  secretAccessKey: 'amazon_key'
}));
*/

var transporter = nodemailer.createTransport({
  port: config.email.port,
  host: config.email.host,
  auth: {
    user: config.email.user,
    pass: config.email.pass
  }
});

var hashPassword = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};

var confirmCode = Math.random();

var hashConfirmCode = function (confirmCode) {
  return bCrypt.hashSync(confirmCode, bCrypt.genSaltSync(8), null);
}

var configurePassport = function (passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {
            User.findOne({where: {email: email}}).then(function (user) {
                if (user) {
                    return done(null, false, {message: 'That email is already taken'});
                } else {
                    var userPassword = hashPassword(password);
                    var userConfirmCode = hashConfirmCode(confirmCode);
                    var data =
                        {
                            name_first: req.body.firstname,
                            name_last: req.body.lastname,
                            rank: req.body.rank,
                            phone: req.body.phone,
                            affiliation_id: req.body.affiliation,
                            email: email,
                            password: userPassword,
                            confirmation_code: userConfirmCode
                        };

                    User.create(data).then(function (newUser) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            transporter.sendMail({
                              from: config.email.email_from_address,
                              to: newUser.dataValues.email,
                              subject: config.email.mail_confirm_email_subject,
                              html: '<p>Hello ' + newUser.dataValues.name_first + ' ' + newUser.dataValues.name_last + '</p><p><a href="register/confirm_email?id=' + newUser.dataValues.id + '&confirmation_code=' + newUser.dataValues.confirmation_code + '">Click here</a> to confirm your registration on xxx.</p>'
                            });
                            return done(null, newUser);
                        }
                    });
                }
            });
        }
    ));

    //LOCAL SIGNIN
    passport.use('local-signin', new LocalStrategy(
        {
        // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

      function (req, email, password, done) {
          var User = user;
          var isValidPassword = function (userpass, password) {
              return bCrypt.compareSync(password, userpass);
          };
          User.findOne({where: {email: email}}).then(function (user) {
              if (!user) {
                  return done(null, false, {message: 'Email does not exist'});
              }
              if (!isValidPassword(user.password, password)) {
                  return done(null, false, {message: 'Incorrect password.'});
              }

              var userinfo = user.get();
              return done(null, userinfo);
          }).catch(function () {
              return done(null, false, {message: 'Something went wrong with your Signin'});
          });
      }
    ));

    //serialize
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // deserialize user
    passport.deserializeUser(function (id, done) {
        User.findById(id).then(function (user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });
};

configurePassport.hashPassword = hashPassword;

module.exports = configurePassport;
