import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { db } from "~/firebase/firebaseConfig";
import { getExamDetailByID } from "~/redux/slices/examSlice";




const QuestionAddModal = ({ setIsAddMode }) => {


    const { id } = useParams();
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const { register, handleSubmit } = useForm();



    const addQuestion = async (data) => {
        try {
            const examRef = doc(db, "exams", id);
            const exam = await getDoc(examRef);
            const questionData = exam.data().questions

            const questionID = Math.random().toString(36).substr(2, 9);

            const newQuestion = {
                examQuestionName: data.examQuestionName,
                optionA: data.optionA,
                optionB: data.optionB,
                optionC: data.optionC,
                optionD: data.optionD,
                correctAnswer: data.correctAnswer,
                id: questionID
            }


            await updateDoc(examRef, {
                questions: [...questionData, newQuestion]
            })

            console.log("eklendi.");
            console.log(newQuestion);
            setIsAddMode(false)
            dispatch(getExamDetailByID(id))
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="relative z-10">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"  ></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900 mb-4" >Soru Ekle - </h3>
                                    <form className="flex flex-col  gap-y-5 bg-white rounded-md w-full" onSubmit={handleSubmit(addQuestion)}>
                                        <input
                                            className="px-4 py-2 rounded-md border"
                                            placeholder="Sınav Sorusu"
                                            type="text"
                                            {...register("examQuestionName")}
                                        />
                                        <div className="examName grid grid-cols-2 gap-4">
                                            <div className="option flex gap-x-2">
                                                <input
                                                    type="text"
                                                    placeholder="A Şıkkı"
                                                    className="w-full border px-4 py-2 rounded-md outline-none"
                                                    {...register("optionA")}
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
                                                    className="w-full border px-4 py-2 rounded-md outline-none"
                                                    {...register("optionB")}
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
                                                    className="w-full border px-4 py-2 rounded-md outline-none"
                                                    {...register("optionC")}
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
                                                    className="w-full border px-4 py-2 rounded-md outline-none"
                                                    {...register("optionD")}
                                                />
                                                <input
                                                    type="radio"
                                                    id="d"
                                                    value="optionD"
                                                    {...register('correctAnswer')}
                                                />
                                            </div>
                                            <button type="submit" className="mt-3 w-full inline-flex  justify-center rounded-md bg-green-500 text-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto">Ekle</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-x-2">
                            <button onClick={() => setIsAddMode(false)} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Vazgeç</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default QuestionAddModal