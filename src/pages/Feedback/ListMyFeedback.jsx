import React, { useEffect } from 'react'
import FeedbackBox from './FeedbackBox'
import { useDispatch, useSelector } from 'react-redux'
import { getFeedbacks } from '~/redux/slices/feedbackSlice';

const ListMyFeedback = () => {
  const dispatch = useDispatch();


  const user = useSelector(state => state.user)
  const feedback = useSelector(state => state.feedback)
  const { feedbacks } = feedback

  useEffect(() => {
    dispatch(getFeedbacks(user.user.uid))
  }, [])


  return (

    <div className='flex flex-col flex-grow w-full h-full items-center p-3'>
      <span >Geçmiş Geribildirimlerim.</span>
      {
        feedbacks.length == 0 && (
          <span className='px-2 py-2 bg-orange-200  text-black rounded-md text-2xl'>Henüz geribildiriminiz bulunmamaktadır.</span>
        )
      }

      {
        feedbacks?.map(feedback => (
          <FeedbackBox key={feedback.id} feedback={feedback} />
        ))
      }


    </div>
  )
}

export default ListMyFeedback