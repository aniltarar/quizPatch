import moment from "moment"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import AddFeedBack from "~/pages/Feedback/AddFeedBack"
import { addFeedback, getFeedbacks } from "~/redux/slices/feedbackSlice"





const FeedbackModal = ({ setIsModal }) => {


    const { register, handleSubmit } = useForm()

    const user = useSelector(state => state.user)

    const dispatch = useDispatch();





    const onSubmit = async (data) => {

        const feedbackData = {
            ...data,
            userId: user.user.uid,
            username: user.user.displayName,
            reportTime: moment().format('DD.MM.YYYY HH:mm'),
            status: 'pending'
        }

        dispatch(addFeedback(feedbackData))
        dispatch(getFeedbacks(user.user.uid))
        setIsModal(false)
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
                                    <form className='p-5 bg-white w-full ' onSubmit={handleSubmit(onSubmit)}>
                                        <div className='flex flex-col gap-y-1  '>
                                            <label >Başlık Giriniz.</label>
                                            <input type="text" {...register("title", { required: true })} className='border px-4 py-2 rounded-md outline-none' placeholder='Kısaca sorununuza ait bir başlık yazın.' />
                                        </div>
                                        <div className='flex flex-col gap-y-1'>
                                            <label >Açıklama Giriniz.</label>
                                            <textarea {...register("description", { maxLength: 1000 })} className='border px-4 py-2 min-h-40 rounded-md outline-none max-h-96' placeholder='Sorunuzu detaylı bir şekilde açıklayın. Maksimum 1000 karakter.' />
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


export default FeedbackModal