import React from 'react'

const ClassItem = ({ classroom }) => {
    // öğretmenlere spli ile , ekle
    


    return (
        <div className='w-full bg-zinc-100 flex flex-col gap-y-5 h-full rounded-xl p-2'>
            <span className='px-4 py-2 border-2 rounded-md m-2 hover:bg-zinc-200'>Sınıf Adı : {classroom?.className}</span>
            <span className='px-4 py-2 border-2 rounded-md m-2 hover:bg-zinc-200'>Öğretmen Sayısı : {classroom?.teachers.map((teacher) =>  teacher.displayName ).join(",")}  </span>
            <span className='px-4 py-2 border-2 rounded-md m-2 hover:bg-zinc-200'>Sınıf Mevcutu : {classroom?.students.map((student) =>  student.displayName ).join(",")}</span>
            <span className='px-4 py-2 border-2 rounded-md m-2 hover:bg-zinc-200'>Sınıf Açıklaması : {classroom?.classDescription}</span>
        </div>
    )
}

export default ClassItem