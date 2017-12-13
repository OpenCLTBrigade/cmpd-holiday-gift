import { Router, Request, Response } from 'express';
import auth from '../lib/auth';
import config from '../../config'
import db from '../../models'

import * as accountService from './account.service'

import { rootUrl } from '../lib/misc'

const router = Router()

type RegisterRequest = {
  firstname: string,
  lastname: string,
  rank: string,
  phone: string,
  affiliation: number,
  email: string,
  password: string
}

type LoginRequest = {
  email: string,
  password: string
}

export async function register(req: Request, res: Response) {
    const body: RegisterRequest = req.body
    const result = await accountService.register(rootUrl(req), {
      ...body
    })

    if(result) {
      res.sendStatus(200)
    } else {
      res.sendStatus(400)
    }
  }

export async function login(req: Request, res: Response) {
  //TODO: Add validation
    const body: LoginRequest = req.body

    const result = await accountService.login(body)

    if(result) {
      res.json(result);
    } else {
      res.sendStatus(400)
    }
  }

  export async function extend(req: Request, res: Response) {
    //TODO: Add validation
    if (req['user'].id) {
      // TODO: extend existing session instead
      const result = await accountService.extend(req['user'].id);

      if(result) {
        res.json(result)
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }
  }

  export async function getToken(req: Request, res: Response) {
    //TODO: Add validation
    const body = req.body
    if (req['user'] && auth.userCanUseApp(req['user'], body.app)) {
      res.json({
        token: auth.makeToken(
          {
            id: req['user'].id,
            role: req['user'].role,
            name_first: req['user'].name_first,
            name_last: req['user'].name_last
          },
          config.jwtSecrets[body.app],
          config.appTokenLifetime
        )
      })
    } else {
      res.status(403).send()
    }
  }

  export async function confirm(req: Request, res: Response) {
    //TODO: Add validation
    const body = req.body

    const result = await accountService.confirmEmail({url: rootUrl(req), ...body})
    if(result) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }

  export async function approve(req: Request, res: Response) {
    //TODO: Add validation
    const body = req.body
    const result = await accountService.approveUser(body.user_id);

    if(result) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }

  export async function sendRecoverEmail(req: Request, res: Response) {
    //TODO: Add validation
    const body = req.body
    const result = await accountService.sendRecoveryEmail({url: rootUrl(req), ...body});

    if(result) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }

  async function verifyConfirmationCode(req: Request, res: Response) {
    //TODO: Add validation
    const body = req.body
    const result = await accountService.verifyConfirmationCode(body)

    if(result) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }

  export async function resetPassword(req: Request, res: Response) {
    const body = req.body
    //TODO: Add validation that confirmation, password, and id are present.

    // When using verifyConfirmationCode
    // await recovery.resetPassword(req['user'], body.new_password);
    const { id, confirmationCode, password } = body
    
    const hasValidCode = await accountService.verifyConfirmationCode({id, confirmationCode})
  
    if (!hasValidCode) {
      return res.sendStatus(400);
    }

    const result = await accountService.resetPassword({id, confirmationCode, password})
  
    if(result) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }
