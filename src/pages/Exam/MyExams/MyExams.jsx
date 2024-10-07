import React,{useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import ExamBox from '~/components/Exam/ExamBox/ExamBox'
import { getClassromByUserID } from '~/redux/slices/classSlice'
import { deleteExamByID, getMyExamsForTeacher } from '~/redux/slices/examSlice'

const MyExams = () => {

const dispatch = useDispatch()
const {user} = useSelector(state => state.user)
const {exams} = useSelector(state => state.exam)
const {userClassrooms} = useSelector(state => state.classrooms)



useEffect(() => {
  dispatch(getMyExamsForTeacher(user.uid))
},[])


  return (
    <div>
        <h1 className='text-2xl font-semibold'>Sınavlarım</h1>
        <div className='w-full grid grid-flow-row grid-cols-2 gap-3'>
            {exams.length > 0 ? exams.map((exam) => (
                <ExamBox exam={exam} key={exam.examID} />
            )) : <p className='text-center'>Henüz sınavınız bulunmamaktadır.</p>}
    </div>
    </div>
  )
}

export default MyExams