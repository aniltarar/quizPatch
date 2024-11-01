import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ExamBox from '~/components/Exam/ExamBox/ExamBox'
import LoaderSpinner from '~/components/UI/LoaderSpinner'
import { getClassromByUserID } from '~/redux/slices/classSlice'
import { deleteExamByID, getMyExamsForTeacher } from '~/redux/slices/examSlice'

const MyExams = () => {

  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  const { exams,isLoading } = useSelector(state => state.exam)



  useEffect(() => {
    dispatch(getMyExamsForTeacher(user.uid))
    console.log(exams);
  }, [])

  if (isLoading) {
    return (
      <LoaderSpinner />
    )
  }



  return (
    <div className='py-5 px-12 flex flex-col gap-y-3'>
      <h1 className='text-2xl font-semibold'>Sınavlarım</h1>
      <div className='w-full grid grid-flow-row grid-cols-1 gap-3 place-items-start'>
        {exams.length > 0 ? exams.map((exam) => (
          <ExamBox exam={exam} key={exam.examID} />
        )) : <p className='text-center bg-red-100 text-red-500 px-4 py-2 rounded-md'>Henüz sınavınız bulunmamaktadır, lütfen yeni bir sınav oluşturun.</p>}
      </div>
    </div>
  )
}

export default MyExams

