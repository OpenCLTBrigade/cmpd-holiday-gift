
import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as path from "path";

import User from '../../entities/user';
import auth from "../lib/auth";
import logger from "../lib/logger";
import config from "../../config";

const sendMail = require("../lib/mail")(path.join(__dirname, "../auth/templates"));

@Component()
export class AccountService {
  constructor(
    @Inject('UserRepositoryToken') private readonly userRepo: Repository<User>) {}

    async login({ email, password }) {
        try {
          let user = await this.userRepo.findOne({ email });
      
          if (user && auth.validHashOfPassword(user.password, password)) {
            return { token: await auth.newAuthSession(user.id) };
          }
        } catch (error) {
          logger.error(error);
          return undefined;
        }
    }

    async register(url, { email, password: rawPassword, ...rest }) {
        try {
          const password = auth.hashPassword(rawPassword);
          const user = await this.userRepo.create({ email, password, ...rest });
      
          const confirmationCode = auth.generateConfirmationCode();
          user.confirmationCode = confirmationCode;
          
          await this.userRepo.save(user);
      
          sendMail('verify-email', {
            to: email,
            confirmationCode,
            confirmationUrl: `${url}/auth/confirm_email`
          })
      
          user.confirmationEmail = true;
          
          await this.userRepo.save(user);
      
          return user;
        } catch (error) {
          logger.error(error);
      
          return undefined;
        }
      }

      async extend({ id }) {
        if (id) {
          return { token: await auth.newAuthSession(id) };
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
          let user = await this.userRepo.findOneById(id);
      
          if (
            user.confirmationEmail &&
            !user.emailVerified &&
            confirmationCode !== user.confirmationCode
          ) {
            throw new Error("confirmation code does not match");
          }
      
          user.emailVerified = true;
          user.confirmationCode = null;
      
          await this.userRepo.save(user);
      
          return user;
        } catch (error) {
          logger.error(error);
          return undefined;
        }
      }

      async approveUser({ id }) {
        try {
          let user = await this.userRepo.findOneById(id);
      
          user.approved = true;
          user.active = true;
      
          await this.userRepo.save(user);
      
          return user;
        } catch (error) {
          logger.error(error);
          return undefined;
        }
      }

      async sendRecoveryEmail({ url, email }) {
        try {
          let user = await this.userRepo.findOne({ email });
      
          if (user == null || user.active === false || user.approved === false) {
            logger.info("sendRecoverEmail - User not found");
            return undefined;
          }
      
          const confirmationCode = auth.generateConfirmationCode();
      
          user.confirmationCode = confirmationCode;
      
          await this.userRepo.save(user);
      
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
          let user = await this.userRepo.findOneById(id);
      
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
      
          let user = await this.userRepo.findOneById(id);
      
          user.password = auth.hashPassword(password);
          user.confirmationCode = null;
      
          this.userRepo.save(user);
      
          return user;
        } catch (error) {
          logger.error(error);
          return undefined;
        }
    }
}