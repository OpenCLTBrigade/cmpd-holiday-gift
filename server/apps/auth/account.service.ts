import { User } from "./user";
import auth from "../lib/auth";
import logger from "../lib/logger";

import * as path from "path";

import { getRepository } from "typeorm";
import config from "../../config";

const sendMail = require("./mail")(path.join(__dirname, "../auth/templates"));

export async function login({ email, password }) {
  try {
    let user = await getRepository(User).findOne({ email });

    if (user && auth.validHashOfPassword(user.password, password)) {
      return { token: await auth.newAuthSession(user.id) };
    }
  } catch (error) {
    logger.error(error);
    return undefined;
  }
}

export async function register(url, { email, password: rawPassword, ...rest }) {
  try {
    const repository = getRepository(User);
    const password = auth.hashPassword(rawPassword);
    const user = await repository.create({ email, password, ...rest });

    const confirmationCode = auth.generateConfirmationCode();
    user.confirmationCode = confirmationCode;
    
    await repository.save(user);

    sendMail('verify-email', {
      to: email,
      confirmationCode,
      confirmationUrl: `${url}/auth/confirm_email`
    })

    user.confirmationEmail = true;
    
    await repository.save(user);

    return user;
  } catch (error) {
    logger.error(error);

    return undefined;
  }
}

export async function extend({ id }) {
  if (id) {
    return { token: await auth.newAuthSession(id) };
  }

  return undefined;
}

export async function getToken({ app, user }) {
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

export async function confirmEmail({ url, id, confirmationCode }) {
  try {
    const repository = getRepository(User);
    let user = await repository.findOneById(id);

    if (
      user.confirmationEmail &&
      !user.emailVerified &&
      confirmationCode !== user.confirmationCode
    ) {
      throw new Error("confirmation code does not match");
    }

    user.emailVerified = true;
    user.confirmationCode = null;

    await repository.save(user);

    return user;
  } catch (error) {
    logger.error(error);
    return undefined;
  }
}

export async function approveUser({ id }) {
  try {
    const repository = getRepository(User);
    let user = await repository.findOneById(id);

    user.approved = true;
    user.active = true;

    await repository.save(user);

    return user;
  } catch (error) {
    logger.error(error);
    return undefined;
  }
}

export async function sendRecoveryEmail({ url, email }) {
  try {
    const repository = getRepository(User);
    let user = await repository.findOne({ email });

    if (user == null || user.active === false || user.approved === false) {
      logger.info("sendRecoverEmail - User not found");
      return undefined;
    }

    const confirmationCode = auth.generateConfirmationCode();

    user.confirmationCode = confirmationCode;

    await repository.save(user);

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

export async function verifyConfirmationCode({ id, confirmationCode }) {
  try {
    const repository = getRepository(User);
    let user = await repository.findOneById(id);

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

export async function resetPassword({ id, confirmationCode, password }) {
  try {
    const hasValidCode = await verifyConfirmationCode({id, confirmationCode})

    if(!hasValidCode) {
      return undefined
    }

    const repository = getRepository(User);
    let user = await repository.findOneById(id);

    user.password = auth.hashPassword(password);
    user.confirmationCode = null;

    repository.save(user);

    return user;
  } catch (error) {
    logger.error(error);
    return undefined;
  }
}
