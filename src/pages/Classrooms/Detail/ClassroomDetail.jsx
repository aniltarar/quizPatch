import { doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '~/firebase/firebaseConfig'
import { useDispatch, useSelector } from 'react-redux'
import { deleteClassroomByID, getClassByID } from '~/redux/slices/classSlice'
import { getAllTeachers } from '~/redux/slices/teacherSlice'
import { getAllStudents } from '~/redux/slices/studentSlice'
import { BiTrash } from 'react-icons/bi'
import { useForm } from 'react-hook-form'

const ClassroomDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { currentClassroom, isLoading, isSuccess } = useSelector((state) => state.classrooms);
  const { teachers } = useSelector((state) => state.teacher);
  const { students } = useSelector((state) => state.student);
  const [isEditMode, setIsEditMode] = useState(false)
  const { className, classDesc, selectedStudent, selectedTeacher } = currentClassroom || {};


  const { register, handleSubmit, reset } = useForm()
  const classroomRef = doc(db, 'classrooms', id);

  // Silme işlemleri

  const deletedTeacher = async (teacherId) => {
    const filteredTeacher = selectedTeacher.filter((teacher) => teacher.uid !== teacherId);
    try {
      if (confirm("Öğretmeni sınıftan çıkarmak istediğinize emin misiniz?")) {

        await updateDoc(classroomRef, {
          selectedTeacher: filteredTeacher,
        });

      }
      dispatch(getClassByID(id));
    } catch (error) {
      console.log('Hata!!!', error);
    }
  };


  const deletedStudent = async (studentId) => {
    const filteredStudent = selectedStudent.filter((student) => student.uid !== studentId);
    try {
      if (confirm("Öğrenciyi sınıftan çıkarmak istediğinize emin misiniz?")) {
        await updateDoc(classroomRef, {
          selectedStudent: filteredStudent,
        });
      }

      dispatch(getClassByID(id));
    } catch (error) {
      console.log('Hata!!!', error);
    }
  };

  const deleteClass = () => {
    if (confirm("Sınıfı silmek istediğinize emin misiniz?")) {
      dispatch(deleteClassroomByID(id))
      navigate("/classrooms-management")
    } else {
      alert("Sınıf silme işlemi iptal edildi.")
    }
  }

  // Kaydetme İşlemi
  const saveClass = async (data) => {
    setIsEditMode(false);
    try {
      const classroomRef = doc(db, 'classrooms', id);

      await updateDoc(classroomRef, {
        className: data.className || className,
        classDesc: data.classDesc || classDesc,
      });

      console.log("Kayıt Edildi!");
      dispatch(getClassByID(id));
    } catch (error) {
      console.log("Hata: ", error);
    }
  };

  useEffect(() => {
    reset({
      className: className,
      classDesc: classDesc,
    });
  }, [reset, className, classDesc]);



  useEffect(() => {

    dispatch(getClassByID(id));
    dispatch(getAllTeachers());
    dispatch(getAllStudents());

  }, [dispatch]);


  if (isLoading) {
    return <div className=''>Loading...</div>;
  }

  if (isSuccess) {

    return (
      <div className='w-full flex flex-col justify-start items-start  p-5 gap-y-5'>
        <div className='w-full flex justify-between items-center '>
          <h1 className='font-semibold text-3xl'>{className + " "}Sınıf Detayı</h1>
        </div>
        <div className='w-full  h-[500px] flex justify-start items-center gap-x-5 '>
          <div className=' w-1/2 h-full'>

            <form className='w-full h-full border p-6 bg-white rounded-md flex flex-col gap-y-5' onSubmit={handleSubmit(saveClass)}>
              <div className='flex flex-col gap-y-1'>
                <label className='font-semibold text-sm  outline-none'>Sınıfın Adı*</label>
                <input {...register("className")} type="text" className='px-4 py-2 rounded-md border ' defaultValue={className} disabled={!isEditMode} />
              </div>
              <div className='flex flex-col gap-y-1'>
                <label className='font-semibold text-sm  outline-none'>Sınıfın Açıklaması*</label>
                <input {...register("classDesc")} type="text" className='px-4 py-2 rounded-md border ' defaultValue={classDesc} disabled={!isEditMode} />
              </div>
              <div className="controlClass flex mt-auto gap-x-3">
                {isEditMode ? (
                  <button type='submit' className='bg-green-500 px-4 py-1.5 text-white rounded-md'>
                    Kaydet
                  </button>
                ) : (
                  <span type='button' onClick={() => setIsEditMode(true)} className='cursor-pointer bg-yellow-500 text-white px-4 py-1.5  rounded-md'>
                    Düzenle
                  </span>
                )}
                <button className='bg-red-500 px-4 py-1.5 text-white rounded-md' onClick={deleteClass}>Sınıfı Sil</button>
              </div>
            </form>


          </div>
          {/* Right Side */}
          <div className=' w-1/2 h-full flex justify-start items-start gap-x-5 '>
            <div className='bg-white border-2 rounded-md w-full h-full flex flex-col justify-start items-center gap-y-5 p-3'>
              <span className='w-full bg-black rounded-md text-white flex justify-center items-center py-2 font-semibold'>Sınıfta Bulunan Öğretmenler</span>
              <div className='flex flex-col gap-y-2 w-full'>
                {selectedTeacher?.map((teacher) => (
                  <div className='w-full bg-zinc-50 py-2 px-3 rounded-md border flex justify-between items-center' key={teacher.uid}>
                    <span>{teacher.displayName} </span>
                    <button onClick={() => deletedTeacher(teacher.uid)} className='p-2 bg-red-500 text-white rounded-md'>
                      <BiTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className='bg-white  border-2 rounded-md w-full h-full flex flex-col justify-start items-center gap-y-5 p-3'>
              <span className='w-full  bg-black rounded-md text-white flex justify-center items-center py-2 font-semibold'>Sınıfta Bulunan Öğrenciler</span>
              <div className='flex flex-col gap-y-2 w-full'>
                {selectedStudent?.map((student) => (
                  <div className='w-full bg-zinc-50 py-2 px-3 rounded-md border flex justify-between items-center' key={student.uid}>
                    <span>{student.displayName} </span>
                    <button onClick={() => deletedStudent(student.uid)} className='p-2 bg-red-500 text-white rounded-md'>
                      <BiTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}





export default ClassroomDetail