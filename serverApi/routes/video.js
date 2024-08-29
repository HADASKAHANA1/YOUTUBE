import videoController from '../controllers/video.js'
import express from 'express'
import verifyToken from "../auth/authMiddleware.js"
import jwt from "jsonwebtoken"


const router = express.Router()


router.route('/allVideos').get(videoController.getVideos)

export default router;
