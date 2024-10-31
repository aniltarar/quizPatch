import React, { useEffect, useState } from 'react'
import FeedbackBox from './FeedbackBox'
import { useDispatch, useSelector } from 'react-redux'
import { getFeedbacks } from '~/redux/slices/feedbackSlice';
import { MdOutlineFeedback } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import FeedbackModal from '~/components/UI/Modals/Feedback/FeedbackModal';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FaSearch } from 'react-icons/fa';
import LoaderSpinner from '~/components/UI/LoaderSpinner';

const ListMyFeedback = () => {
  const [animationParent] = useAutoAnimate()
  const dispatch = useDispatch();


  const user = useSelector(state => state.user)
  const feedback = useSelector(state => state.feedback)
  const {isLoading} = useSelector(state => state.feedback)

  const { feedbacks } = feedback
  
  useEffect(() => {
    dispatch(getFeedbacks(user.user.uid))
  }, [])
  
  const [isModal, setIsModal] = useState(false)
  const [search,setSearch]=useState('')


  const filteredFeedbacks = feedbacks.filter((feedback) => feedback.title.toLowerCase().includes(search.toLowerCase()))

  
  if (isLoading) {
    return (
     <LoaderSpinner/>
    )
  }

  return (
    <>
    {isModal && <FeedbackModal setIsModal={setIsModal} />}
    <div className='flex flex-col flex-grow w-full h-full items-center p-3'>
      <div className='w-full flex justify-between items-center py-3'>
        <span className="flex w-full text-xl font-semibold text-zinc-500 items-center gap-x-1"> <MdOutlineFeedback />Geribildirimlerim.</span>
          <div className='flex items-center gap-x-2'>
            <div className='flex pl-4 pr-2 h-10 border border-zinc-400 text-zinc-500 rounded-full items-center gap-x-2 '>
              <FaSearch/>
              <input onChange={(e) => setSearch(e.target.value)} type="text" className=' bg-transparent h-full outline-none text-sm' placeholder='Başlığa Göre Ara...' />
            </div>
              <button onClick={()=>setIsModal(true)} className='px-3 py-2 hover:bg-zinc-100 border  border-green-500 text-green-500 bg-green-100 flex items-center gap-x-2 rounded-full transition-colors'><IoAddCircleOutline size={20} /><span className='text-sm lg:flex hidden'>Oluştur</span></button>
      </div>
      </div>
      {
        feedbacks.length == 0 && (
          <span className='px-2 py-2 bg-orange-200  text-black rounded-md text-2xl'>Henüz geribildiriminiz bulunmamaktadır.</span>
        )
      }
      <div className='grid lg:grid-cols-2 grid-cols-1 w-full gap-5' ref={animationParent}>
        {
          filteredFeedbacks?.map(feedback => (
            <FeedbackBox key={feedback.id} feedback={feedback} />
          ))
        }
      </div>
    </div>
    </>
  )
}

export default ListMyFeedback