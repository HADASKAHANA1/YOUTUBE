import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [users, setUsers] = useState([]);

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <UserContext.Provider value={{ users, addUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
