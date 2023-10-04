import React, { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext(null)

const UserProvider = ({children}) => {
  const path = window.location.pathname;
  const id = path.split('/')[1];

  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/auth/${id}`);
        const data = res.data;
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }
  , [id]);
    
  return <UserContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated}}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext)

export default UserProvider