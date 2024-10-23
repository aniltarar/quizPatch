import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getExamPaperByUserID } from '~/redux/slices/resultSlice';
import { getExamByExamID } from '~/redux/slices/examSlice';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '~/firebase/firebaseConfig';

const ResultsDetail = () => {

    const dispatch = useDispatch();
    const { id } = useParams(); // examPaperID
    const { user } = useSelector(state => state.user);
    const { currentExam } = useSelector((state) => state.exam);
    const { examPaper, correctAnswers } = useSelector((state) => state.result);

    const [point, setPoint] = useState(0)
    const [studentCorrectAnswers, setStudentCorrectAnswers] = useState(0)
    const [examPoint,setExamPoint] = useState(0)


    const filteredExamPaper = examPaper?.find((paper) => paper.id === id);
    const filteredCorrectAnswers = correctAnswers?.find((answer) => answer.id === filteredExamPaper?.examID);

        useEffect(() => {
        dispatch(getExamPaperByUserID(user.uid));
        dispatch(getExamByExamID(filteredExamPaper?.examID));
    }, []);

    const { questionsAnswers } = filteredCorrectAnswers; // doğru cevaplar
    const userAnswers = filteredExamPaper?.myAnswers.map((answer) => answer.answer);

        
    const setResult = async (examPoint) => {
        try{
            const examPaperRef = doc(db, "examPapers", id)
            
            await updateDoc(examPaperRef, {
                ...filteredExamPaper,
                examPoint: examPoint
            })
            console.log("Exam Point added successfully");
        }
        catch(err){
            console.log(err);   
        }
    }




     useEffect(() => {

  let correctAnswersCount = 0;
  questionsAnswers.forEach((answer, idx) => {
    if (answer === userAnswers[idx]) {
      correctAnswersCount++;
    }

    setExamPoint((correctAnswersCount/questionsAnswers.length)*100)
  });

  setStudentCorrectAnswers(correctAnswersCount);
  setResult(examPoint);
}, [questionsAnswers, userAnswers]);





    return (
        <div className="container mx-auto mt-4 p-4">
               <div className='w-full py-2 text-zinc-700'>
              <Link to="/results" className='hover:text-zinc-400'>Sonuçlarım</Link> / <span className='text-zinc-500'>Detay</span>
        </div>
            <h1 className="text-2xl font-bold mb-4">{filteredExamPaper?.examName}</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className='grid grid-cols-5 w-full'>
                        <th className="py-2 px-4 border-b text-left">#</th>
                        <th className="py-2 px-4 border-b text-left">Soru Açıklaması</th>
                        <th className="py-2 px-4 border-b text-left">Doğru Cevap</th>
                        <th className="py-2 px-4 border-b text-left">Sizin Cevabınız</th>
                        <th className="py-2 px-4 border-b text-left">Sonuç</th>
                    </tr>
                </thead>
                <tbody>
                    {currentExam?.questions?.map((question, index) => (
                        <tr key={index} className='grid grid-cols-5 w-full'>
                            <td className="py-2 px-4 border-b text-left">{index + 1}</td>
                            <td className="py-2 px-4 border-b">{question?.examQuestionName}</td>
                            <td className="py-2 px-4 border-b">{`${questionsAnswers[index]}`}</td>
                            <td className="py-2 px-4 border-b">{userAnswers[index]}</td>
                            <td className="py-2 px-4 border-b text-left">
                                {questionsAnswers[index] === userAnswers[index] ? <span className='text-green-500 font-medium'>Doğru</span> : <span className='text-red-500 font-medium'>Yanlış</span>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultsDetail;
