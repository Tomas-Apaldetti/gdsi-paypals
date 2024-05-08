import { useAuth } from 'context/AuthContextProvider'
import React from 'react'
import { Navigate } from 'react-router-dom';

export const NeedsAuth = ({redirect, element, children}) => {
  const auth = useAuth();
  console.log(auth)
  if(!auth.isAuth){
    return <Navigate to={redirect} />
  }
  return <>{children}</>
}
