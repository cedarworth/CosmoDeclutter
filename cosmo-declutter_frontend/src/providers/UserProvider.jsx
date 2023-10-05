import React, { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext(null)

const UserProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const isAuthenticated = user !== null;

  useEffect(() => {
    const token = localStorage.getItem('cosmo-token')??'';
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/auth/user`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = res.data;
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }
  , []);
    
  return <UserContext.Provider value={{user, setUser, isAuthenticated}}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext)

export default UserProvider