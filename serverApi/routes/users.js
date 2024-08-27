import userController from '../controllers/users.js'
import express from 'express'
// Use a library to perform the cryptographic operations
import jwt from "jsonwebtoken"
// We are using cryptography, to ensure that no one else will be able to impersonate users
// To that end, we are going to use the following secret key
// Keep it safe. No one except the server should know this secret value
const key = "Some super secret key shhhhhhhhhhhhhhhhh!!!!!"

//import multer from 'multer'

const router = express.Router()

//const upload = multer({ dest: 'uploads/' }); // מיקום לשמירת קבצים

router.route('/').post(userController.createUser)
router.route('/').get(userController.getUsers)

router.route('/:id').get(userController.getUserById)




//router.post('/', upload.single('profilePicture'), userController.createUser);

export default router;
