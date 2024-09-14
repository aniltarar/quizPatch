import React from 'react'
import { FaPlus, FaUser } from 'react-icons/fa6'



const ClassPerson = ({itemName}) => {
    return (
        <div className='flex flex-col  gap-3 px-2 py-3 bg-zinc-300 rounded-xl hover:bg-zinc-400 transition-all'>
            <span className='flex items-center justify-center  gap-3'><FaUser />{itemName}</span>
            <button className='flex p-2 items-center justify-center rounded-xl bg-lime-400 hover:bg-lime-500'><FaPlus /> <small>Ekle</small></button>
        </div>
    )
}

export default ClassPerson