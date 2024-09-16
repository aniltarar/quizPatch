import React, { useEffect } from 'react'
import ClassPerson from './ClassPerson'
import { useDispatch, useSelector } from 'react-redux'
import { getAllStudents } from '~/redux/slices/studentSlice'
import { getAllTeachers } from '~/redux/slices/teacherSlice'



const AddClassroom = () => {


    const {students,isLoading} = useSelector((state) => state.student)

    const {teachers} = useSelector((state) => state.teacher)

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAllStudents());
        dispatch(getAllTeachers())
    }, [dispatch]);
    

    return (
        <div className="w-100 bg-zinc-100 rounded-xl p-3 mx-3">

            <form>

                <div className="formArea flex flex-col  p-5 gap-y-2   ">
                    <h1 className='text-center text-2xl '>Sınıf Ekle</h1>
                    <div className="flex flex-col">
                        <label>Sınıf Adı</label>
                        <input type="text" placeholder='Sınıf adını giriniz.' className='px-2 py-3 border outline-none rounded' />
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <label>Sınıf Açıklaması</label>
                        <input type="text" placeholder='Oluşturacağınız sınıfı açıklayan 1-2 kısa cümle yazınız.' className='px-2 py-3 border outline-none rounded' />
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <label>Sınıf Öğretmenleri</label>
                        <div className="teacherGrid grid lg:grid-cols-4 md:grid-cols-2 gap-2 sm:grid-cols-1 ">
                            {isLoading ? <div>Yükleniyor...</div> : teachers.map((teacher) => (
                                <ClassPerson key={teacher.uid} itemName={teacher.displayName} />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <label>Sınıf Öğrencileri</label>
                        <div className="studentGrid grid lg:grid-cols-4 md:grid-cols-2 gap-2 sm:grid-cols-1 ">
                            {students.map((student) => (
                                <ClassPerson key={student.uid} itemName={student.displayName} />
                            ))}
                        </div>
                    </div>
                    <button className="m-2 px-2 py-3 bg-violet-100 text-violet-500 hover:bg-violet-500 hover:text-white trans rounded-l text-xl transition-colors">Sınıf Oluştur</button>
                </div>
            </form>

        </div>
    )
}

export default AddClassroom