import userController from '../controllers/users.js'
import express from 'express'
import jwtProvider from '../auth/jwtProvider.js'

const router = express.Router()

// router.route('/login').post(userController.login)
router.post("/tokens", jwtProvider.jwtProvider);


export default router;
