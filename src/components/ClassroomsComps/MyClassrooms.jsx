import React from 'react'
import ClassItem from './ClassItem'

const MyClassrooms = () => {
  return (
    <div className='w-100 rounded-xl bg-zinc-100  p-3 mx-3'>
        <h1 className='text-center text-2xl'>Mevcut Sınıflarım</h1>
        <div className="classroomsGrid grid gap-3 grid-flow-row p-">

        <ClassItem/>
        <ClassItem/>
        <ClassItem/>
        <ClassItem/>
        </div>
    </div>
  )
}

export default MyClassrooms