import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getExamByExamID } from '~/redux/slices/examSlice';

const EnterExam = () => {
    const {id} = useParams()
    const dispatch = useDispatch();

    const {currentExam} = useSelector(state=>state.exam)
    const {questions,className,examName,examTime} = currentExam



    useEffect(()=>{
        dispatch(getExamByExamID(id))
    },[])
    
  return (
    <div className='w-full flex-grow flex justify-center items-center'>
      {questions?.map((question) => (
      <div key={question.id}>{question.examQuestionName}</div>
    ))} 
    
    </div>
  )
}

export default EnterExam