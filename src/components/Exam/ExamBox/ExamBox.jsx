import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteExamByID, getMyExamsForTeacher } from '~/redux/slices/examSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ExamBox = ({exam}) => {

  const {examName,examTime,questions,classroomID,className,examID} = exam;
  const {user} = useSelector(state => state.user)

  const dispatch = useDispatch()

  const confirmDelete = () => {
    const confirm = window.confirm('Bu sınavı silmek istediğinize emin misiniz?')
    try{
      if(confirm){
        dispatch(deleteExamByID(examID))
        dispatch(getMyExamsForTeacher(user.uid))
        toast.success('Sınav başarıyla silindi.') 
    }
  }
    catch(error){

      console.log(error.message)
      toast.error('Sınav silinirken bir hata oluştu.')
  
    }
  }
  return (
    <div className='bg-white p-2 rounded-md w-full'>
        <div className='flex justify-between items-center'>
            <h1 className='font-semibold text-lg'>Sınav Bilgisi: {examName}</h1>
            <div className='flex gap-x-2 items-center justify-center'>
            <Link to={ `/exam-detail/${examID}`} className='bg-blue-500 text-white px-2 py-1 rounded-md' >Detay</Link>
            <button className='bg-red-500 text-white px-2 py-1 rounded-md' onClick={confirmDelete} >Sil</button>
            </div>
        </div>
        <div className='flex gap-x-2 mt-2'>
            <div className='flex gap-x-2'>
            <p className='font-semibold'>Süre: {examTime} Dakika</p>
            </div>
            
            <div className='flex gap-x-2'>
            <p className='font-semibold'>Soru Sayısı: {questions.length}</p>
            </div>
            <div className='flex gap-x-2'>
            <p className='font-semibold'>Sınıf: {className}</p>
            </div>
            
        </div>
    </div>
  )
}

export default ExamBox