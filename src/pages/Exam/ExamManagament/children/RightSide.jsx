import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const RightSide = ({ setExamQuestions, examQuestion, questionIndex, setQuestionIndex }) => {

    const { user } = useSelector(state => state.user);
    const { userClassrooms } = useSelector(state => state.classrooms);
    const { register, handleSubmit, reset, watch } = useForm(); // watch ile form değerlerini izleyebilirsin

    const dispatch = useDispatch();

    const addQuestions = (data) => {
        try {
            const correctAnswerValue = data[data.correctAnswer];

            const questionData = {
                examQuestionName: data.examQuestionName,
                optionA: data.optionA,
                optionB: data.optionB,
                optionC: data.optionC,
                optionD: data.optionD,
                correctAnswer: correctAnswerValue, // Doğru cevabın değeri burada
                id: Math.random().toString(36).substr(2, 9), // Rastgele bir ID
                index: questionIndex,
            };

            setExamQuestions(prev => [...prev, questionData]);
            setQuestionIndex(prev => prev + 1);
            reset(); // Formu sıfırlama
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="rigthSide flex flex-col gap-y-3 w-1/2 h-full border bg-white ">
            <form className='flex flex-col  justify-between h-full p-3 gap-y-5 rounded-md w-full ' onSubmit={handleSubmit(addQuestions)}>
                <h1 className='text-2xl font-semibold '>Yeni Soru Ekle</h1>
                <input className='px-4 py-2 rounded-md border' {...register("examQuestionName", {required:true})} placeholder='Sınav Sorusu' />
                <div className="examName grid grid-cols-2 gap-4">
                    <div className="option flex gap-x-2">
                        <input type="text" placeholder='A Şıkkı' {...register("optionA")} className='w-full border px-4 py-2 rounded-md outline-none' />
                        <input type="radio" id="a" value="optionA" name="options" {...register("correctAnswer",{required:true})} />
                    </div>
                    <div className="option flex gap-x-2">
                        <input type="text" placeholder='B Şıkkı' {...register("optionB")} className='w-full border px-4 py-2 rounded-md outline-none' />
                        <input type="radio" id="b" value="optionB" name="options" {...register("correctAnswer",{required:true})} />
                    </div>
                    <div className="option flex gap-x-2">
                        <input type="text" placeholder='C Şıkkı' {...register("optionC")} className='w-full border px-4 py-2 rounded-md outline-none' />
                        <input type="radio" id="c" value="optionC" name="options" {...register("correctAnswer",{required:true})} />
                    </div>
                    <div className="option flex gap-x-2">
                        <input type="text" placeholder='D Şıkkı' {...register("optionD")} className='w-full border px-4 py-2 rounded-md outline-none' />
                        <input type="radio" id="d" value="optionD" name="options" {...register("correctAnswer", {required:true})} />
                    </div>
                    <button className='px-2 py-2 bg-green-500 col-span-2 text-white rounded-md just'>Soruyu Ekle</button>
                </div>
            </form>
        </div>
    )
}

export default RightSide;
