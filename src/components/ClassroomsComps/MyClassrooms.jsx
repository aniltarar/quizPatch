import React from 'react'
import ClassItem from './ClassItem'

const MyClassrooms = () => {
  return (
    <div className='w-full h-full'>
        <div className=" grid grid-cols-1 gap-5">
        <ClassItem/>
        <ClassItem/>
        <ClassItem/>
        <ClassItem/>
        <ClassItem/>
        <ClassItem/>
        </div>
    </div>
  )
}

export default MyClassrooms