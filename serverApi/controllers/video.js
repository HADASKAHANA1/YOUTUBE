import videoService from '../services/videos.js'
import videoModel from '../models/video.js'


const getVideos  = async (req, res) => {
       
    try {

      const videos = await videoService.getVideos();



  
      res.status(200).json({ videos: videos, message: 'all vidoes seccess' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to bring videos' });
    }
  };

  
const getPopularVideos  = async (req, res) => {
       
  try {

    const videos =await videoService.getCombinedVideoList()


    res.status(200).json({ videos: videos, message: '20 vidoes seccess' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to bring videos' });
  }
};

const getVideoById  = async (req, res) => {
       
  try {

    const video = await videoService.getVideoById(req.params.id)
    console.log(req.params.id)


    res.status(200).json({ video: video, message: 'bring vidoe seccess' });
  } catch (error) {
    res.status(500).json({video:null, error: 'video is not exist' });
  }
};

const likeDisLike  = async (req, res) => {
       
  try {

    const ret = await videoService.likeDislike(req.body.username,req.params.id)
    if(!ret){
      return res.status(500).json({ error: 'video is not exist' });

    }


    res.status(200).json({  message: 'like / dislike is done' });
  } catch (error) {
    res.status(500).json({ error: 'video is not exist' });
  }
};



  export default{
    getVideos,
    getPopularVideos,
    getVideoById,
  likeDisLike
  }
