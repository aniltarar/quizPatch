import React from 'react'
import { FaPlus, FaUser } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux';


const ClassPerson = ({ teacher, setSelectedTeacher }) => {


    return (
        <>
            <div className='bg-white p-2 rounded-md border flex items-center justify-between w-full  gap-x-5'>
                <div className='flex items-center w-full gap-x-5 '>
                    <div className='bg-zinc-300 rounded-full border p-4' />
                    <div className='flex flex-col gap-y-1'>
                        {teacher?.displayName}
                    </div>
                </div>
                <button type='button' onClick={() => setSelectedTeacher(prevState => [...prevState, teacher])} className=' p-1.5 text-green-500 border border-green-500 rounded-full hover:ring-2 ring-offset-1 ring-green-500 cursor-pointer transition-all'>
                    <FaPlus />
                </button>
            </div>
        </>

    )
}

export default ClassPerson