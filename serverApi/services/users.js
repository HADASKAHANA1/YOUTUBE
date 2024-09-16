import User from "../models/users.js"
import { v4 as uuidv4 } from 'uuid'
import videoService from '../services/videos.js'



const  getUserByUserName = async(username)=>{
    try {
        const user = await User.findOne({ username: username}); // חיפוש לפי שם משתמש 
    
        if (!user) {
          return null;
        }
    
        return user
      } catch (err) {
        return null
      }
}

const createUser = async( username,password,profilePicture)=>{
    const lastUser = await User.findOne().sort({ createdAt: -1 }); // מסדר לפי createdAt מהחדש לישן

    const userId = lastUser.id+1
    if(!(await getUserByUserName(username))){
        const newUser = new User( {id: userId, username: username, password: password,profilePicture: profilePicture,videos:[]})
        await newUser.save() 
        return 1;
    }
    return 0
  
};

const usernamePasswordAreExist = async(username, password) =>{
    try {
      const user = await User.findOne({ username: username, password: password }); // חיפוש לפי שם משתמש וסיסמה
  
      if (!user) {
        console.log('User not found or password incorrect');
        return null;
      }
  
      return user
    } catch (err) {
      console.error('Error finding user:', err);
    }
  }
 const getUserById = async(id)=>{
    try {
        console.log("id: ",id)
        const userId = parseInt(id)
        const user = await User.findOne({ id:userId }); // חיפוש לפי מזהה
        console.log("l",user)
        if (!user) {
          console.log('User not found ');
          return null;
        }
    
        return user
      } catch (err) {
        console.error('Error finding user:', err);
      }
    }

    const addVideo = async (idUser, title, url, thumbnail, description) => {
        try {
          // חיפוש המשתמש לפי ID
          const user = await getUserById(idUser);
      
          if (!user) {
            console.error("User not found");
            return null;
          }
      
          // יצירת וידאו חדש עם הפרטים
          const newVideo = await videoService.createVideo(
            title,
            url,
            thumbnail,
            description,
            user.username,
            idUser
          );
      
          // הוספת מזהה הוידאו החדש לרשימת הוידאו של המשתמש
          user.videos.push(newVideo.id);
          await user.save(); // שמירת המשתמש עם העדכון החדש
      
          return newVideo;
        } catch (err) {
          console.error("Error adding video:", err);
        }
      };
      
const editVideo =async(userId, videoId,newTitle,newVideo,newThumbnail, newDescription)=>
      {
          return await videoService.editVideo(videoId,newTitle,newThumbnail,newVideo,newDescription)
      }

const deleteVideo = async (userId, videoId) => {
        try {
          // חיפוש המשתמש לפי מזהה
          const user = await User.findOne({ id: userId });
          
          if (!user) {
            console.log("User not found");
            return 400; // המשתמש לא קיים
          }
      
         
      
          // מחיקת הווידאו ממסד הנתונים
          const ret = await videoService.deleteVideo(videoId)
          if(ret==1){
            // הסרת מזהה הווידאו מרשימת הווידאוים של המשתמש
          user.videos = user.videos.filter(video => video !== videoId);
          await user.save();
      
          console.log("Video deleted successfully");
          return 1; // מחיקה הצליחה

          }
          return ret
          
        } catch (err) {
          console.error("Error deleting video:", err);
          return 500; // שגיאה במהלך מחיקה
        }
      };

      const addComment = async(videoId,user, comment)=>{
        return await videoService.addComment(videoId,user,comment)
     }
     const editComment = async (videoId,commentId, newComment)=>{
        return await videoService.editComment(videoId,commentId,newComment)
    }
    const deleteComment = async(videoId,commentId)=>{
        return await videoService.deleteComment(videoId,commentId)
    }
    const  getUsers = async()=> {
        try {
            const users = await User.find(); // שולף את כל המשתמשים
            return users;
        } catch (error) {
            console.error('שגיאה בלקיחת משתמשים:', error);
            return 0
        }
    }
    async function editUser(idUser, newUsername, newPassword, newProfilePicture) {
      try {
        // מציאת המשתמש הנוכחי
        const currentUser = await User.findOne({ id: idUser });
        if (!currentUser) {
          console.error("המשתמש לא נמצא");
          return null;  // משתמש לא נמצא
        }
    
        // אם המשתמש מנסה לעדכן את שם המשתמש, יש לבדוק אם שם המשתמש החדש כבר קיים
        if (newUsername && newUsername !== currentUser.username) {
          const existingUser = await User.findOne({ username: newUsername });
          if (existingUser) {
            console.error("שם המשתמש כבר קיים");
            return null;  // מחזיר שגיאה ייחודית למקרה ששם המשתמש כבר קיים
          }
        }
    
        // הכנת אובייקט עם השדות שנרצה לעדכן
        const updateFields = {};
    
        // עדכון השדות שנשלחו בלבד
        if (newUsername) updateFields.username = newUsername;
        if (newPassword) updateFields.password = newPassword;
        if (newProfilePicture) updateFields.profilePicture = newProfilePicture;
    
        // חיפוש ועדכון המשתמש במונגו לפי ה-id שלו
        const updatedUser = await User.findOneAndUpdate(
          { id: idUser }, // חיפוש המשתמש לפי מזהה
          updateFields,    // השדות שרוצים לעדכן
          { new: true }    // מחזיר את האובייקט המעודכן לאחר השינוי
        );
    
        if (updatedUser) {
          return updatedUser;  // מחזיר את האובייקט המעודכן
        } else {
          return null;  // לא נוצרו שינויים
        }
      } catch (error) {
        console.error('שגיאה בעדכון משתמש:', error);
        return null;  // מחזיר null במקרה של שגיאה
      }
    }
    
    const deleteUserById = async (id) => {
        try {
            const userid = parseInt(id)
            const user = await User.findOne({ id: userid });
            
            if (!user) {
                console.log('משתמש לא jjנמצא');
                return 0; // מחזיר 0 במקרה שהמשתמש לא נמצא
            }
    
            if (user.videos && user.videos.length > 0) {
                // מחיקת כל הסרטונים הקשורים למשתמש
                for (const videoId of user.videos) {
                    await videoService.deleteVideo(videoId); // הוספת await כדי להמתין לכל מחיקה
                }
            }
            videoService.updateCommments(user.username)
            videoService.updateLikes(user.username);
    
            // מחיקת המשתמש
            const result = await User.deleteOne({ id: id });
    
            return result.deletedCount > 0 ? 1 : 0;
        } catch (error) {
            console.error('שגיאה במחיקת משתמש:', error);
            return 0; // מחזיר 0 במקרה של שגיאה
        }
    };
    

    const getUsersVideo = async (id) => {
        try {
            // שלוף את המשתמש לפי מזהה
            const user = await User.findOne({id:id})
    
            if (!user) {
                console.error('משתמש לא נמצא');
                return []; // החזר מערך ריק אם המשתמש לא נמצא
            }
            // צור מערך חדש לאחסון סרטונים
        const videos = [];

        // עבור על כל מזהי הסרטונים של המשתמש
        for (const videoId of user.videos) {
            const video = await videoService.getVideoById(videoId); // קבל את פרטי הסרטון
            if (video) {
                videos.push(video); // הוסף את הסרטון למערך
            }
        }
    
            // החזר את הסרטונים של המשתמש
            return videos;
        } catch (error) {
            console.error('שגיאה בלקיחת סרטונים של משתמש:', error);
            return []; // החזר מערך ריק במקרה של שגיאה
        }
    };
    
    
    
      
export default {
    createUser,
    usernamePasswordAreExist,
    getUserById,
    addVideo,
    editVideo,
    deleteVideo,
    addComment,
    editComment,
    deleteComment,
    getUsers,
    editUser,
    deleteUserById,
    getUsersVideo
}