import userController from '../controllers/users.js'
import express from 'express'
import verifyToken from "../auth/authMiddleware.js"
// Use a library to perform the cryptographic operations
import jwt from "jsonwebtoken"


const router = express.Router()


router.route('/').post(userController.createUser)
router.route('/').get(userController.getUsers)

router.route('/:id').get(userController.getUserById)
router.route('/:id').put(verifyToken.verifyToken,userController.editUser)
router.route('/:id').delete(verifyToken.verifyToken,userController.deleteUser)



router.route('/:id/videos').post(verifyToken.verifyToken,userController.uploadVideo)
router.route('/:id/videos').get(userController.getUsersVideos)


router.route('/:id/videos/:pid').delete(verifyToken.verifyToken,userController.deleteVideo)
router.route('/:id/videos/:pid').put(verifyToken.verifyToken,userController.editVideo)

router.route('/:id/videos/:pid/comment').post(verifyToken.verifyToken,userController.addComment)
router.route('/:id/videos/:pid/comment').put(verifyToken.verifyToken,userController.editComment)
router.route('/:id/videos/:pid/comment').delete(verifyToken.verifyToken,userController.deleteComment)


router.route('/logout/:id').get(verifyToken.verifyToken,userController.logout)




//router.post('/', upload.single('profilePicture'), userController.createUser);

export default router;
