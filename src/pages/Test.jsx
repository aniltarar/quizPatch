import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addClassroom } from '~/redux/slices/classSlice';

const students = [
  {
    id: 1,
    name: "Berkan",
    surname: "Özmen",
  },
  {
    id: 2,
    name: "Anıl",
    surname: "Tarar",
  },
];

const teachers = [
  {
    id: 1,
    name: "Mehmet",
    surname: "Yılmaz",
  },
  {
    id: 2,
    name: "Ali",
    surname: "Demir",
  },
];

const Test = () => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [classData, setClassData] = useState([]);
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch()

  const addArray = (data) => {
   
    // dispatch(addClassroom({...data, students: selectedStudents, teachers: selectedTeachers }))
      
    
  };

  const addStudent = (student) => {
    setSelectedStudents([...selectedStudents, student]);
  };

  const addTeacher = (teacher) => {
    setSelectedTeachers([...selectedTeachers, teacher]);
  };

  useEffect(() => {
    console.log(classData); 
  }, [classData]);

  return (
    <div>
      <form onSubmit={handleSubmit(addArray)}>
        <input
          type="text"
          {...register("className")}
          className="border border-black px-4 py-2 rounded-md"
          placeholder="sınıf adı"
        />
        <input
          type="text"
          {...register("classDesc")}
          className="border border-black px-4 py-2 rounded-md"
          placeholder="sınıf açk."
        />
        <h1>öğrenci</h1>
        <div className="border flex">
          {students.map((student) => (
            <div key={student.id} className="flex flex-col gap-x-12 border border-red-500">
              <div>{student.name}</div>
              <button type="button" onClick={() => addStudent(student)}>
                ekle
              </button>
            </div>
          ))}
        </div>
        <h1>öğretmen</h1>
        <div className="border flex">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="flex flex-col gap-x-12 border border-red-500">
              <div>{teacher.name}</div>
              <button type="button" onClick={() => addTeacher(teacher)}>
                ekle
              </button>
            </div>
          ))}
        </div>
        <button type="submit" className="bg-black text-white">
          TAMAMLA
        </button>
      </form>

      <div>
        {classData?.map((data, i) => (
          <div key={i}>{data.students.map((student) => student.name).join(', ')}</div>
        ))}
      </div>
    </div>
  );
};

export default Test;
