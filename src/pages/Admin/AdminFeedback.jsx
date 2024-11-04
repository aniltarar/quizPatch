import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import AdminFeedbackBox from '~/components/Feedback/AdminFeedbackBox';
import AdminFeedbackModal from '~/components/UI/Modals/Feedback/AdminFeedbackModal';
import { getAllFeedbacks } from '~/redux/slices/feedbackSlice';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const AdminFeedback = () => {

    const [animateRef] = useAutoAnimate()
    const dispatch = useDispatch();
    const feedbacks = useSelector(state => state.feedback.feedbacks)

    const [isModal, setIsModal] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [search,setSearch]=useState('')

    useEffect(() => {
        dispatch(getAllFeedbacks())
    }, [])

    const openModal = (feedback) => {
        setSelectedFeedback(feedback);
        setIsModal(true);
    }

    const filteredFeedbacks = feedbacks.filter((feedback) => ` ${feedback.title} ${feedback.description} ${feedback.id} ${feedback.username}`.toLowerCase().includes(search.toLowerCase()))



  return (
      <>
      {isModal && <AdminFeedbackModal setIsModal={setIsModal} selectedFeedback={selectedFeedback}/>}
    <div className='flex flex-col gap-y-2 flex-grow w-full'>
              <div className='w-full p-2 '>
                   <div className='flex pl-4 pr-2 h-10 border border-zinc-400 text-zinc-500 rounded-full items-center gap-x-2 '>
              <FaSearch/>
              <input onChange={(e) => setSearch(e.target.value)} type="text" className=' bg-transparent h-full outline-none text-sm w-full' placeholder='Başlığa Göre Ara...' />
            </div>
        </div>
        <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-5 " ref={animateRef}>
            {
                filteredFeedbacks.map(feedback => (
                    <AdminFeedbackBox key={feedback.id} feedback={feedback} openModal={openModal} />
                ))
            }
        </div>
          </div>
      </>
  )
}

export default AdminFeedback