import React from 'react'
import { Link } from 'react-router-dom'
import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiExamBold } from "react-icons/pi";
import { MdClass, MdFeedback } from "react-icons/md";

const AdminSidebar = () => {
  return (
     <aside className=" bg-white p-5 border-r flex flex-col gap-y-2">
        <div className="text-black font-bold pb-1 border-b text-center text-2xl bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-violet-500">QuizAdmin</div>
        <div className='flex flex-col justify-between items-center  h-full'>
              <nav className='flex flex-col gap-y-4 mt-3'>
                  <Link to="admin" className='px-4 py-2 rounded-md bg-zinc-50 border hover:bg-zinc-100 flex items-center gap-x-2'><PiStudentFill/>Panel</Link>
          <Link to="admin/students" className='px-4 py-2 rounded-md bg-zinc-50 border hover:bg-zinc-100 flex items-center gap-x-2'><PiStudentFill/>Öğrenciler</Link>
          <Link to="admin/teachers" className='px-4 py-2 rounded-md bg-zinc-50 border hover:bg-zinc-100 flex items-center gap-x-2'>
          <FaChalkboardTeacher/> Öğretmenler</Link>
          {/* <Link to="admin/exams" className='px-4 py-2 rounded-md bg-zinc-50 border hover:bg-zinc-100 flex items-center gap-x-2'>
          <PiExamBold/>
            Sınavlar</Link>
          <Link to="admin/classrooms" className='px-4 py-2 rounded-md bg-zinc-50 border hover:bg-zinc-100 flex items-center gap-x-2'>
          <MdClass/>
            Sınıflar</Link> */}
          <Link className='px-4 py-2 rounded-md bg-zinc-50 border hover:bg-zinc-100 flex items-center gap-x-2'>
          <MdFeedback/>
            Geribildirimler</Link>
        </nav>
            <Link className='bg-zinc-50 rounded-full px-4 py-2  border w-full flex justify-center items-center'>Anasayfa</Link>
        </div>
      </aside>
  )
}

export default AdminSidebar