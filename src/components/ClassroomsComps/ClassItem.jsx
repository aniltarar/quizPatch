import React from 'react'
import { FaUsers } from 'react-icons/fa6'



const ClassItem = () => {
    return (
        <div className='flex px-2 py-4 bg-zinc-50 hover:bg-zinc-100 transition-colors border rounded-md items-center justify-center gap-3 '>
            <div className="flex items-center justify-between gap-x-2 w-full px-5">
                <div className='flex items-center gap-x-3' >
                    <FaUsers size={20} />
                <h2>Matematik</h2>
                </div>
                <button className='bg-sky-100 text-sky-500 px-4 py-2 rounded-md cursor-pointer hover:bg-sky-500 hover:text-white hover:scale-105'>Sınıfa Git</button>
            </div>
        </div>

    )
}

export default ClassItem