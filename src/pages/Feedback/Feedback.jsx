import React from 'react'
import AddFeedBack from './AddFeedBack'
import ListMyFeedback from './ListMyFeedback'

const Feedback = () => {

  return (
    <div className='flex flex-grow bg-zinc-100 w-full items-center justify-center '>
      <AddFeedBack />
      <ListMyFeedback/>
    </div>
  )
}

export default Feedback