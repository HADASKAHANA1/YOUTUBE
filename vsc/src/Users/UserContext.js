import React, { createContext, useState} from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);




  const login = (currentuser) => {
    setCurrentUser(currentuser);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };



  return (
    <UserContext.Provider value={{   login, logout, currentUser, setCurrentUser, darkMode, toggleDarkMode}}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
