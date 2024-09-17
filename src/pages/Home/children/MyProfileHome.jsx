import React from 'react'
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { Link } from 'react-router-dom';

const MyProfileHome = ({ user }) => {

    const { displayName, userRole, classrooms } = user;

    console.log(classrooms);
    

    
    


    return (
        <div className="col-span-2 row-span-2 border rounded-md bg-gradient-to-r from-orange-500 to-purple-500 p-[3px]">
            <div className=" h-full w-full  bg-white  rounded flex flex-col ">
               
                <div className='p-4 w-full flex justify-start items-center'>
                    <span className='bg-zinc-100 border px-4 py-0.5 rounded-md'>{user.displayName}</span>
                </div>
              <div className='flex flex-col gap-y-1'>
              <div className='p-4 flex bg-zinc-100 items-center gap-x-5 '>
                    <span> Profil Tipi : </span>
                   <span  >
                    {user?.userRole === "teacher" ? <div className='flex items-center gap-x-5'><span>Öğretmen</span><FaChalkboardTeacher size={"24px"} /></div> : <div className='flex items-center gap-x-5'><span>Öğrenci</span><PiStudentFill size={"24px"} /></div>} 
                    </span>
                </div>
                <div className='p-4 flex bg-zinc-100 items-center gap-x-5'>
                    <span>{user?.userRole === "student" ? "Ait Olduğum Sınıf Sayısı : " : "Sınıflarımın Sayısı : "}</span> <span>{user?.classrooms?.length}</span>
                </div>
              </div>
               
                    {/* <Link to="/profile" className='text-center text-md px-2 py-4 bg-yellow-300 rounded-md'>Profilimi Düzenle</Link> */}
               
            </div>
        </div>
    )
}

export default MyProfileHome