import userController from '../controllers/users.js'
import express from 'express'
//import multer from 'multer'

const router = express.Router()

//const upload = multer({ dest: 'uploads/' }); // מיקום לשמירת קבצים

router.route('/').post(userController.createUser)
router.route('/').get(userController.getUsers)


//router.post('/', upload.single('profilePicture'), userController.createUser);

export default router;
