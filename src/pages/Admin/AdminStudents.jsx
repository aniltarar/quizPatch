import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllStudents } from '~/redux/slices/studentSlice';

const AdminStudents = () => {
  const { students } = useSelector(state => state.student)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStudents())
  }, [dispatch])
  return (
     <div className="flex-grow h-full flex flex-col gap-y-5 items-start justify-start p-3">
      <h1 className="font-semibold text-2xl">Eğitmenler</h1>
      <div className="bg-white h-full rounded-md p-4 w-full border">
        <div className="w-full grid grid-cols-3 bg-zinc-100 px-4 py-3 rounded border">
          <span className="font-semibold">E-Posta</span>
          <span className="font-semibold">İsim Soyisim</span>
          <span className="font-semibold">Cep Telefonu</span>
        </div>
        <div className="w-full">
          {students.map((students) => (
            <div key={students.uid} className="grid grid-cols-3 bg-zinc-50 px-4 py-3 gap-4">
              <span>{students.email}</span>
              <span>{students.displayName}</span>
              <span>{students.phoneNumber}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminStudents