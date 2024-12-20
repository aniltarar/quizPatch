import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiEdit } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { updateDoc, doc, collection, getDocs } from 'firebase/firestore'
import { db } from '~/firebase/firebaseConfig'
import { updateUser } from '~/redux/slices/userSlice'
import { toast } from 'react-toastify'
import AddFeedBack from '../Feedback/AddFeedBack'


const Profile = () => {
    const { user } = useSelector((state) => state.user)
    const [isEditMode, setIsEditMode] = useState(false)
    const dispatch = useDispatch()

    const { register, handleSubmit } = useForm()


    const getAllUsers = async () => {
        const usersRef = collection(db, "users");
        const snapshot = await getDocs(usersRef);
        const usersData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

    };



    const save = async (selectedValue) => {
        const userRef = doc(db, "users", user.uid);

        try {
            await updateDoc(userRef, {
                displayName: selectedValue.displayName || user.displayName,
                phoneNumber: selectedValue.phoneNumber || user.phoneNumber
            })

            const updatedData = {
                displayName: selectedValue.displayName || user.displayName,
                phoneNumber: selectedValue.phoneNumber || user.phoneNumber
            }

            setIsEditMode(false)

            toast.success("Başarıyla Profil Güncellendi!")
            dispatch(updateUser(updatedData)) //update
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <div className='flex justify-center items-start flex-grow bg-zinc-50 h-screen p-6'>
            <form className='flex gap-x-5 justify-between w-full items-center' onSubmit={handleSubmit(save)}>
                <div className='flex flex-col gap-y-3 bg-white p-3 rounded-md border shadow-md relative'>
                    <div className="flex gap-x-2">
                        <div className='flex flex-col gap-y-1'>
                            <label className='text-sm'>Ad Soyad</label>
                            <input {...register("displayName")} type="text" className='px-4 py-2 rounded-md border outline-none' disabled={isEditMode ? false : true} defaultValue={user?.displayName} />
                        </div>

                        <div className='flex flex-col gap-y-1'>
                            <label className='text-sm'>Cep No.</label>
                            <input {...register("phoneNumber")} type="text" className='px-4 py-2 rounded-md border outline-none' disabled={isEditMode ? false : true} defaultValue={user?.phoneNumber} />
                        </div>
                    </div>

                    <div className='flex  w-full justify-around items-center gap-x-2'>
                        {isEditMode && <button className='transition-all bg-green-200 hover:bg-green-400 hover:text-white text-green-500 hover:bg-vi
                         px-4 py-2 rounded-md w-full' type='submit'>Kaydet</button>}
                        {isEditMode && <button className='transition-all bg-red-200 hover:bg-red-400 text-red-600 hover:text-white hover:bg-vi
                     px-4 py-2 rounded-md w-full' onClick={() => setIsEditMode(false)}>Vazgeç</button>}
                    </div>
                    <button type='button'
                        onClick={() => setIsEditMode(!isEditMode)}
                        className={` ${isEditMode ? "hidden" : "visible"} bg-yellow-100 hover:bg-yellow-300 hover:text-white transition-all hover:text-xl text-yellow-500 rounded-full absolute -top-5 -right-3 p-3`}>
                        <FiEdit />
                    </button>
                </div>
            </form>
    
        </div>
    )
}

export default Profile
