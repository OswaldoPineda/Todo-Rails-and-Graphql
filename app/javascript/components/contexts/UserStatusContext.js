import React, { useEffect, createContext, useContext, useState } from 'react';

export const UserContext = createContext();

export const UseUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [userStatus, setUserStatus] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const user = window.localStorage.getItem('userData');
    if (user) {
      setUserStatus(true);
      const getUserData = window.localStorage.getItem('userData');
      setUserData(JSON.parse(getUserData));
    }
  }, [userStatus]);

  return(
    <UserContext.Provider
    value={{ userStatus, setUserStatus, userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
