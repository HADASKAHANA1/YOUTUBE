import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const defaultVideos = [
  { id: '1', title: 'Video 1', url: '/videos/video 1.mp4', thumbnail: '/thumbnails/1.png', description: 'Description for Video 1', uploadedBy: 'User 1' },
  { id: '2', title: 'Video 2', url: '/videos/video 2.mp4', thumbnail: '/thumbnails/2.png', description: 'Description for Video 2', uploadedBy: 'User 2' },
  { id: '3', title: 'Video 3', url: '/videos/video 3.mp4', thumbnail: '/thumbnails/3.png', description: 'Description for Video 3', uploadedBy: 'User 3' },
  { id: '4', title: 'Video 4', url: '/videos/video 4.mp4', thumbnail: '/thumbnails/4.png', description: 'Description for Video 4', uploadedBy: 'User 4' },
  { id: '5', title: 'Video 5', url: '/videos/video 5.mp4', thumbnail: '/thumbnails/5.png', description: 'Description for Video 5', uploadedBy: 'User 5' },
  { id: '6', title: 'Video 6', url: '/videos/video 6.mp4', thumbnail: '/thumbnails/6.png', description: 'Description for Video 6', uploadedBy: 'User 6' },
  { id: '7', title: 'Video 7', url: '/videos/video 7.mp4', thumbnail: '/thumbnails/7.png', description: 'Description for Video 7', uploadedBy: 'User 7' },
  { id: '8', title: 'Video 8', url: '/videos/video 8.mp4', thumbnail: '/thumbnails/8.png', description: 'Description for Video 8', uploadedBy: 'User 8' },
  { id: '9', title: 'Video 9', url: '/videos/video 9.mp4', thumbnail: '/thumbnails/9.png', description: 'Description for Video 9', uploadedBy: 'User 9' },
  { id: '10', title: 'Video 10', url: '/videos/video 10.mp4', thumbnail: '/thumbnails/10.png', description: 'Description for Video 10', uploadedBy: 'User 10' }
];

const UserContextProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setVideos(defaultVideos);
  }, []);

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const login = (username) => {
    const user = users.find(user => user.username === username);
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addVideo = (newVideo, uploader) => {
    newVideo.id = Math.random().toString(36).substr(2, 9);
    newVideo.uploadedBy = uploader.username; // Set uploadedBy field to uploader's username
    setVideos([...videos, newVideo]);

    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        videos: [...currentUser.videos, newVideo.id]
      });
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const editVideo = (updatedVideo) => {
    setVideos(videos.map((video) => (video.id === updatedVideo.id ? updatedVideo : video)));
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
  
  return (
    <UserContext.Provider value={{ users, addUser, login, logout, currentUser, setCurrentUser, videos, addVideo, editVideo, deleteVideo, darkMode, toggleDarkMode }}>
      {props.children}
    </UserContext.Provider>
  );
  
};

export default UserContextProvider;
