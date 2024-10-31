import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddClassroomForm from '~/components/Classrooms/Add/AddClassroomForm'
import TeacherClassroomList from '~/components/Classrooms/List/TeacherClassroomList'
import LoaderSpinner from '~/components/UI/LoaderSpinner'
import { getClassromByUserID } from '~/redux/slices/classSlice'

const TeacherClassroom = () => {
  
const { user } = useSelector(state => state.user)
const { userClassrooms, isLoading} = useSelector(state => state.classrooms)
const dispatch = useDispatch()

  
  useEffect(() => {
    dispatch(getClassromByUserID(user.uid)); 
  }, [dispatch, user.uid, ]);


  if(isLoading){
    return (
      <LoaderSpinner/>
    )
  }
  
  return (
    <div className='w-full h-screen flex justify-center items-start gap-x-5 p-5'>
      <AddClassroomForm/>
      <TeacherClassroomList userClassrooms={userClassrooms}/>
    </div>
  )
}


export default TeacherClassroom