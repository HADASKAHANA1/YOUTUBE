import videoService from '../services/videos.js'
import videoModel from '../models/video.js'
import jwtProvider from '../auth/jwtProvider.js'


const getVideos  = async (req, res) => {
       
    try {

      const videos = await videoService.getVideos();

      res.status(200).json({ videos: videos, message: 'all vidoes seccess' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to bring videos' });
    }
  };

  const getRecVideos = async (req, res) => {
    try {
      const userid = req.params.id;
  
      let sockets = jwtProvider.userThreads;
      const socket = sockets.get(userid.toString());
  
      // שליחת ההודעה לשרת דרך הסוקט
      const message = `get_recommendations,${userid}`;
      socket.write(message);
  
      // המתנה לתשובה מהשרת
      socket.once('data', async (data) => {
        const response = data.toString();
  
        // המרת התשובה לאובייקט JSON
        const recommendations = JSON.parse(response);
  
        // יצירת רשימה של הסרטונים על פי ה-IDs המתקבלים
        const videoIds = recommendations.recommended_videos;
        const recVideos = [];
        if (videoIds.length === 0) {
          // אם אין סרטונים מומלצים, קרא לפונקציה getVideos
          const allVideos = await videoService.getVideos(); // הנחתי שהפונקציה getVideos מחזירה את כל הסרטונים
          return res.status(200).json(allVideos); // מחזיר את כל הסרטונים
        }

        for (const videoId of videoIds) {
          // קריאה לפונקציה getVideoById עבור כל מזהה סרטון
          const video = await videoService.getVideoById(videoId);
          recVideos.push(video);
        }
  
        // שליחת ההמלצות ללקוח
        res.status(200).json(recVideos);
      });
  
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
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
      return res.status(409).json({ error: 'video is not exist' });

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
    likeDisLike,
    getRecVideos
  }
