import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getClassromByUserID } from '~/redux/slices/classSlice'
import { useForm } from 'react-hook-form'
import ExamBox from '~/components/Exam/ExamBox/ExamBox'
import LeftSide from './children/LeftSide'
import RightSide from './children/RightSide'

const ExamManagement = () => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)



    const [examQuestions, setExamQuestions] = useState([]);
    const [examInfo, setExamInfo] = useState(null)

// exam'a servis yazılacak

    useEffect(() => {
        dispatch(getClassromByUserID(user.uid));
    }, [dispatch, user.uid]);

    return (
        <div className='w-full bg-blue-500 h-screen p-5 flex flex-col gap-y-3'>
            <h1 className='font-semibold text-2xl'>Sınav Yönetimi</h1>
            <div className='w-full flex justify-start items-center gap-x-5'>
               <LeftSide examInfo={examInfo} setExamInfo={setExamInfo} examQuestions={examQuestions}/>
               <RightSide examQuestions={examQuestions} setExamQuestions={setExamQuestions}/>
            </div>
        </div>
    )
}

export default ExamManagement


