import userController from '../controllers/users.js'
import express from 'express'
import verifyToken from "../auth/authMiddleware.js"
// Use a library to perform the cryptographic operations
import jwt from "jsonwebtoken"


const router = express.Router()

//const upload = multer({ dest: 'uploads/' }); // מיקום לשמירת קבצים

router.route('/').post(userController.createUser)
router.route('/').get(userController.getUsers)

router.route('/:id').get(userController.getUserById)
router.route('/:id/videos').post(userController.uploadVideo)


router.route('/logout/:id').get(verifyToken.verifyToken,userController.logout)




//router.post('/', upload.single('profilePicture'), userController.createUser);

export default router;
