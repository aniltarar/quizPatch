import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllStudents } from '~/redux/slices/studentSlice';
import { getAllTeachers } from '~/redux/slices/teacherSlice';
import { getAllClasrooms } from '~/redux/slices/classSlice';
import { getAllExams } from '~/redux/slices/examSlice';
import { getAllFeedbacks } from '~/redux/slices/feedbackSlice';
const Admin = () => {


  // getAllTeachers, getAllStudents, getAllClasrooms, getAllExams

  const dispatch = useDispatch();
  const { allExams } = useSelector(state => state.exam)
  const { teachers } = useSelector(state => state.teacher)
  const { students } = useSelector(state => state.student)
  const { allClassrooms } = useSelector(state => state.classrooms)
  const { feedbacks } = useSelector(state => state.feedback)

  useEffect(() => {
    dispatch(getAllTeachers())
    dispatch(getAllStudents())
    dispatch(getAllClasrooms())
    dispatch(getAllExams())
    dispatch(getAllFeedbacks())
  }, [])
  

  // Ana Panel'de gösterilecekler. Tüm Öğrenci Sayısı, Tüm Öğretmen Sayısı, Tüm Sınıf Sayısı
  return (
    <div>
      <div className='grid grid-cols-3 gap-5'>
        <div className='p-4 bg-white border rounded-md shadow-lg overflow-hidden relative'>
          <p className='text-[200px] text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-violet-500'>{students?.length}</p>
          <p className='w-full flex justify-center items-center text-zinc-600 text-2xl font-semibold'>Öğrenci Sayısı</p>
        </div>
        <div className='p-4 bg-white border rounded-md shadow-lg'>
          <p className='text-[200px] text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-violet-500'>{teachers?.length}</p>
          <p className='w-full flex justify-center items-center text-zinc-600 text-2xl font-semibold'>Öğretmen Sayısı</p>
        </div>
        <div className='p-4 bg-white border rounded-md shadow-lg'>
          <p className='text-[200px] text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-violet-500'>{allClassrooms?.length}</p>
          <p className='w-full flex justify-center items-center text-zinc-600 text-2xl font-semibold'>Sınıf Sayısı</p>
        </div>
          <div className='p-4 bg-white border rounded-md shadow-lg'>
          <p className='text-[200px] text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-violet-500'>{feedbacks?.length}</p>
          <p className='w-full flex justify-center items-center text-zinc-600 text-2xl font-semibold'>Geribildirim Sayısı</p>
        </div>
      </div>
    </div>
  )
}

export default Admin