import React from 'react'

const ClassItem = ({classroom}) => {
    
    console.log(classroom);

  return (
    <div className='w-full bg-zinc-50 flex flex-col gap-y-5 h-full'>
    <span className='px-4 py-2 border rounded-md'>{classroom.className}</span>
    <span>Öğretmenler : </span>
    <span>Sınıf Mevcutu : {classroom.students.length}</span>
    
    </div>
  )
}

export default ClassItem