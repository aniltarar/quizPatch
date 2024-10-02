import React from 'react'

const ExamBox = () => {
  return (
    <div className='bg-white p-2 rounded-md'>
        <div className='flex justify-between items-center'>
            <h1 className='font-semibold text-lg'>Sınav Adı</h1>
            <div className='flex gap-x-2'>
            <button className='bg-blue-500 text-white px-2 py-1 rounded-md'>Düzenle</button>
            <button className='bg-red-500 text-white px-2 py-1 rounded-md'>Sil</button>
            </div>
        </div>
        <div className='flex gap-x-2 mt-2'>
            <div className='flex gap-x-2'>
            <p className='font-semibold'>Süre:</p>
            <p>60 dk</p>
            </div>
            <div className='flex gap-x-2'>
            <p className='font-semibold'>Soru Sayısı:</p>
            <p>10</p>
            </div>
            <div className='flex gap-x-2'>
            <p className='font-semibold'>Sınıf:</p>
            <p>Coğrafya</p>
            </div>
        </div>
    </div>
  )
}

export default ExamBox