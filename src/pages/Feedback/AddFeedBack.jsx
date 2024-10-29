import moment from 'moment';

import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addFeedback, getFeedbacks } from '~/redux/slices/feedbackSlice';


const AddFeedBack = () => {
    const { register, handleSubmit  } = useForm()
    const user = useSelector(state => state.user)

    const dispatch = useDispatch();
    

    
    const onSubmit = async (data) => {
        
        const feedbackData = {
            ...data,
            userId: user.user.uid,
            username: user.user.displayName,
            reportTime : moment().format('DD.MM.YYYY HH:mm'),
            status: 'pending'
        }

       dispatch(addFeedback(feedbackData))
       dispatch(getFeedbacks(user.user.uid))
        
    }

    return (
            <form className='p-5 bg-white w-full ' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-y-1  '>
                    <label >Başlık Giriniz.</label>
                    <input type="text" {...register("title")} className='border px-4 py-2 rounded-md outline-none' placeholder='Kısaca sorununuza ait bir başlık yazın.' />
                </div>
                <div className='flex flex-col gap-y-1'>
                    <label >Açıklama Giriniz.</label>
                    <textarea {...register("description")} className='border px-4 py-2 min-h-40 rounded-md outline-none max-h-96' placeholder='Sorunuzu detaylı bir şekilde açıklayın.' />
                </div>
                <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md mt-5'>Gönder</button>
            </form>
    )
}

export default AddFeedBack