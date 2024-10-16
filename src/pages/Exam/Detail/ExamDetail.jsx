import { doc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { db } from '~/firebase/firebaseConfig'
import { getExamDetailByID } from '~/redux/slices/examSlice'
import { toast } from 'react-toastify'
import QuestionAddModal from '~/components/UI/Modals/Exam/QuestionAddModal'

const ExamDetail = () => {
    const dispatch = useDispatch()
    const { currentExam } = useSelector((state) => state.exam)
    const { id } = useParams()

    const [isAddMode, setIsAddMode] = useState(false)


    useEffect(() => {
        dispatch(getExamDetailByID(id))
    }, [])

    const { questions } = currentExam
    const [selectedQuestion, setSelectedQuestion] = useState(null)

    const { register, handleSubmit, reset } = useForm(
        { defaultValues: selectedQuestion }
    )

    useEffect(() => {
        if (selectedQuestion) {
            reset(selectedQuestion)
        }
    }, [selectedQuestion, reset])

    const saveExam = async (data) => {
        try {
            const examRef = doc(db, 'exams', id)
            await updateDoc(examRef, {
                questions: questions.map((question) => {
                    if (question.id === selectedQuestion.id) {
                        return {
                            ...question,
                            ...data
                        }
                    }
                    return question
                })
            })
            toast.success('Soru başarıyla güncellendi')
            dispatch(getExamDetailByID(id))
        } catch (error) {
            toast.error('Soru güncellenirken bir hata oluştu')
        }
    }

    const deleteQuestion = async (questionID) => {
        try {
            const examRef = doc(db, 'exams', id)
            await updateDoc(examRef, {
                questions: questions.filter((question) => question.id !== questionID)
            })
            toast.success('Soru başarıyla silindi')
            dispatch(getExamDetailByID(id))
        } catch (error) {
            toast.error('Soru silinirken bir hata oluştu')
        }
    }




    return (
        <>
        <h1>Sınavın Adı : {currentExam.examName}</h1>
        {isAddMode && <QuestionAddModal setIsAddMode={setIsAddMode}/>}
        <div className="w-full flex gap-x-5">
            <div className="w-1/2 border flex flex-col p-5 gap-y-5">
                <div className='w-full flex justify-between items-center'>
                <h1 className="text-4xl font-semibold">Sorular</h1>
                <button onClick={() => setIsAddMode(true)} className='px-4 py-2 rounded-md bg-green-500 text-white border-green-200 border'>ekle</button>
                </div>

                <div className="py-2 px-5 text-black">
                    {questions?.map((question, index) => (
                        <div key={index} className="w-full flex justify-between items-center">
                            <div>
                                <span>{question.examQuestionName}</span>
                            </div>
                            <div className="flex gap-x-2">
                                <button onClick={() => setSelectedQuestion(question)}>düzenle</button>
                                <button onClick={() => deleteQuestion(question.id)}>sil</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-1/2 flex justify-center items-center bg-blue-500">
                <form className="flex flex-col p-3 gap-y-5 bg-white rounded-md w-full" onSubmit={handleSubmit(saveExam)}>
                    <h1 className="text-sm font-semibold">"güncelle</h1>
                    <input
                        className="px-4 py-2 rounded-md border"
                        placeholder="Sınav Sorusu"
                        {...register('examQuestionName')}
                    />
                    <div className="examName grid grid-cols-2 gap-4">
                        <div className="option flex gap-x-2">
                            <input
                                type="text"
                                placeholder="A Şıkkı"
                                {...register('optionA')}
                                className="w-full border px-4 py-2 rounded-md outline-none"
                            />
                            <input
                                type="radio"
                                id="a"
                                value="optionA"
                                {...register('correctAnswer')}
                            />
                        </div>
                        <div className="option flex gap-x-2">
                            <input
                                type="text"
                                placeholder="B Şıkkı"
                                {...register('optionB')}
                                className="w-full border px-4 py-2 rounded-md outline-none"
                            />
                            <input
                                type="radio"
                                id="b"
                                value="optionB"
                                {...register('correctAnswer')}
                            />
                        </div>
                        <div className="option flex gap-x-2">
                            <input
                                type="text"
                                placeholder="C Şıkkı"
                                {...register('optionC')}
                                className="w-full border px-4 py-2 rounded-md outline-none"
                            />
                            <input
                                type="radio"
                                id="c"
                                value="optionC"
                                {...register('correctAnswer')}
                            />
                        </div>
                        <div className="option flex gap-x-2">
                            <input
                                type="text"
                                placeholder="D Şıkkı"
                                {...register('optionD')}
                                className="w-full border px-4 py-2 rounded-md outline-none"
                            />
                            <input
                                type="radio"
                                id="d"
                                value="optionD"
                                {...register('correctAnswer')}
                            />
                        </div>
                        <button className="px-2 py-2 bg-green-500 col-span-2 text-white rounded-md">
                            güncelle
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default ExamDetail

