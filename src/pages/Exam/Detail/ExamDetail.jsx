import { doc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { db } from '~/firebase/firebaseConfig'
import { getExamDetailByID } from '~/redux/slices/examSlice'
import { toast } from 'react-toastify'
import QuestionAddModal from '~/components/UI/Modals/Exam/QuestionAddModal'
import LoaderSpinner from '~/components/UI/LoaderSpinner'

const ExamDetail = () => {
    const dispatch = useDispatch()
    const { currentExam, isLoading } = useSelector((state) => state.exam)
    const { id } = useParams()

    const [isAddMode, setIsAddMode] = useState(false)

    const { questions } = currentExam
    const [selectedQuestion, setSelectedQuestion] = useState(null)

    const { register, handleSubmit, reset } = useForm(
        { defaultValues: selectedQuestion }
    )


    useEffect(() => {
        dispatch(getExamDetailByID(id))
    }, [])





useEffect(() => {
    if (selectedQuestion) {
        const correctAnswerKey = Object.keys(selectedQuestion).find(
            key => selectedQuestion[key] === selectedQuestion.correctAnswer && key.startsWith('option')
        );

        reset({
            ...selectedQuestion,
            correctAnswer: correctAnswerKey
        });
    }
}, [selectedQuestion, reset]);

    const saveExam = async (data) => {
        try {
            const examRef = doc(db, 'exams', id)
          await updateDoc(examRef, {
                 questions: questions.map((question) => {
                    if (question.id === selectedQuestion.id) {
                    return {
                        ...question,
                        ...data,
                        correctAnswer: data.correctAnswer === 'optionA' ? data.optionA : data.correctAnswer === 'optionB' ? data.optionB : data.correctAnswer === 'optionC' ? data.optionC : data.optionD
                    };
        }
        return question;
    })
});
            toast.success('Soru başarıyla güncellendi')
            dispatch(getExamDetailByID(id))
        } catch (error) {
            toast.error('Soru güncellenirken bir hata oluştu')
        }
    }

    const deleteQuestion = async (questionID) => {
        try {
            if (confirm('Silmek istediğinize emin misiniz?')) {

                const examRef = doc(db, 'exams', id)
                await updateDoc(examRef, {
                    questions: questions.filter((question) => question.id !== questionID)
                })
            }
            toast.success('Soru başarıyla silindi')
            dispatch(getExamDetailByID(id))
        } catch (error) {
            toast.error('Soru silinirken bir hata oluştu')
        }
    }


    if (isLoading) {
        return (
            <LoaderSpinner/>
        )
    }


    return (
        <>

            <h1 className='text-5xl p-5'>Sınavın Adı : {currentExam.examName}</h1>
            {isAddMode && <QuestionAddModal setIsAddMode={setIsAddMode} />}
            <div className="w-full flex gap-x-5 p-3  ">
                <div className="w-1/2 border flex flex-col p-5 gap-y-5 rounded-md bg-white ">
                    <div className='w-full flex justify-between items-center'>
                        <h1 className="text-3xl font-semibold">Sorular</h1>
                        <button onClick={() => setIsAddMode(true)} className='px-4 py-2 rounded-md bg-green-500 text-white border-green-200 border hover:bg-green-700'>Yeni Soru Ekle</button>
                    </div>

                    <div className="py-2 px-5 text-black flex flex-col gap-y-3 ">
                        {questions?.map((question, index) => (
                            <div key={index} className="w-full flex justify-between items-center border-b-2 pb-2 ">
                                <div>
                                    <span>{question.examQuestionName}</span>
                                </div>
                                <div className="flex gap-2">
                                    <button className='bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-700' onClick={() => setSelectedQuestion(question)}>Düzenle</button>
                                    <button className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700' onClick={() => deleteQuestion(question.id)}>Sil</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-1/2 flex justify-center items-center h-full ">
                    <form className="flex flex-col p-3 gap-y-5 border bg-white rounded-md w-full h-full" onSubmit={handleSubmit(saveExam)}>
                        <h1 className="text-3xl font-semibold">Soruyu Güncelle</h1>
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
                                Güncelle
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ExamDetail

