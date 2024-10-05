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
      const pid = req.params.pid; // מזהה הסרטון שצריך לבדוק

  
      let sockets = jwtProvider.userThreads;
      const socket = sockets.get(userid.toString());
  
      if (socket) {
        // שליחת ההודעה לשרת דרך הסוקט
        const message = `get_recommendations,${userid}`;
        socket.write(message);
  
        // מתן טיפול רק פעם אחת לתגובה מהשרת
        const responseHandler = async (data) => {
          const response = data.toString();
  
          // פענוק התגובה
          if (response.startsWith("recommended_videos:")) {
            const recommendationsString = response.split(":")[1]; // לקבל את המידע אחרי "recommended_videos:"
            const videoIds = recommendationsString.split(","); // לפצל את המידע לפי פסיקים
            let recVideos = [];
            for (const videoId of videoIds) {
              // קריאה לפונקציה getVideoById עבור כל מזהה סרטון
              const video = await videoService.getVideoById(videoId);
              recVideos.push(video);
            }

            
          recVideos = await videoService.completeVideoList(recVideos);
 
          // מחיקת הסרטון עם המזהה pid מהרשימה
          recVideos = recVideos.filter(video => video._id.toString() !== pid.toString());
          // אם יש יותר מ-10 סרטונים, נבחר את עשרת הסרטונים עם הכי הרבה צפיות
          if (recVideos.length > 10) {
            recVideos.sort((a, b) => b.views - a.views);
            recVideos = recVideos.slice(0, 10);
          }
            // שליחת ההמלצות ללקוח
            res.status(200).json({ videos: recVideos });
            socket.removeListener('data', responseHandler); // להסיר את המאזין לאחר שליחת התגובה
          } else if (response.startsWith("empty")) {
            // אם אין סרטונים מומלצים, קרא לפונקציה getVideos
            let recVideos = [];
            recVideos = await videoService.completeVideoList(recVideos);
            // מחיקת הסרטון עם המזהה pid מהרשימה
            recVideos = recVideos.filter(video => video._id.toString() !== pid.toString());


            res.status(200).json({ videos: recVideos }); // מחזיר את כל הסרטונים
            socket.removeListener('data', responseHandler); // להסיר את המאזין לאחר שליחת התגובה
          } else {
            console.error("Invalid response format");
            res.status(500).json({ error: 'Invalid response from server' });
            socket.removeListener('data', responseHandler); // להסיר את המאזין לאחר שליחת התגובה
          }
        };
  
        // מוסיף את המאזין רק פעם אחת
        socket.on('data', responseHandler);
      }
      if (parseInt(req.params.id) == -1){
      
        let recVideos = [];
        recVideos = await videoService.completeVideoList(recVideos);
        // מחיקת הסרטון עם המזהה pid מהרשימה
        recVideos = recVideos.filter(video => video._id.toString() !== pid.toString());

        res.status(200).json({ videos: recVideos }); // מחזיר את כל הסרטונים
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