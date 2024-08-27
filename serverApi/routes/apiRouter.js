import userController from '../controllers/users.js'
import express from 'express'
const router = express.Router()

router.route('/login').post(userController.login)

export default router;
