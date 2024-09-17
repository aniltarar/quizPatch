import React, { useEffect, useState } from 'react';
import ClassPerson from './ClassPerson';
import ClassStudent from './ClassStudent';
import Skeleton from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudents } from '~/redux/slices/studentSlice';
import { getAllTeachers } from '~/redux/slices/teacherSlice';
import 'react-loading-skeleton/dist/skeleton.css';
import { addClassroom } from '~/redux/slices/classSlice';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {addClassToUser} from '~/redux/slices/userSlice';

const AddClassroom = () => {
    const { students, isLoading: studentsLoading } = useSelector((state) => state.student);
    const { teachers, isLoading: teachersLoading } = useSelector((state) => state.teacher);

    const {user} = useSelector((state) => state.user);


    const tempArray = Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} height={50} />);

    const dispatch = useDispatch();

    const [selectedTeacher, setSelectedTeacher] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState([]);

    
    useEffect(() => {
        dispatch(getAllStudents());
        dispatch(getAllTeachers());
    }, [dispatch]);
    
    const { register, handleSubmit } = useForm();
    

    const addArray = (data) => {
      try {
        const classData = { ...data, students: selectedStudent, teachers: selectedTeacher };
        dispatch(addClassroom({ data: classData, user })); //firebase
      } catch (error) {
        console.error('Error adding array:', error);
      }
    };


    return (
        <div className="w-100 bg-zinc-100 rounded-xl p-3 mx-3">
      <form onSubmit={handleSubmit(addArray)}>
        <div className="formArea flex flex-col p-5 gap-y-2">
          <h1 className="text-center text-2xl">Sınıf Ekle</h1>
          <div className="flex flex-col">
            <label>Sınıf Adı</label>
            <input
              type="text"
              placeholder="Sınıf adını giriniz."
              className="px-2 py-3 border outline-none rounded"
              {...register('className')}
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label>Sınıf Açıklaması</label>
            <input
              type="text"
              placeholder="Oluşturacağınız sınıfı açıklayan 1-2 kısa cümle yazınız."
              {...register('classDescription')}
              className="px-2 py-3 border outline-none rounded"
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label>Sınıf Öğretmenleri</label>
            <div className="teacherGrid grid lg:grid-cols-4 md:grid-cols-2 gap-2 sm:grid-cols-1">
              {teachersLoading
                ? tempArray
                : teachers.map((teacher) => (
                    <ClassPerson key={teacher.uid} teacher={teacher} setSelectedTeacher={setSelectedTeacher} />
                  ))}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <label>Sınıf Öğrencileri</label>
            <div className="studentGrid grid lg:grid-cols-4 md:grid-cols-2 gap-2 sm:grid-cols-1">
              {studentsLoading
                ? tempArray
                : students.map((student) => (
                    <ClassStudent key={student.uid} student={student} setSelectedStudent={setSelectedStudent} />
                  ))}
            </div>
          </div>
          <button
            type="submit"
            className="m-2 px-2 py-3 bg-violet-100 text-violet-500 hover:bg-violet-500 hover:text-white trans rounded-l text-xl transition-colors"
          >
            Sınıf Oluştur
          </button>
        </div>
      </form>
    </div>
    );
};

export default AddClassroom;
