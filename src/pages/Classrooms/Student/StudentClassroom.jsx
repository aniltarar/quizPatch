import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getClassroomByUserIDStudent } from '~/redux/slices/classSlice'

const StudentClassroom = () => {

  const dispatch = useDispatch()

  const { user } = useSelector(state => state.user)
  const { userClassrooms } = useSelector(state => state.classrooms)

  useEffect(() => {
    dispatch(getClassroomByUserIDStudent(user.uid))
  }, [])

  return (
    <div className='w-full flex flex-grow bg-[#f9f9f9] justify-start items-start p-12 flex-col'>
      <span className='font-semibold text-3xl'>Ait Olduğum Sınıflar</span>
      <div className=" w-full grid grid-cols-4 gap-5">
        {
          userClassrooms.length > 0 ? userClassrooms.map((classroom) => (
            <Link key={classroom.id} to={`/student-classroom-detail/${classroom.id}`} className='w-full bg-white p-5  rounded-md shadow-md my-5' >
              <span className='text-xl font-semibold'>{classroom.className}</span>
              <span className='text-lg'>{classroom.classDescription}</span>
            </Link>
          )) : <p className='text-center'>Henüz bir sınıfa katılmadınız.</p>
        }
      </div>
    </div>
  )
}

export default StudentClassroom