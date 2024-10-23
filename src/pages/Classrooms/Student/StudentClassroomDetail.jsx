import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getClassByID } from '~/redux/slices/classSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getExamsByClassroomID } from '~/redux/slices/examSlice';

const StudentClassroomDetail = () => {
    const {id} = useParams();
    const {currentClassroom}= useSelector(state=>state.classrooms)
    const {exams}=useSelector(state=>state.exam)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getClassByID(id))
        dispatch(getExamsByClassroomID(id))
    }, [])

    

  return (
    <div className='w-full flex-grow items-start justify-start flex'>
    <div className='w-1/2 h-full flex flex-col gap-y-5 p-5'>
        <div className="classroomTeachers  flex flex-col gap-y-2">
            <h1 className='text-4xl font-semibold'>Öğretmenler</h1>
            {
                currentClassroom.selectedTeacher && currentClassroom.selectedTeacher.map((teacher) => (
                    <div className='px-4 py-2 rounded-md bg-white border' key={teacher.uid}>{teacher.displayName}</div>
                ))
            }
        </div>
        <div className="classroomStudents  flex flex-col gap-y-2">
            <h1 className='text-4xl font-semibold'>Öğrenciler</h1>
            {
                currentClassroom.selectedStudent && currentClassroom.selectedStudent.map((student) => (
                    <div className='px-4 py-2 rounded-md bg-white border' key={student.uid}>{student.displayName}</div>
                ))
            }
        </div>
    </div>
    <div className='w-1/2  h-full flex flex-col gap-y-5 p-5'>
        <div className="classroomExams flex flex-col gap-y-2">
        <h1 className='text-4xl font-semibold'>Sınavlar</h1>
            {
                exams.length > 0 ? exams.map((exam) => (
                   <div key={exam.examID} className='flex justify-between  items-center p-3 rounded-md border bg-white'>
                       <div key={exam.examID}>{exam.examName}</div>
                       <Link to={`/enter-exam/${exam.examID}`} className='px-4 py-1 rounded-md bg-zinc-100'>Sınava Gir</Link>
                   </div> 
                )) : <p className='text-center'>Henüz sınav eklenmedi.</p>
            }
        </div>
    </div>
    </div>
  )
}

export default StudentClassroomDetail