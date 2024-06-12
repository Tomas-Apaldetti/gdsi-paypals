import React from 'react'
import Navbar from './Navbar/Navbar'
import { NotificationProvider } from 'context/NotificationContextProvider'

export const NavbarFooterLayout = ({children}) => {
  return (
    <NotificationProvider>
    <div className='min-h-screen bg-slate-300 flex flex-col items-center bg-gradient-to-b from-slate-100 to-slate-400'>
      <Navbar />
      <div className='h-screen w-full lg:w-11/12 2xl:w-4/5 bg-slate-50 shadow-lg'>
        {children}
      </div>
      <footer className='z-20 min-h-12 w-full bg-slate-800 flex flex-col justify-center'>
        <p className='text-lg uppercase font-semibold tracking-wider text-slate-50 px-6 py-2'></p>
      </footer>
    </div>
  </NotificationProvider>
  )
}
