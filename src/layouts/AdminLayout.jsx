import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
      <div className='flex flex-row items-start justify-start min-h-screen flex-grow'>
          <span>sidebar</span>
          <Outlet/>
    </div>
  )
}

export default AdminLayout