import React from 'react'

const ClassItem = ({ classroom }) => {


    return (
        <div className='w-full bg-zinc-100 flex flex-col gap-y-5 h-full rounded-xl p-2'>
            <span className='px-4 py-2 border-2 rounded-md m-2 hover:bg-zinc-200'>Sınıf Adı : {classroom?.className}</span>
            <span className='px-4 py-2 border-2 rounded-md m-2 hover:bg-zinc-200'>Öğretmen Sayısı : {classroom?.teachers.length}  </span>
            <span className='px-4 py-2 border-2 rounded-md m-2 hover:bg-zinc-200'>Sınıf Mevcutu : {classroom?.students.length}</span>
            <span className='px-4 py-2 border-2 rounded-md m-2 hover:bg-zinc-200'>Sınıf Açıklaması : {classroom?.classDescription}</span>
        </div>
    )
}

export default ClassItem