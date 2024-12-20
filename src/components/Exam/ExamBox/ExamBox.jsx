import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteExamByID, getMyExamsForTeacher } from '~/redux/slices/examSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaClock } from 'react-icons/fa6';
import { arrayRemove, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '~/firebase/firebaseConfig';

const ExamBox = ({exam}) => {

  const {examName,examTime,questions,classroomID,className,examID} = exam;
  const {user} = useSelector(state => state.user)

  const dispatch = useDispatch()

  const confirmDelete = async() => {

    const confirm = window.confirm('Sınavı silmek istediğinize emin misiniz? Bu işlem geri alınamaz!')
    try{
      if(confirm){
        const examRef = doc(db, "exams", examID);
        const examData = await getDoc(examRef);
        const classroomID = examData.data().classroomID;
        const classroomRef = doc(db, "classrooms", classroomID);
        await updateDoc(classroomRef, {
          exams: arrayRemove(examID),
        });
        await deleteDoc(examRef);
        toast.success('Sınav başarıyla silindi.')
        dispatch(getMyExamsForTeacher(user.uid))
      }else{
        toast.error("İşlem iptal edildi.")
      }
    }
    catch(error){
      console.log(error.message)
      toast.error('Sınav silinirken bir hata oluştu.')
    }
  }
  
  return (
    <div className='bg-white p-4 rounded-md w-full border'>
        <div className='flex justify-between items-center'>
            <h1 className='font-semibold text-lg'>{examName}</h1>
            <div className='flex gap-x-2 items-center justify-center'>
            <Link to={ `/exam-detail/${examID}`} className='bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-700'>Sınavı Düzenle</Link>
            <button className='bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700' onClick={confirmDelete} >Sınavı Sil</button>
            </div>
        </div>
        <div className='flex gap-x-2 mt-2'>
            <div className='flex gap-x-2 items-center'>
            <p className='font-semibold flex gap-x-2 items-center pr-4 border-r'><span><FaClock/></span> {examTime} Dakika</p>
            </div>
            
            <div className='flex gap-x-2'>
            <p className='font-semibold pr-4 border-r'>Soru Sayısı : {questions.length}</p>
            </div>
            <div className='flex gap-x-2'>
            <p className='font-semibold pr-4 border-r'>Sınıf: {className}</p>
            </div>
            
        </div>
    </div>
  )
}

export default ExamBox