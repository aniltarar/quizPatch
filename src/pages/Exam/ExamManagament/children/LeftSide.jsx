import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getClassromByUserID } from '~/redux/slices/classSlice';
import { addToExam,  } from '~/redux/slices/examSlice';
import { toast } from 'react-toastify';

const LeftSide = ({ examQuestions,setExamQuestions }) => {

    const dispatch = useDispatch();
    const { userClassrooms } = useSelector(state => state.classrooms);
    const { user } = useSelector(state => state.user)
    const { register, handleSubmit, reset } = useForm()
    const [examTime, setExamTime] = useState(60);
  

    const addExam = (data) => {
        try {
            const { id: classroomID, className } = JSON.parse(data.classroomInfo);
            const examFullData = {
                ...data,
                examTime: Number(examTime),
                questions: examQuestions,
                addedUser: user.uid,
                classroomID, 
                className
            }
            delete examFullData.classroomInfo; 
            dispatch(addToExam(examFullData));
            setExamQuestions([])
            reset();
            toast.success('Sınav başarıyla oluşturuldu');
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        dispatch(getClassromByUserID(user.uid));
    },[])

    const isValid = examQuestions.length >= 1;

    return (
        <form className="flex flex-col p-3 gap-y-5 bg-white rounded-md w-1/2 border" onSubmit={handleSubmit(addExam)}>
            <div className="flex flex-col gap-y-1">
                <label className='font-semibold text-sm'>Sınıf Seçin</label>
                <select {...register("classroomInfo")} className='border px-4 py-2 rounded-md'>
                    <option value="">Seçiniz...</option>
                    {userClassrooms.map((classroom) => (
                        <option
                            key={classroom.id}
                            value={JSON.stringify({ id: classroom.id, className: classroom.className })}
                        >
                            {classroom.className}
                        </option>
                    ))}
                </select>
            </div>
            <div className="selectClassroom flex flex-col gap-y-1">
                <label className='font-semibold text-sm'>Sınavın Adı</label>
                <input
                    type="text"
                    className='px-4 py-2 rounded-md border'
                    {...register("examName")}
                    placeholder='Sınav Adını Giriniz...'
                />
            </div>
            <div className="selectClassroom flex flex-col gap-y-1">
                <label>Sınavın Süresi (Dakika Bazında)</label>
                <input
                    className='px-4 py-2 rounded-md border outline-none bg-zinc-100'
                    value={examTime}
                    disabled
                    step={5}
                    type="number"
                    max={180}
                    min={5}
                    onChange={(e) => setExamTime(e.target.value)}
                />
                <input
                    type="range"
                    step={5}
                    max={180}
                    min={5}
                    onChange={(e) => setExamTime(e.target.value)}
                />
            </div>
            <button
                type='submit'
                className={`px-4 py-2 rounded-md text-white transition-colors ${isValid ? 'bg-blue-500' : "bg-neutral-300 text-zinc-400 "}`}
                disabled={!isValid}
            >
                {!isValid?"En az 4 soru eklenmesi gerekmektedir":"Sınavı Oluştur"} 
            </button>
        </form>
    )
}

export default LeftSide;
