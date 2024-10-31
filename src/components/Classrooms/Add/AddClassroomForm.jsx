import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { addClassScheme } from '~/validation/scheme';
import { zodResolver } from '@hookform/resolvers/zod';
import StudentCard from '../StudentCard/StudentCard';
import TeacherCard from '../TeacherCard/TeacherCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTeachers } from '~/redux/slices/teacherSlice';
import { getAllStudents } from '~/redux/slices/studentSlice';
import { addClassroom, getClassromByUserID } from '~/redux/slices/classSlice';

const AddClassroomForm = () => {
  const dispatch = useDispatch();
  const { teachers } = useSelector(state => state.teacher) // sistemde kayıtlı olan tüm öğretmenler
  const { students } = useSelector(state => state.student) // sistemde kayıtlı olan tüm öğrenciler

  const { user } = useSelector(state => state.user)


  const [classMembers, setClassMembers] = useState({
    teachers: [],
    students: []
  })

  const [resetSelected, setResetSelected] = useState(false)


  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(addClassScheme)
  })
  const fetchAll = async () => {
    try {
      await Promise.all([
        dispatch(getAllTeachers()),
        dispatch(getAllStudents())
      ])
    } catch (error) {
      console.log("fetchAll -> error", error);
    }
  }

  useEffect(() => {
    fetchAll()
  }, [dispatch])


  const AddClassroom = (data) => {
    const fulldata = { ...data, selectedTeacher: classMembers.teachers, selectedStudent: classMembers.students }
    dispatch(addClassroom(fulldata))
    dispatch(getClassromByUserID(user.uid))

    setClassMembers({
      teachers: [],
      students: []
    })
    reset();

    setResetSelected(true)

    setTimeout(() => {
      setResetSelected(false)
    }, 100)

  }

  return (
    <form className='bg-white rounded-md border-2 p-5 flex flex-col w-1/2 gap-y-5 h-full' onSubmit={handleSubmit(AddClassroom)}>
      <h1 className='text-3xl font-semibold'>Yeni Sınıf Oluştur</h1>
      <div className='flex flex-col gap-y-2'>
        <label >Oluşturacağınız Sınıfın Adını Giriniz</label>
        <input type="text" className='w-full outline-none px-2 py-1 rounded-md border' {...register("className")} placeholder='Örn: Coğrafya Sınıf' />
      </div>
      <div className='flex flex-col gap-y-2'>
        <label >Oluşturacağınız Sınıfın Açıklaması Adını Giriniz</label>
        <input type="text" className='w-full outline-none px-2 py-1 rounded-md border' {...register("classDesc")} placeholder='Örn: Yaşadığımız dünya hakkında derin bilgiler öğreneceğiz.' />
      </div>
      <div className='w-full grid md:grid-cols-3 grid-cols-1 gap-4  overflow-y-auto max-h-64 '>
        {
          teachers.map((teacher) => (
            <TeacherCard key={teacher.uid} teacher={teacher} setClassMembers={setClassMembers} resetSelected={resetSelected} />
          ))
        }

      </div>
      <hr />
      <div className='w-full grid md:grid-cols-3 grid-cols-1 gap-4 overflow-y-auto max-h-64'>
        {students.map((student) => (
          <StudentCard key={student.uid} student={student} setClassMembers={setClassMembers} resetSelected={resetSelected} />
        ))}
      </div>
      <hr />

      {
        classMembers.teachers.length == 0 && classMembers.students.length == 0 ? <p className='text-center text-sm text-gray-500'>Sınıfa eklenen öğretmen ve öğrenci yok</p> :
          <div className='memberList w-100 flex flex-col gap-y-2'>
            <span>Öğretmenler: {classMembers.teachers.map(teacher => teacher.displayName).join(', ')}</span>
            <span>Öğrenciler: {classMembers.students.map(student => student.displayName).join(', ')}</span>
          </div>
      }

      <button type='submit' className='p-2 text-white bg-emerald-500 rounded-md hover:bg-emerald-400 transition-colors'>Sınıf Ekle</button>
    </form>
  )
}

export default AddClassroomForm;