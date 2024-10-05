import Video from "../models/video.js"

// Creates a new video and saves it to the database
const createVideo = async (title, url, thumbnail, description, uploadBy, idUser) => {
    try {
      // Generate a new unique ID for the video
      const latestVideo = await Video.findOne().sort({ id: -1 }).exec(); // Find the latest video
      const videoid = latestVideo ? parseInt(latestVideo.id) + 1 : 1; // Set new ID
  
      // Create a new video object
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
        views: Math.floor(Math.random() * (1000000000 - 0 + 1)) + 0 // Generate random view count
      });
  
      // Save the new video to MongoDB
      await video.save();
      return video;
    } catch (err) {
      console.error("Error creating video:", err);
    }
};

// Retrieves a combined list of 10 most viewed videos and 10 random videos
const getCombinedVideoList = async () => {
    try {
      // Find the top 10 most viewed videos
      const topViewedVideos = await Video.find().sort({ views: -1 }).limit(10);
      
      // Find 10 random videos from the remaining ones
      const remainingVideos = await Video.find({ _id: { $nin: topViewedVideos.map(video => video._id) } });
      const shuffled = remainingVideos.sort(() => 0.5 - Math.random());
      const randomVideos = shuffled.slice(0, 10);
      
      // Return a shuffled combination of both lists
      return [...topViewedVideos, ...randomVideos].sort(() => 0.5 - Math.random());
    } catch (error) {
      console.error('Error adding default videos:', error);
    }
};

// Retrieves all videos from the database
const getVideos = async () => {
    const videos = await Video.find();
    return videos;
};

// Retrieves a video by its ID
const getVideoById = async (id) => {
    return await Video.findOne({ _id: id });
};

// Edits video information such as title, description, thumbnail, and URL
const editVideo = async (videoId, newTitle, newThumbnail, newVideo, newDescription) => {
  try {
    // Prepare fields to update
    const updateFields = {};

    // Update only the provided fields
    if (newTitle) updateFields.title = newTitle;
    if (newDescription) updateFields.description = newDescription;
    if (newThumbnail) updateFields.thumbnail = newThumbnail;
    if (newVideo) updateFields.url = newVideo;

    // Find and update the video by its ID
    const updatedVideo = await Video.findOneAndUpdate(
      { id: videoId }, // Find by ID
      updateFields,    // Fields to update
      { new: true }    // Return the updated object
    );
    
    
    if (updatedVideo) {
      return 1; // Video found and updated
    } else {
      return 404; // Video not found
    }
  } catch (err) {
    console.error("Error updating video:", err);
    return 0; // Error occurred
  }
};

// Deletes a video by its ID
const deleteVideo = async (id) => {
  try {
    // Find the video by its ID
    const video = await Video.findOne({ id: id });
    console.log(id);
    
    if (!video) {
      return 404; // Video doesn't exist
    }

    // Delete the video from the database
    await Video.deleteOne({ id: id });

    console.log("Video deleted successfully");
    return 1; // Deletion successful
  } catch (err) {
    console.error("Error deleting video:", err);
    return 500; // Error during deletion
  }
};

// Removes all comments by a specific username from all videos
const updateCommments = async (username) => {
  await Video.updateMany(
    { "comments.user": username }, // Find videos with comments by the user
    { $pull: { comments: { user: username } } } // Remove user's comments
  );
};

// Adds a comment to a video
const addComment = async (videoId, user, text) => {
  try {
    // Find the video by its ID
    const video = await Video.findOne({ id: videoId });
    
    if (!video) {
      console.log("Video not found");
      return 0; // No video found
    }

    // Calculate commentId
    const commentId = video.comments.length > 0 
      ? video.comments[video.comments.length - 1].id + 1 
      : 0;

    // Add the new comment
    video.comments.push({ id: commentId, user: user, text: text });

    // Save the updated video
    await video.save();

    console.log("Comment added successfully");
    return 1; // Success
  } catch (err) {
    console.error("Error adding comment:", err);
    return 500; // Error occurred
  }
};

// Edits an existing comment on a video
const editComment = async (videoId, commentId, newComment) => {
  try {
    // Find the video
    const video = await Video.findOne({ id: parseInt(videoId) });
    
    if (!video) {
      console.log("Video not found");
      return 0; // Video not found
    }

    // Find the specific comment
    const comment = video.comments.find(c => parseInt(c.id) === parseInt(commentId));
    
    if (!comment) {
      console.log("Comment not found");
      return 0; // Comment not found
    }

    // Update the comment text
    comment.text = newComment;

    // Save the updated video
    await video.save();

    console.log("Comment updated successfully");
    return 1; // Success
  } catch (err) {
    console.error("Error updating comment:", err);
    return 500; // Error occurred
  }
};

// Deletes a comment from a video by comment ID
const deleteComment = async (videoId, commentId) => {
  try {
    // Find the video
    const video = await Video.findOne({ id: parseInt(videoId) });

    if (!video) {
      console.log("Video not found");
      return 0; // Video not found
    }

    // Find the comment by index
    const commentIndex = video.comments.findIndex(c => parseInt(c.id) === parseInt(commentId));

    if (commentIndex === -1) {
      console.log("Comment not found");
      return 0; // Comment not found
    }

    // Remove the comment
    video.comments.splice(commentIndex, 1);

    // Save the updated video
    await video.save();

    console.log("Comment deleted successfully");
    return 1; // Success
  } catch (err) {
    console.error("Error deleting comment:", err);
    return 500; // Error occurred
  }
};

// Toggles like or dislike on a video for a user
const likeDislike = async (username, idVideo) => {
  try {
    // Find the video by its ID
    const video = await Video.findOne({ id: parseInt(idVideo) });

    if (!video) {
      console.log("Video not found");
      return 0; // Video not found
    }

    // Check if the user already likes the video
    const likeIndex = video.likes.indexOf(username);

    if (likeIndex !== -1) {
      // User already likes the video, remove them from likes
      video.likes.splice(likeIndex, 1);
    } else {
      // User doesn't like the video, add them to likes
      video.likes.push(username);
    }

    // Save the updated video
    await video.save();

    console.log("Like/Dislike updated successfully");
    return 1; // Success
  } catch (err) {
    console.error("Error updating like/dislike:", err);
    return 500; // Error occurred
  }
};

// Removes a user's likes from all videos
const updateLikes = async (username) => {
  await Video.updateMany(
    { "likes": username }, // Find videos with likes by the user
    { $pull: { likes: username } } // Remove user's likes
  );
};

// Completes the video list to 7 videos by adding random videos not in the given list
const completeVideoList = async (videoList) => {
  try {
    // Check if the number of videos in the list is less than 7
    if (videoList.length < 7) {
      // Find the IDs of videos already in the list
      const existingVideoIds = videoList.map(video => video._id);

      // Get random videos that are not in the list
      const remainingVideos = await Video.find({ _id: { $nin: existingVideoIds } });
      const shuffledVideos = remainingVideos.sort(() => 0.5 - Math.random());
      const additionalVideos = shuffledVideos.slice(0, 7 - videoList.length);

      // Add the additional videos to the original list
      videoList = [...videoList, ...additionalVideos];
    }

    return videoList;
  } catch (error) {
    console.error('Error completing video list:', error);
    return videoList; // Return the original list in case of error
  }
};
// Retrieves a video by its ID
const getVideoBy_Id = async (id) => {
  return await Video.findOne({ id: id });
};


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
  updateLikes,
  completeVideoList,
  getVideoBy_Id
};
