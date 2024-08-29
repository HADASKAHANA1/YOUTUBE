import videoModel from '../models/video.js'


const getVideos  = async (req, res) => {
       
    try {
      const videos = videoModel.getVideos()
      console.log('getAllVideos: ', videoModel.getVideos());
      console.log('videos: ', videos);
  
      res.status(200).json({ videos: videos, message: 'all vidoes seccess' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to bring videos' });
    }
  };

  export default{
    getVideos
  }
