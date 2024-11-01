
import React from 'react';
import { MdSchool } from 'react-icons/md';

const ClassroomBox = ({ classroom }) => {
    const { className, classDesc, selectedTeacher, selectedStudent,exams } = classroom;

    return (
        <div className='flex flex-col border p-3 h-full'> {/* h-full eklendi */}
            <div className='flex items-center gap-x-3 border-b-2'>
                <MdSchool size={50} />
                <h1 className='text-xl'>{className}</h1>
            </div>

            <div className='flex flex-col gap-y-3'>
                <p>{classDesc.slice(0, 200)}...</p>
                <p>Öğretmen sayısı: {selectedTeacher.length}</p>
                <p>Öğrenci sayısı: {selectedStudent.length}</p>
                <p>Sınav Sayisi : {exams?exams.length:"Henüz Sınav Eklenmemiş"}</p>
            </div>
        </div>
    );
};

export default ClassroomBox;
