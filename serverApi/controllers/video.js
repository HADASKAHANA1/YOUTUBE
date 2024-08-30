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

  export default{
    getVideos,
    getPopularVideos
  }
