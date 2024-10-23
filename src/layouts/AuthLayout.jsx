import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
      <div className='flex flex-grow min-h-screen justify-center items-center'>
          <Outlet/>
    </div>
  )
}

export default AuthLayout