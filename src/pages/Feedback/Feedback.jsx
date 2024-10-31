import React from 'react'
import AddFeedBack from './AddFeedBack'
import ListMyFeedback from './ListMyFeedback'
import LoaderSpinner from '~/components/UI/LoaderSpinner'
import { useSelector } from 'react-redux'

const Feedback = () => {


  return (
    <div className='flex flex-grow w-full items-center justify-center container mx-auto '>
      <ListMyFeedback/>
    </div>
  )
}

export default Feedback