import React,{useState} from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const RightSide = ({setExamQuestions,examQuestion}) => {


    const { user } = useSelector(state => state.user)
    const { userClassrooms } = useSelector(state => state.classrooms);
    const { register, handleSubmit, reset } = useForm()

    const dispatch = useDispatch();

    const addQuestions = (data) => {
      // data'ya her soru için id verilmesi gerekiyor.
      // id'yi random bir şekilde oluşturup data'ya ekleyebilirsin.
      const questionID = Math.random().toString(36).substr(2, 9);

      const newData = {
        ...data,
        id: questionID,
      }
        try {
          setExamQuestions(prev => [...prev,newData]);
          reset(); 
        } catch (error) {
          console.log(error);
        }
      };
      

  return (
<div className="rigthSide flex flex-col  gap-y-3 w-1/2  h-full">
                  <form className='flex flex-col p-3 gap-y-5 bg-white rounded-md w-full' onSubmit={handleSubmit(addQuestions)}>
                  <h1 className='text-sm font-semibold' >Soru Ekle</h1>
                    <input className='px-4 py-2 rounded-md border' {...register("examQuestionName")} placeholder='Sınav Sorusu' />
                    <div className="examName grid grid-cols-2 gap-4">
                        <div className="option flex gap-x-2">
                            <input type="text" placeholder='A Şıkkı' {...register("optionA")} className='w-full border  px-4 py-2 rounded-md outline-none' />
                            <input type="radio" id="a" value="optionA" name="options" {...register("correctAnswer")} />
                        </div>
                        <div className="option flex gap-x-2">
                            <input type="text" placeholder='B Şıkkı' {...register("optionB")} className='w-full border  px-4 py-2 rounded-md outline-none' />
                            <input type="radio" id="b" value="optionB" name="options" {...register("correctAnswer")} />
                        </div>
                        <div className="option flex gap-x-2">
                            <input type="text" placeholder='C Şıkkı' {...register("optionC")} className='w-full border  px-4 py-2 rounded-md outline-none' />
                            <input type="radio" id="c" value="optionC" name="options" {...register("correctAnswer")} />
                        </div>
                        <div className="option flex gap-x-2">
                            <input type="text" placeholder='D Şıkkı' {...register("optionD")} className='w-full border px-4 py-2 rounded-md outline-none' />
                            <input type="radio" id="d" value="optionD" name="options" {...register("correctAnswer")} />
                        </div>
                        <button className='px-2 py-2 bg-green-500 col-span-2 text-white rounded-md'>Soruyu Ekle</button>
                    </div>
                  </form>
                </div>
  )
}

export default RightSide