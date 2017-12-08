import { Router } from 'express'
import { login, register, getToken, confirm, extend, approve, sendRecoverEmail, resetPassword } from './controllers'
import auth from '../lib/auth';

const { ensureLoggedIn, ensureAdmin } = auth;

const router = Router()

router.post('/login', login)
router.post('/register', ensureLoggedIn, register)
router.post('/access', ensureLoggedIn, getToken)
router.post('/confirm_email', confirm)
router.post('/extend', ensureLoggedIn, extend)
router.post('/approve', ensureAdmin, approve)
router.post('/recover/send_email', sendRecoverEmail)
router.post('/recover/reset_password', resetPassword)

export default router
