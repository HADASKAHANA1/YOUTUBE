import Video from "../models/video.js"


const createVideo = async (title, url, thumbnail, description, uploadBy, idUser) => {
    try {
      // יצירת מזהה ייחודי חדש עבור הווידאו
      const latestVideo = await Video.findOne().sort({ id: -1 }).exec(); // חיפוש הסרטון האחרון שנוצר
      const videoid = latestVideo ? parseInt(latestVideo.id) + 1 : 1; // קביעת מזהה חדש
  
      // יצירת אובייקט וידאו חדש
      const video = new Video({
        id: videoid,
        title: title,
        url: url,
        thumbnail: thumbnail,
        description: description,
        uploadedBy: uploadBy,
        authorId: idUser,
        comments: [],
        likes: [],
        views: Math.floor(Math.random() * (1000000000 - 0 + 1)) + 0 // יצירת מספר צפיות אקראי
      });
  
      // שמירת הסרטון החדש ב-MongoDB
      await video.save();
      return video
    } catch (err) {
      console.error("Error creating video:", err);
    }
  };
  

const getCombinedVideoList = async () => {
    try {
     
      
      // מציאת 10 הסרטונים הנצפים ביותר
      const topViewedVideos = await Video.find().sort({ views: -1 }).limit(10);
      
      
      // מציאת 10 סרטונים אקראיים מתוך הסרטונים שנותרו
      const remainingVideos = await Video.find({ _id: { $nin: topViewedVideos.map(video => video._id) } });
      const shuffled = remainingVideos.sort(() => 0.5 - Math.random());
      const randomVideos = shuffled.slice(0, 10);
      
      // שילוב שתי הרשימות וסידורן באקראי
      return [...topViewedVideos, ...randomVideos].sort(() => 0.5 - Math.random());
    } catch (error) {
      console.error('Error adding default videos:', error);
    }
  }

const getVideos=async()=>{
    const videos = await Video.find()
    return videos
}
const getVideoById = async(id)=>{
    return await Video.findOne({id:id})
}

const editVideo = async (videoId, newTitle, newThumbnail, newVideo, newDescription) => {
    try {
      // חיפוש ועדכון הווידאו במונגו לפי ה-id שלו
      const updatedVideo = await Video.findOneAndUpdate(
        { id: videoId }, // חיפוש הווידאו לפי מזהה
        {
          title: newTitle,
          description: newDescription,
          thumbnail: newThumbnail,
          url: newVideo
        },
        { new: true } // מחזיר את האובייקט המעודכן לאחר השינוי
      );
  
      if (updatedVideo) {
        console.log("Video updated successfully:", updatedVideo);
        return 1; // מצא ועדכן
      } else {
        console.log("Video not found");
        return 0; // לא מצא
      }
    } catch (err) {
      console.error("Error updating video:", err);
      return 0; // במקרה של שגיאה
    }
  };
  const deleteVideo = async (id) => {
    try {
      // חיפוש הווידאו לפי מזהה
      const video = await Video.findOne({ id: id });
      
      if (!video) {
        console.log("Video not found");
        return 404; // הווידאו לא קיים
      }
  
      // מחיקת הווידאו ממסד הנתונים
      await Video.deleteOne({ id: id });
  
      console.log("Video deleted successfully");
      return 1; // מחיקה הצליחה
    } catch (err) {
      console.error("Error deleting video:", err);
      return 500; // שגיאה במהלך מחיקה
    }
  };

  const updateCommments = async(username) => {
         // מחיקת התגובות של המשתמש מכל הסרטונים
         await Video.updateMany(
            { "comments.user": username }, // חיפוש סרטונים עם תגובות של המשתמש
            { $pull: { comments: { user: username } } } // הסרת התגובות של המשתמש
        );
  }

  const addComment = async (videoId, user, text) => {
    try {
      // חפש את הווידאו לפי מזהה
      const video = await Video.findOne({ id: videoId });
      
      if (!video) {
        console.log("Video not found");
        return 0; // לא נמצא וידאו מתאים
      }
  
      // חישוב commentid: אם המערך ריק, התחל ב-0, אחרת הוסף 1 ל-id של התגובה האחרונה
      const commentId = video.comments.length > 0 
        ? video.comments[video.comments.length - 1].id + 1 
        : 0;
  
      // הוסף את התגובה החדשה למערך
      video.comments.push({ id: commentId, user: user, text: text });
  
      // שמור את הווידאו המעודכן
      await video.save();
  
      console.log("Comment added successfully");
      return 1; // הצלחה
    } catch (err) {
      console.error("Error adding comment:", err);
      return 500; // שגיאה במהלך הוספה
    }
  };

  const editComment = async (videoId, commentId, newComment) => {
    try {
      // מצא את הווידאו עם התגובה הנכונה
      const video = await Video.findOne({ id: parseInt(videoId) });
      
      if (!video) {
        console.log("Video not found");
        return 0; // לא נמצא וידאו מתאים
      }
  
      // מצא את התגובה המתאימה לפי commentId
      const comment = video.comments.find(c => parseInt(c.id) === parseInt(commentId));
      
      if (!comment) {
        console.log("Comment not found");
        return 0; // לא נמצאה תגובה מתאימה
      }
  
      // עדכן את הטקסט של התגובה
      comment.text = newComment;
  
      // שמור את הווידאו המעודכן במסד הנתונים
      await video.save();
  
      console.log("Comment updated successfully");
      return 1; // הצלחה
    } catch (err) {
      console.error("Error updating comment:", err);
      return 500; // שגיאה במהלך העדכון
    }
  };
  
  const deleteComment = async (videoId, commentId) => {
    try {
      // מצא את הווידאו עם התגובה המתאימה
      const video = await Video.findOne({ id: parseInt(videoId) });
  
      if (!video) {
        console.log("Video not found");
        return 0; // לא נמצא וידאו מתאים
      }
  
      // מצא את האינדקס של התגובה המתאימה
      const commentIndex = video.comments.findIndex(c => parseInt(c.id) === parseInt(commentId));
  
      if (commentIndex === -1) {
        console.log("Comment not found");
        return 0; // לא נמצאה תגובה מתאימה
      }
  
      // מחק את התגובה מהמערך
      video.comments.splice(commentIndex, 1);
  
      // שמור את השינויים במסד הנתונים
      await video.save();
  
      console.log("Comment deleted successfully");
      return 1; // הצלחה
    } catch (err) {
      console.error("Error deleting comment:", err);
      return 500; // שגיאה במהלך המחיקה
    }
  };

  const likeDislike = async (username, idVideo) => {
    try {
      // מצא את הווידאו לפי idVideo
      const video = await Video.findOne({ id: parseInt(idVideo) });
  
      if (!video) {
        console.log("Video not found");
        return 0; // לא נמצא וידאו מתאים
      }
  
      // בדוק אם המשתמש כבר אוהב את הווידאו
      const likeIndex = video.likes.indexOf(username);
  
      if (likeIndex !== -1) {
        // המשתמש כבר אוהב את הווידאו - הסר אותו מרשימת הלייקים
        video.likes.splice(likeIndex, 1);
      } else {
        // המשתמש לא אוהב את הווידאו - הוסף אותו לרשימת הלייקים
        video.likes.push(username);
      }
  
      // שמור את השינויים במסד הנתונים
      await video.save();
  
      console.log("Like/Dislike updated successfully");
      return 1; // הצלחה
    } catch (err) {
      console.error("Error updating like/dislike:", err);
      return 500; // שגיאה במהלך העדכון
    }
  };
  
  const updateLikes = async(username) =>{
             // מחיקת התגובות של המשתמש מכל הסרטונים
             await Video.updateMany(
                { "likes": username}, // חיפוש סרטונים עם תגובות של המשתמש
                { $pull: { likes: username } } // הסרת התגובות של המשתמש
            );

  }
  
  
  




export default {
    createVideo,
    getCombinedVideoList,
    getVideos,
    getVideoById,
    editVideo,
    deleteVideo,
    addComment,
    deleteComment,
    editComment,
    likeDislike,
    updateCommments,
    updateLikes
}