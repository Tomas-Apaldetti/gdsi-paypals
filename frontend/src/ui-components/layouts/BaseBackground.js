import React from 'react'

const BaseBackground = ({children}) => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-100 to-slate-400'>
      <img src='logo.png' width="200" style={{ marginBottom: '30px', marginTop: '20px' }} alt="PayPals"></img>      
      {children}
    </div>
  )
}

export default BaseBackground
