import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';


const AuthContext = createContext();

export const AuthProvider = ({children}) => {

  const [isAuth, setIsAuth] = useState(false);


  useEffect(() => {
    // Check if user is authenticated using cookies
    const token = Cookies.get('token');
    if (token) {
      setIsAuth(true);
    }
  }, []);

  const login = (token) => {
    setIsAuth(true);
    Cookies.set('token', token, { expires: 7 });
  };

  const logout = () => {
    setIsAuth(false);
    Cookies.remove('token');
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
