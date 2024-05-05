import React from 'react'

const BaseBackground = ({children}) => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-slate-300'>
      {children}
    </div>
  )
}

export default BaseBackground
