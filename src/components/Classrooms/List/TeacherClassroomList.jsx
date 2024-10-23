import React , {useEffect} from 'react'
import ClassBox from './ClassBox'
import { useDispatch, useSelector } from 'react-redux'
import { deleteClassroomByID, getClassromByUserID } from '~/redux/slices/classSlice'

const TeacherClassroomList = () => {

    const { userClassrooms } = useSelector(state => state.classrooms)
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()




    useEffect(() => {
        dispatch(getClassromByUserID(user.uid)); 
      }, [dispatch, user.uid, ]);






  return (
    <div className='bg-white rounded-md border-2 p-5 flex flex-col w-1/2 h-full gap-y-5'>
        <h1 className='text-3xl font-semibold'>Öğretmenlik Yaptığım Sınıflar</h1>
        <div className='w-full grid grid-cols-1 gap-5'>
        {userClassrooms.length > 0 ? userClassrooms.map((classroom) => (
            <ClassBox key={classroom?.id} classroom={classroom}/>
        )) : <div className=''>
            <p className='text-center bg-red-100 text-red-500 px-4 py-2 rounded-md'>Henüz sınavınız bulunmamaktadır, lütfen yeni bir sınav oluşturun.</p>
        </div>}
        </div>
    </div>
  )
}

export default TeacherClassroomList