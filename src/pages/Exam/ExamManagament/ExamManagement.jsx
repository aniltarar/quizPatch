import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getClassromByUserID } from '~/redux/slices/classSlice'
import { useForm } from 'react-hook-form'
import ExamBox from '~/components/Exam/ExamBox/ExamBox'
import LeftSide from './children/LeftSide'
import RightSide from './children/RightSide'
import { getMyExamsForTeacher } from '~/redux/slices/examSlice'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const ExamManagement = () => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const { exams } = useSelector(state => state.exam)

  const [animationParent] = useAutoAnimate()

    const [examQuestions, setExamQuestions] = useState([]);
    const [examInfo, setExamInfo] = useState(null)
    const [questionIndex, setQuestionIndex] = useState(0)
    

    useEffect(() => {
        dispatch(getMyExamsForTeacher(user.uid))
    },[])

    const deleteQuestionState = (id) => {
      setExamQuestions(examQuestions.filter((question) => question.id !== id))
    }

    return (
        <div className='w-full  h-screen p-5 flex flex-col gap-y-3'>
            <h1 className='font-semibold text-2xl mb-2'>Sınav Yönetimi</h1>
            <div className='w-full flex justify-start items-center gap-x-5'>
                <LeftSide examInfo={examInfo} setExamInfo={setExamInfo} examQuestions={examQuestions} />
                <RightSide questionIndex={questionIndex} setQuestionIndex={setQuestionIndex}  examQuestions={examQuestions} setExamQuestions={setExamQuestions} />
            </div>
            <div className='w-full bg-white mt-2 rounded-md border  flex flex-col gap-y-1 p-3'>
        <h1 className='pb-4 border-b text-xl font-medium'>Eklenen Sorular</h1>
                <div className='w-full grid grid-cols-2 pt-3 gap-3' ref={animationParent}>
                    {
            examQuestions.map((question) => (
                <div key={question.id} className='p-3 rounded-md bg-zinc-50 text-zinc-700 border    '>
                    <h1 className='pb-2'>{ question.examQuestionName}</h1>
                    <button onClick={() => deleteQuestionState(question.id)} className='bg-red-500'>Soruyu Sil</button>
                    <div className='p-2 border-t'>
                        <p className='text-sm'>A) {question.optionA}</p>
                        <p className='text-sm'>B) {question.optionB}</p>
                        <p className='text-sm'>C) {question.optionC}</p>
                        <p className='text-sm'>D) {question.optionD}</p>
                    </div>
                </div>
            ))
        }
        </div>
            </div>
        </div>
    )
}

export default ExamManagement