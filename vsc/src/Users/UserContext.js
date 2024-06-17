import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [videos, setVideos] = useState([]);

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
    setVideos([...videos, newVideo]);
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        videos: [...currentUser.videos, newVideo]
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
