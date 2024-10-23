import React from 'react'
import { MdOutlineClass, MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteClassroomByID, getClassromByUserID } from '~/redux/slices/classSlice'

const ClassBox = ({ classroom }) => {



  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)

const deleteClass = (id) => {
  if (confirm("Silmek istiyor musunuz?")) {
    dispatch(deleteClassroomByID(id)); // Kullanıcı onayladıysa silme işlemi yapılır.
  }
  dispatch(getClassromByUserID(user.uid)); // Her durumda sınıf listesini güncellemek için.
};


  return (
    <div className='border p-4 flex justify-between items-center'>
      <span className='font-semibold text-lg'> {classroom.className} </span>
      <div className='flex gap-x-2 items-center'>
        <button onClick={() => deleteClass(classroom.id)} className='px-4 py-1 rounded-md bg-red-500  hover:bg-red-600 text-white  border  flex items-center gap-x-1'>
          <span className='text-lg'><MdDeleteOutline /></span> <span> Sil</span>
        </button>
        <Link to={`/classroom-detail/${classroom.id}`} className='px-4 py-1 rounded-md bg-yellow-500 hover:bg-yellow-600  text-white  border  flex items-center gap-x-1'>
          <span className='text-lg'><MdOutlineClass /></span> <span>Düzenle</span>
        </Link>
      </div>
    </div>
  )
}

export default ClassBox