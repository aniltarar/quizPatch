import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";

const StudentCard = ({ student, setClassMembers, resetSelected }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    if (!isSelected) {
      setIsSelected(true);
      setClassMembers((prevState) => ({
        ...prevState,
        students: [...prevState.students, student],
      }));
    } else {
      setIsSelected(false);
      setClassMembers((prevState) => ({
        ...prevState,
        students: prevState.students.filter((s) => s.uid !== student.uid),
      }));
    }
  };

  useEffect(() => {
    if (resetSelected) {
      setIsSelected(false);
    }
  }, [resetSelected]);

  return (
    <div className="flex flex-col justify-start items-center gap-y-2 border-2 rounded-md p-2 w-full">
      <div className='flex justify-start items-center w-full gap-x-2'>
        <img
          className='w-12 border-2 border-zinc-300 rounded-md'
          src="https://g-5gtdbckj6m3.vusercontent.net/placeholder-user.jpg"
          alt="Student Avatar"
        />
        <div className='w-full flex flex-col justify-center items-start'>
          <h1 className='text-sm'>{student?.displayName}</h1>
          <p className='text-xs'>{student?.userRole === "student" ? "Öğrenci" : null}</p>
        </div>
      </div>
      <button
        type='button'
        onClick={handleSelect}
        className={`bg-black hover:bg-black/90 ${isSelected ? "bg-orange-600 hover:bg-orange-500" : "bg-black"} text-white w-full flex justify-center items-center py-1 rounded-md gap-x-2 transition-colors`}
      >
        <IoMdAdd size={17} /> <span>{isSelected ? "Çıkar" : "Ekle"}</span>
      </button>
    </div>
  );
};

export default StudentCard;
