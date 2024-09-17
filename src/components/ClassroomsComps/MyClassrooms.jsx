import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getClassrooms } from '~/redux/slices/classSlice'
import { FaUsers } from 'react-icons/fa6'
import ClassItem from './ClassItem'

const MyClassrooms = () => {

  
  const {user} = useSelector(state => state.user)
  const dispatch = useDispatch();

  


  useEffect(()=>{
    dispatch(getClassrooms())
  },[])


  return (
    <div className='w-full h-full'>
        <div className=" grid grid-cols-1 gap-y-5 rounded-xl">
          {user.classrooms?.map((classroom,i) => (
            <ClassItem  key={i} classroom={classroom}/>
          ))}
        </div>
    </div>
  )
}

export default MyClassrooms