import React, { createContext, useEffect, useState } from 'react';
import { authCookie, purge, refreshCookie } from 'utils/auth';


const AuthContext = createContext();

export const AuthProvider = ({children}) => {

  const [isAuth, setIsAuth] = useState(!!authCookie());


  useEffect(() => {
    const token = authCookie();
    if (token) {
      setIsAuth(true);
    }
  }, []);

  const login = ({access, refresh}) => {
    authCookie(access.token, new Date(access.expires));
    refreshCookie(refresh.token, new Date(refresh.expires));
    setIsAuth(true);
  };

  const logout = () => {
    purge();
    setIsAuth(false);
  };

  const authContextValue = {
    isAuth,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
