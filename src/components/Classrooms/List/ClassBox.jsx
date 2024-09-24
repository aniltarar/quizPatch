import React from 'react'
import { MdOutlineClass ,MdDeleteOutline} from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { deleteClassroomByID, getClassromByUserID } from '~/redux/slices/classSlice'

const ClassBox = ({classroom}) => {



    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)

    const deleteClass = (id) => {
        dispatch(deleteClassroomByID(id))
        dispatch(getClassromByUserID(user.uid))
    }


  return (
    <div className='border p-4 flex justify-between items-center'>
       <span> {classroom.className} Sınıfı</span>
       <div className='flex gap-x-2'>
        <button onClick={() => deleteClass(classroom.id)} className='p-2 rounded-md bg-black text-white text-lg border '>
            <MdDeleteOutline/>
        </button>
        <button className='p-2 rounded-md bg-black text-white text-lg border '>
            <MdOutlineClass/>
        </button>
       </div>
    </div>
  )
}

export default ClassBox