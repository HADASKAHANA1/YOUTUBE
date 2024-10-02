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
  
      if (socket) {
        // שליחת ההודעה לשרת דרך הסוקט
        const message = `get_recommendations,${userid}`;
        socket.write(message);
  
        // מתן טיפול רק פעם אחת לתגובה מהשרת
        socket.on('data', async (data) => {
          const response = data.toString();
  

          // פענוח התגובה
          if (response.startsWith("recommended_videos:")) {
            const recommendationsString = response.split(":")[1]; // לקבל את המידע אחרי "recommended_videos:"
            const videoIds = recommendationsString.split(","); // לפצל את המידע לפי פסיקים
  
            // בדוק אם videoIds מוגדר, הוא מערך ומכיל ערכים
            if (!Array.isArray(videoIds) || videoIds.length === 0) {
              // אם אין סרטונים מומלצים, קרא לפונקציה getVideos
              const allVideos = await videoService.getVideos(); // הנחתי שהפונקציה getVideos מחזירה את כל הסרטונים
              return res.status(200).json({ videos: allVideos }); // מחזיר את כל הסרטונים
            }
  
            console.log(videoIds);
            const recVideos = [];
            for (const videoId of videoIds) {
              // קריאה לפונקציה getVideoById עבור כל מזהה סרטון
              const video = await videoService.getVideoById(videoId);
              recVideos.push(video);
            }
            console.log(recVideos);
            // שליחת ההמלצות ללקוח
            return res.status(200).json({ videos: recVideos });
          } else {
            console.error("Invalid response format");
            return res.status(500).json({ error: 'Invalid response from server' });
          }
        });
      }
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