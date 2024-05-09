import { useAuth } from 'context/AuthContextProvider'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from 'services/auth'

export const Logout = () => {
  const auth = useAuth()
  const navigate = useNavigate();
  useEffect(()=>{
    (async function(){
      try{
        await logout()
        auth.logout();
        navigate('/');
      }catch(_){

      }
    })();
  }, [auth, navigate])
  return (
    <></>
  )
}
