import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { db } from '~/firebase/firebaseConfig'
import { getAllFeedbacks } from '~/redux/slices/feedbackSlice'

const AdminFeedbackModal = ({ selectedFeedback, setIsModal }) => {
    const { register, handleSubmit } = useForm({
      
    })
    const { id } = selectedFeedback

    const dispatch = useDispatch();


    const onSubmit = async (data) => {
        try {
            const feedbackRef = doc(db, "feedbacks", id)

            const feedbackDoc = await getDoc(feedbackRef)

            
            await updateDoc(feedbackRef, {
                status: data.status,
                reply: data.reply,
            })
            toast.success('Başarılı bir şekilde cevaplandı.')
            setIsModal(false)

            dispatch(getAllFeedbacks())

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="relative z-10">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white ">
                            <div className="sm:flex sm:items-start">
                                <div className=" text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                    <form className='p-3 bg-white w-full ' onSubmit={handleSubmit(onSubmit)}>
                                        <div className='flex flex-col gap-y-1'>
                                            <label>Geribildirimi Cevaplayın : {id}</label>
                                            <textarea {...register("reply", { maxLength: 1000 })} className='border px-4 py-2 min-h-40 rounded-md outline-none max-h-96' placeholder='Sorunuzu detaylı bir şekilde açıklayın. Maksimum 1000 karakter.' />
                                        </div>
                                        <div className='my-2'>
                                            <select className='w-full px-4 py-2 rounded-md border outline-none' {...register("status", { required: true })}>
                                                <option value="pending">Beklemede</option>
                                                <option value="resolved">Çözüldü</option>
                                                <option value="rejected">Reddedildi</option>
                                            </select>
                                        </div>
                                        <div className="w-full flex justify-end items-center gap-x-2 mt-2">
                                            <button type='submit' className="mt-3 inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-green-300 bg-green-500 sm:mt-0 sm:w-auto">Gönder</button>
                                            <button onClick={() => setIsModal(false)} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Vazgeç</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminFeedbackModal