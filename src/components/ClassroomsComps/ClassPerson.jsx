import React from 'react'
import { FaPlus, FaUser } from 'react-icons/fa6'



const ClassPerson = ({itemName}) => {
    return (
        <>
        <div className='bg-white p-2 rounded-md border flex items-center justify-between w-full  gap-x-5'>
            <div className='flex items-center w-full gap-x-5 '>
                <img src="https:randomuser.me/api/portraits/women/5.jpg" className='w-10 h-10 bg-zinc-50 rounded-full border'/>
            <div className='flex flex-col gap-y-1'>
                <span>{ itemName}</span>
            </div>
            
            </div>
                <div className=' p-1.5 text-green-500 border border-green-500 rounded-full hover:ring-2 ring-offset-1 ring-green-500 cursor-pointer transition-all'>
                <FaPlus/>
                </div>
                
        </div>

        </>
        
    )
}

export default ClassPerson