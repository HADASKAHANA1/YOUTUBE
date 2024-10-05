import User from "../models/users.js"
import { v4 as uuidv4 } from 'uuid'
import videoService from '../services/videos.js'



const getUserByUserName = async(username)=>{
    try {
        // Find user by username
        const user = await User.findOne({ username: username}); 
    
        if (!user) {
          return null;
        }
    
        return user
      } catch (err) {
        return null
      }
}

const createUser = async(username, password, profilePicture)=>{
    const lastUser = await User.findOne().sort({ _id: -1 }); // Sort by createdAt from newest to oldest
    let userId;
  
    if(!lastUser){
    userId = 0
  }
  else{
     userId = lastUser.id+1
  }
    if(!(await getUserByUserName(username))){
        // Create and save a new user
        const newUser = new User({id: userId, username: username, password: password, profilePicture: profilePicture, videos: []});
        await newUser.save();
        return 1;
    }
    return 0
}

const usernamePasswordAreExist = async(username, password) =>{
    try {
      // Check if a user exists with the given username and password
      const user = await User.findOne({ username: username, password: password });
  
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
        // Find user by ID
        const userId = parseInt(id);
        const user = await User.findOne({ id: userId });
        if (!user) {
          return null;
        }
    
        return user
    } catch (err) {
        console.error('Error finding user:', err);
    }
}

const addVideo = async (idUser, title, url, thumbnail, description) => {
    try {
        // Find the user by ID and add a new video
        const user = await getUserById(idUser);
      
        if (!user) {
            console.error("User not found");
            return null;
        }
      
        // Create a new video
        const newVideo = await videoService.createVideo(
            title,
            url,
            thumbnail,
            description,
            user.username,
            idUser
        );
      
        // Add the new video's ID to the user's video list
        user.videos.push(newVideo.id);
        await user.save();
      
        return newVideo;
    } catch (err) {
        console.error("Error adding video:", err);
    }
}

const editVideo = async(videoId, newTitle, newVideo, newThumbnail, newDescription) => {
    // Edit the details of an existing video
    return await videoService.editVideo(videoId, newTitle, newThumbnail, newVideo, newDescription);
}

const deleteVideo = async (userId, videoId) => {
    try {
        // Find the user by ID
        const user = await User.findOne({ id: userId });
        
        if (!user) {
            console.log("User not found");
            return 400; // User not found
        }
    
        // Delete the video from the database
        const ret = await videoService.deleteVideo(videoId);
        if(ret == 1){
            // Remove the video's ID from the user's video list
            user.videos = user.videos.filter(video => video !== videoId);
            await user.save();
      
            console.log("Video deleted successfully");
            return 1; // Deletion successful
        }
        return ret;
    } catch (err) {
        console.error("Error deleting video:", err);
        return 500; // Error during deletion
    }
}

const addComment = async(videoId, user, comment) => {
    // Add a comment to a video
    return await videoService.addComment(videoId, user, comment);
}


const getVideoById = async(videoId) => {
    return await videoService.getVideoById(videoId);
}

const editComment = async(videoId, commentId, newComment) => {
    // Edit an existing comment
    return await videoService.editComment(videoId, commentId, newComment);
}

const deleteComment = async(videoId, commentId) => {
    // Delete a comment from a video
    return await videoService.deleteComment(videoId, commentId);
}

const getUsers = async() => {
    try {
        // Fetch all users
        const users = await User.find();
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
}

async function editUser(idUser, newPassword, newProfilePicture) {
    try {
     
        // Find the user and update their details
        const currentUser = await User.findOne({ id: idUser });
        if (!currentUser) {
            console.error("User not found");
            return null;
        }
    
        // Prepare fields to update
        const updateFields = {};
        if (newPassword) updateFields.password = newPassword;
        if (newProfilePicture) updateFields.profilePicture = newProfilePicture;
    
        // Update the user in MongoDB
        const updatedUser = await User.findOneAndUpdate(
            { id: idUser }, // Find user by ID
            updateFields,   // Fields to update
            { new: true }   // Return the updated object
        );
    
        return updatedUser ? updatedUser : null; // Return updated user or null
    } catch (error) {
        console.error('Error updating user:', error);
        return null; // Return null in case of an error
    }
}

const deleteUserById = async (id) => {
    try {
        // Find and delete the user by ID
        const userid = parseInt(id);
        const user = await User.findOne({ id: userid });
        
        if (!user) {
            console.log('User not found');
            return 0; // Return 0 if user is not found
        }

        if (user.videos && user.videos.length > 0) {
            // Delete all videos associated with the user
            for (const videoId of user.videos) {
                console.log(videoId);
                await videoService.deleteVideo(videoId); // Await each deletion
            }
        }
        videoService.updateCommments(user.username);
        videoService.updateLikes(user.username);

        // Delete the user
        const result = await User.deleteOne({ id: id });
    
        return result.deletedCount > 0 ? 1 : 0;
    } catch (error) {
        console.error('Error deleting user:', error);
        return 0; // Return 0 in case of an error
    }
}

const getUsersVideo = async (id) => {
    try {
        // Fetch the user's videos by ID
        const user = await User.findOne({id:id});
    
        if (!user) {
            console.error('User not found');
            return []; // Return an empty array if user is not found
        }
        
        // Create an array to store videos
        const videos = [];
        for (const videoId of user.videos) {
            const video = await videoService.getVideoBy_Id(videoId); // Get video details
            if (video) {
                videos.push(video); // Add video to the array
            }
        }
    
        return videos; // Return the user's videos
    } catch (error) {
        console.error('Error fetching user videos:', error);
        return []; // Return an empty array in case of an error
    }
}



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
    getUsersVideo,
    getVideoById,
   
}
