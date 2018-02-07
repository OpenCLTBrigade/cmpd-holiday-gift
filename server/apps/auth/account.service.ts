
import { Component } from '@nestjs/common';
import * as path from "path";

import User from '../../entities/user';
import auth from "../lib/auth";
import logger from "../lib/logger";
import config from "../../config";

const sendMail = require("../lib/mail")(path.join(__dirname, "../auth/templates"));

@Component()
export class AccountService {
  constructor() {}

    async login({ email, password }) {
        try {
          let user = await User.findOne({ email });
      
          if (user && auth.validHashOfPassword(user.password, password)) {
            return { token: await auth.createSession(user.id) };
          }
        } catch (error) {
          logger.error(error);
          return undefined;
        }
    }

    async register(url, { email, password: rawPassword, ...rest }) {
        try {
          const password = auth.hashPassword(rawPassword);
          const user = User.fromJSON({ email, password, ...rest });
               
          const confirmationCode = auth.generateConfirmationCode();
          user.confirmationCode = confirmationCode;
          
          await user.save();
      
          sendMail('verify-email', {
            to: email,
            confirmationCode,
            confirmationUrl: `${url}/auth/confirm_email`
          })
      
          user.confirmationEmail = true;
          
          await user.save();
      
          return user;
        } catch (error) {
          logger.error(error);
      
          return undefined;
        }
      }

      async extend({ id }) {
        if (id) {
          return { token: await auth.createSession(id) };
        }
      
        return undefined;
      }

      async getToken({ app, user }) {
        try {
          if (user && auth.userCanUseApp(user, app)) {
            const { id, role, firstName, lastName } = user;
      
            return {
              token: auth.makeToken(
                {
                  id,
                  role,
                  firstName,
                  lastName
                },
                config.jwtSecrets[app],
                config.appTokenLifetime
              )
            };
          }
        } catch (error) {
          logger.error(error);
      
          return undefined;
        }
      }

      async confirmEmail({ url, id, confirmationCode }) {
        try {
          let user = await User.findOneById(id);
      
          if (
            user.confirmationEmail &&
            !user.emailVerified &&
            confirmationCode !== user.confirmationCode
          ) {
            throw new Error("confirmation code does not match");
          }
      
          user.emailVerified = true;
          user.confirmationCode = null;
      
          await user.save();
      
          return user;
        } catch (error) {
          logger.error(error);
          return undefined;
        }
      }

      async approveUser({ id }) {
        try {
          let user = await User.findOneById(id);
      
          user.approved = true;
          user.active = true;
      
          await user.save();
      
          return user;
        } catch (error) {
          logger.error(error);
          return undefined;
        }
      }

      async sendRecoveryEmail({ url, email }) {
        try {
          let user = await User.findOne({ email });
      
          if (user == null || user.active === false || user.approved === false) {
            logger.info("sendRecoverEmail - User not found");
            return undefined;
          }
      
          const confirmationCode = auth.generateConfirmationCode();
      
          user.confirmationCode = confirmationCode;
      
          await user.save();
      
          await sendMail("recover", {
            to: email,
            user,
            confirmationCode,
            confirmationUrl: `${url}/auth/new_password`
          });
      
          return user;
        } catch (error) {
          logger.error(error);
          return undefined;
        }
      }

      async verifyConfirmationCode({ id, confirmationCode }) {
        try {
          let user = await User.findOneById(id);
      
          if (
            user.confirmationCode == null ||
            user.confirmationCode !== confirmationCode
          ) {
            return false;
          }
      
          return true;
        } catch (error) {
          logger.error(error);
          return false;
        }
      }

      async resetPassword({ id, confirmationCode, password }) {
        try {
          const hasValidCode = await this.verifyConfirmationCode({id, confirmationCode})
      
          if(!hasValidCode) {
            return undefined
          }
      
          let user = await User.findOneById(id);
      
          user.password = auth.hashPassword(password);
          user.confirmationCode = null;
      
          user.save();
      
          return user;
        } catch (error) {
          logger.error(error);
          return undefined;
        }
    }
}