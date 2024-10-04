import React,{useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import ExamBox from '~/components/Exam/ExamBox/ExamBox'
import { getClassromByUserID } from '~/redux/slices/classSlice'
import { getMyExamsForTeacher } from '~/redux/slices/examSlice'

const MyExams = () => {

const dispatch = useDispatch()
const {user} = useSelector(state => state.user)
const {exams} = useSelector(state => state.exam)
const {userClassrooms} = useSelector(state => state.classrooms)





useEffect(() => {
    dispatch(getClassromByUserID(user.uid));
    dispatch(getMyExamsForTeacher(user.uid))
},[dispatch])




  return (
    <div>
        <h1 className='text-2xl font-semibold'>Sınavlarım</h1>
        <div className='w-full grid grid-flow-row grid-cols-2 gap-3'>
            {exams?.map((exam, index) => (
                <ExamBox key={index} exam={exam} />
            ))
            }
    </div>
    </div>
  )
}

export default MyExams