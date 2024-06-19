import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const defaultVideos = [
  { id: '1', title: 'Video 1', url: '/videos/video 1.mp4', thumbnail: '/thumbnails/1.png', description: 'Description for Video 1' },
  { id: '2', title: 'Video 2', url: '/videos/video 2.mp4', thumbnail: '/thumbnails/2.png', description: 'Description for Video 2' },
  { id: '3', title: 'Video 3', url: '/videos/video 3.mp4', thumbnail: '/thumbnails/3.png', description: 'Description for Video 3' },
  { id: '4', title: 'Video 4', url: '/videos/video 4.mp4', thumbnail: '/thumbnails/4.png', description: 'Description for Video 4' },
  { id: '5', title: 'Video 5', url: '/videos/video 5.mp4', thumbnail: '/thumbnails/5.png', description: 'Description for Video 5' },
  { id: '6', title: 'Video 6', url: '/videos/video 6.mp4', thumbnail: '/thumbnails/6.png', description: 'Description for Video 6' },
  { id: '7', title: 'Video 7', url: '/videos/video 7.mp4', thumbnail: '/thumbnails/7.png', description: 'Description for Video 7' },
  { id: '8', title: 'Video 8', url: '/videos/video 8.mp4', thumbnail: '/thumbnails/8.png', description: 'Description for Video 8' },
  { id: '9', title: 'Video 9', url: '/videos/video 9.mp4', thumbnail: '/thumbnails/9.png', description: 'Description for Video 9' },
  { id: '10', title: 'Video 10', url: '/videos/video 10.mp4', thumbnail: '/thumbnails/10.png', description: 'Description for Video 10' }
];

const UserContextProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Load default videos on initial render
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

  const addVideo = (newVideo) => {
    newVideo.id = Math.random().toString(36).substr(2, 9); // Generate random id
    setVideos([...videos, newVideo]);
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        videos: [...currentUser.videos, newVideo.id]
      });
    }
  };

  return (
    <UserContext.Provider value={{ users, addUser, login, logout, currentUser, videos, addVideo }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
