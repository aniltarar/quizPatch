import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getClassromByUserID } from '~/redux/slices/classSlice'
import { useForm } from 'react-hook-form'
import ExamBox from '~/components/Exam/ExamBox/ExamBox'
import LeftSide from './children/LeftSide'
import RightSide from './children/RightSide'
import { getMyExamsForTeacher } from '~/redux/slices/examSlice'

const ExamManagement = () => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const { exams } = useSelector(state => state.exam)


    const [examQuestions, setExamQuestions] = useState([]);
    const [examInfo, setExamInfo] = useState(null)

    const [questionIndex, setQuestionIndex] = useState(0)
    

    useEffect(() => {
        dispatch(getMyExamsForTeacher(user.uid))
    },[])

    return (
        <div className='w-full bg-blue-500 h-screen p-5 flex flex-col gap-y-3'>
            <h1 className='font-semibold text-2xl'>Sınav Yönetimi</h1>
            <div className='w-full flex justify-start items-center gap-x-5'>
                <LeftSide examInfo={examInfo} setExamInfo={setExamInfo} examQuestions={examQuestions} />
                <RightSide questionIndex={questionIndex} setQuestionIndex={setQuestionIndex}  examQuestions={examQuestions} setExamQuestions={setExamQuestions} />
            </div>
        </div>
    )
}

export default ExamManagement