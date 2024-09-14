import React from 'react'
import { FaUsers } from 'react-icons/fa6'



const ClassItem = () => {
    return (
        <div className='flex px-2 py-4 bg-zinc-300 hover:bg-zinc-400 rounded-md items-center justify-center gap-3 '>
            <div className="leftSide flex items-center justify-start gap-3 w-2/3">
                <FaUsers className='text-3xl' />
                <h2>ClassName</h2>
            </div>
            <div className="rightSide flex gap-3 w-1/3">
                <button className='rounded p-2 w-full bg- bg-red-500 hover:bg-red-600'>Sil</button>
                <button className='rounded p-2 w-full bg-yellow-400 hover:bg-yellow-600'>Düzenle</button>
            </div>
        </div>

    )
}

export default ClassItem