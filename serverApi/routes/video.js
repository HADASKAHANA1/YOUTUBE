import videoController from '../controllers/video.js'
import express from 'express'
import verifyToken from "../auth/authMiddleware.js"
import jwt from "jsonwebtoken"


const router = express.Router()


router.route('/allVideos').get(videoController.getVideos)
router.route('/').get(videoController.getPopularVideos)
router.route('/:id/like').post(verifyToken.verifyToken,videoController.likeDisLike)
router.route('/:id/recVideos/:pid').get(videoController.getRecVideos)



export default router;