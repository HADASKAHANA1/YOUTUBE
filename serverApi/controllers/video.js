import videoModel from '../models/video.js'


const getVideos  = async (req, res) => {
       
    try {

      const videos = videoModel.getVideos()


  
      res.status(200).json({ videos: videos, message: 'all vidoes seccess' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to bring videos' });
    }
  };

  
const getPopularVideos  = async (req, res) => {
       
  try {

    const videos = videoModel.getCombinedVideoList()


    res.status(200).json({ videos: videos, message: '20 vidoes seccess' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to bring videos' });
  }
};

const getVideoById  = async (req, res) => {
       
  try {

    const video = videoModel.getVideoById(req.params.id)


    res.status(200).json({ video: video, message: 'bring vidoe seccess' });
  } catch (error) {
    res.status(500).json({video:null, error: 'video is not exist' });
  }
};


  export default{
    getVideos,
    getPopularVideos,
    getVideoById
  }
