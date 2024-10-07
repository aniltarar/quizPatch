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


    useEffect(() => {
        dispatch(getClassromByUserID(user.uid));
    }, []);


    

    return (
        <div className='w-full bg-blue-500 h-screen p-5 flex flex-col gap-y-3'>
            <h1 className='font-semibold text-2xl'>Sınav Yönetimi</h1>
            <div className='w-full flex justify-start items-center gap-x-5'>
                <LeftSide examInfo={examInfo} setExamInfo={setExamInfo} examQuestions={examQuestions} />
                <RightSide examQuestions={examQuestions} setExamQuestions={setExamQuestions} />
            </div>

            <h1 className='text-4xl font-semibold'>Sınavlarım</h1>
            <div className='w-full grid grid-flow-row grid-cols-2 gap-3'>
                {exams?.map((exam, index) => (
                    <ExamBox key={index} exam={exam} />
                ))}
            </div>

          
        </div>
    )
}

export default ExamManagement