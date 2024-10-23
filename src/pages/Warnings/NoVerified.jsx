import React from 'react'

const NoVerified = () => {
  return (
    <div className='flex flex-grow  items-center justify-center'>
      <div className='flex flex-col gap-y-4 items-center'>
        <h1 className='text-4xl font-bold text-red-500'>Hesabınız Onaylanmamış</h1>
        <p className='text-gray-500'>Hesabınızın onaylanması için yöneticiniz ile iletişime geçiniz.</p>
      </div>
    </div>
  )
}

export default NoVerified