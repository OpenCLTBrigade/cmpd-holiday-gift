import { Router } from 'express';
import auth from '../lib/auth';
import config from '../../config'

const db = require('../../models')
const registration = require('../lib/registration')
const recovery = require('../lib/recoverPassword')

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

export async function register(req, res) {
    const body: RegisterRequest = req.body
    const error = await registration.steps.register(rootUrl(req), {
      name_first: body.firstname,
      name_last: body.lastname,
      rank: body.rank,
      phone: body.phone,
      affiliation_id: body.affiliation,
      email: body.email,
      raw_password: body.password
    })
    if (error) {
      res.json(error)
    } else {
      res.json({ success: true })
    }
  }

export async function login(req, res) {
    const body: LoginRequest = req.body
    const user = await db.user.findOne({ where: { email: body.email } })
    if (user && auth.validHashOfPassword(user.password, body.password)) {
      // TODO handle errors from newAuthSession
      res.json({ token: await auth.newAuthSession(user.id) })
    } else {
      // Unknown username or invalid password
      res.json({ failed: true })
    }
  }

  export async function extend(req, res) {
    if (req.user.id) {
      // TODO: extend existing session instead
      res.json({ token: await auth.newAuthSession(req.user.id) })
    } else {
      res.status(403).send()
    }
  }

  export async function getToken(req, res) {
    const body = req.body
    if (req.user && auth.userCanUseApp(req.user, body.app)) {
      res.json({
        token: auth.makeToken(
          {
            id: req.user.id,
            role: req.user.role,
            name_first: req.user.name_first,
            name_last: req.user.name_last
          },
          config.jwtSecrets[body.app],
          config.appTokenLifetime
        )
      })
    } else {
      res.status(403).send()
    }
  }

  export async function confirm(req, res) {
    const body = req.body
    const error = await registration.steps.confirmEmail(rootUrl(req), {
      user_id: body.id,
      confirmation_code: body.confirmation_code
    })
    if (error) {
      res.json(error)
    } else {
      res.json({ success: true })
    }
  }

  export async function approve(req, res) {
    const body = req.body
    const error = await registration.steps.approve(body.user_id)
    if (error) {
      res.json(error)
    } else {
      res.json({ success: true })
    }
  }

  export async function sendRecoverEmail(req, res) {
    const body = req.body
    if (await recovery.sendRecoverEmail(rootUrl(req), body.email)) {
      res.json({ success: true })
    } else {
      res.json({ error: 'failed' })
    }
  }

  async function verifyConfirmationCode(req, res) {
    const body = req.body
    const token = recovery.verifyConfirmationCode(body.user_id, body.confirmation_code)
    if (!token) {
      res.json({ error: 'failed' })
    } else {
      res.json({ token })
    }
  }

  export async function resetPassword(req, res) {
    const body = req.body
    // When using verifyConfirmationCode
    // await recovery.resetPassword(req.user, body.new_password);
    const { id, confirmation_code, password } = body
    if (!id || !confirmation_code || !password) {
      res.json({ success: false })
      return
    }
  
    const token = recovery.verifyConfirmationCode(id, confirmation_code) // Remove when implementing other method
    if (!token) {
      res.json({ success: false, error: 'Invalid token.' })
      return
    }
  
    // await recovery.resetPassword(req.user, body.new_password); // when using verifyConfirmationCode
    await recovery.resetPassword(id, confirmation_code, password)
    res.json({ success: true })
  }
