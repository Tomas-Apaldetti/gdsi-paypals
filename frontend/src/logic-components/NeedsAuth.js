import { useAuth } from 'context/AuthContextProvider'
import React from 'react'
import { createSearchParams, Navigate} from 'react-router-dom';
import { fullHref } from 'utils/href';

export const NeedsAuth = ({redirect, children}) => {
  const auth = useAuth();
  const current = fullHref();
  if(!auth.isAuth){
    return <Navigate to={`${redirect}?${createSearchParams({back_to: current}).toString()}`} />
  }
  return <>{children}</>
}
