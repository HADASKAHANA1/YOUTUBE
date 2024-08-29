import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

// const defaultVideos = [
//   { id: '1', title: 'Video 1', url: '/videos/video 1.mp4', thumbnail: '/thumbnails/1.png', description: 'Description for Video 1', uploadedBy: 'User 1', comments: [], likes: [] ,views:0},
//   { id: '2', title: 'Video 2', url: '/videos/video 2.mp4', thumbnail: '/thumbnails/2.png', description: 'Description for Video 2', uploadedBy: 'User 2', comments: [], likes: [] ,views:892},
//   { id: '3', title: 'Video 3', url: '/videos/video 3.mp4', thumbnail: '/thumbnails/3.png', description: 'Description for Video 3', uploadedBy: 'User 3', comments: [], likes: [] ,views:46},
//   { id: '4', title: 'Video 4', url: '/videos/video 4.mp4', thumbnail: '/thumbnails/4.png', description: 'Description for Video 4', uploadedBy: 'User 4', comments: [], likes: [] ,views:998},
//   { id: '5', title: 'Video 5', url: '/videos/video 5.mp4', thumbnail: '/thumbnails/5.png', description: 'Description for Video 5', uploadedBy: 'User 5', comments: [], likes: [] ,views:34},
//   { id: '6', title: 'Video 6', url: '/videos/video 6.mp4', thumbnail: '/thumbnails/6.png', description: 'Description for Video 6', uploadedBy: 'User 6', comments: [], likes: [] ,views:10000},
//   { id: '7', title: 'Video 7', url: '/videos/video 7.mp4', thumbnail: '/thumbnails/7.png', description: 'Description for Video 7', uploadedBy: 'User 7', comments: [], likes: [] ,views:1345},
//   { id: '8', title: 'Video 8', url: '/videos/video 8.mp4', thumbnail: '/thumbnails/8.png', description: 'Description for Video 8', uploadedBy: 'User 8', comments: [], likes: [] ,views:666},
//   { id: '9', title: 'Video 9', url: '/videos/video 9.mp4', thumbnail: '/thumbnails/9.png', description: 'Description for Video 9', uploadedBy: 'User 9', comments: [], likes: [] ,views:40},
//   { id: '10', title: 'Video 10', url: '/videos/video 10.mp4', thumbnail: '/thumbnails/10.png', description: 'Description for Video 10', uploadedBy: 'User 10', comments: [], likes: [] ,views:110}
// ];



const UserContextProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // useEffect(() => {
  //   setVideos(defaultVideos);
  // }, []);

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const login = (currentuser) => {
    setCurrentUser(currentuser);
  };

  const logout = () => {
    setCurrentUser(null);
  };
  const addVideo = () =>{
    const newVideosList = [...videos,   { id: videos[videos.length-1].id+1, title: 'Video 1', url: '/videos/video 1.mp4', thumbnail: '/thumbnails/1.png', description: 'Description for Video 1', uploadedBy: 'User 1', comments: [], likes: [] ,views:0}  ];
    setVideos(newVideosList)
  }
  // (newVideo, uploader) => {
  //   if (!uploader || !uploader.username) return;
    
  //   newVideo.id = Math.random().toString(36).substr(2, 9);
  //   newVideo.uploadedBy = uploader.username;
    
  //   newVideo.comments = [];
  //   newVideo.likes = newVideo.likes || [];
  //   setVideos([...videos, newVideo]);
  
  //   if (currentUser && currentUser.videos) {
  //     setCurrentUser({
  //       ...currentUser,
  //       videos: [...currentUser.videos, newVideo.id]
  //     });
  //   }
  //};




const editVideo = (updatedVideo) => {
  // Ensure the likes array exists
  updatedVideo.likes = updatedVideo.likes || [];

  // Filter out the video to be replaced
  const filteredVideos = videos.filter((video) => video.id !== updatedVideo.id);

  // Add the updated video
  const newVideosList = [...filteredVideos, updatedVideo];

  // Update the state with the new list of videos
  setVideos(newVideosList);
};


  

  const deleteVideo = (videoId) => {
    setVideos(videos.filter((video) => video.id !== videoId));
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        videos: currentUser.videos.filter((id) => id !== videoId)
      });
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addComment = (videoId, comment) => {
    setVideos(videos.map((video) =>
      video.id === videoId
        ? { ...video, comments: [...video.comments, comment] }
        : video
    ));
  };

  const deleteComment = (videoId, commentIndex) => {
    setVideos(videos.map((video) =>
      video.id === videoId
        ? { ...video, comments: video.comments.filter((_, index) => index !== commentIndex) }
        : video
    ));
  };

  const editComment = (videoId, commentIndex, newText) => {
    setVideos(videos.map((video) =>
      video.id === videoId
        ? { 
            ...video, 
            comments: video.comments.map((comment, index) => 
              index === commentIndex ? { ...comment, text: newText } : comment 
            ) 
          }
        : video
    ));
  };

  const likeVideo = (videoId) => {
    if (!currentUser) return;
    
    setVideos(videos.map((video) =>
      video.id === videoId
        ? { ...video, likes: [...(video.likes || []), currentUser.username] }
        : video
    ));
  };
  
  const unlikeVideo = (videoId) => {
    if (!currentUser) return;
    
    setVideos(videos.map((video) =>
      video.id === videoId
        ? { ...video, likes: video.likes.filter((username) => username !== currentUser.username) }
        : video
    ));
  };

  return (
    <UserContext.Provider value={{ setVideos, users, addUser, login, logout, currentUser, setCurrentUser, videos, addVideo, editVideo, deleteVideo, darkMode, toggleDarkMode, addComment, deleteComment, editComment, likeVideo, unlikeVideo }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
