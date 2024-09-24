import AddClassroomForm from '~/components/Classrooms/Add/AddClassroomForm'
import TeacherClassroomList from '~/components/Classrooms/List/TeacherClassroomList'

const TeacherClassroom = () => {
  return (
    <div className='w-full h-screen flex justify-center items-start gap-x-5 p-5'>
      <AddClassroomForm/>
      <TeacherClassroomList/>
    </div>
  )
}


export default TeacherClassroom