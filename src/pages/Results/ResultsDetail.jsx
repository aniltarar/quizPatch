import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCorrectAnswersByExamID, getExamPaperByExamPaperID, } from '~/redux/slices/resultSlice';
import { getExamByExamID } from '~/redux/slices/examSlice';
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '~/firebase/firebaseConfig';
import LoaderSpinner from '~/components/UI/LoaderSpinner';


const ResultsDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // examPaperID
  const { user } = useSelector(state => state.user);
  const { currentExam } = useSelector(state => state.exam);
  const { examPaper, correctAnswers, isLoading } = useSelector(state => state.result);

  const [studentCorrectAnswers, setStudentCorrectAnswers] = useState(0);
  const [examPoint, setExamPoint] = useState(0);

  const examID = examPaper?.examID;

  const fetchExam = async () => {
    if (!examID) return;
    try {
      const examRef = doc(db, "exams", examID);
      const examDoc = await getDoc(examRef);
      const examData = examDoc.data();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getExamPaperByExamPaperID(id));

  }, [dispatch, id]);

  useEffect(() => {
    fetchExam();
  }, [examID]);

  useEffect(() => {
    dispatch(getCorrectAnswersByExamID(examID))
  }, [dispatch, examID]);

  useEffect(() => {
    dispatch(getExamByExamID(examID))
  }, [dispatch, examID])

  const userAnswers = examPaper?.myAnswers?.map((answer) => answer.answer);
  const { questionsAnswers } = correctAnswers || {}; // doğru cevaplar


  useEffect(() => {
    if (questionsAnswers && userAnswers) {
      let correctAnswersCount = 0;
      questionsAnswers.forEach((answer, idx) => {
        if (answer === userAnswers[idx]) {
          correctAnswersCount++;
        }
      });
      const calculatedExamPoint = (correctAnswersCount / questionsAnswers.length) * 100;
      setExamPoint(calculatedExamPoint);
      setStudentCorrectAnswers(correctAnswersCount);
      setResult(calculatedExamPoint);
    }
  }, [questionsAnswers, userAnswers]);



  // ExamPaper içerisindeki examPoint alanını güncelle
  const setResult = async (calculatedExamPoint) => {
    try {
      const examPaperRef = doc(db, "examPapers", id);
      await updateDoc(examPaperRef, {
        examPoint: calculatedExamPoint
      });
    } catch (err) {
      console.log(err);
    }
  };



  if (isLoading) {
    return (
      <LoaderSpinner />
    )
  }

  return (
    <div className="container mx-auto mt-4 p-4">
      <div className='w-full py-2 text-zinc-700'>
        <Link to="/results" className='hover:text-zinc-400'>Sonuçlarım</Link> / <span className='text-zinc-500'>Detay</span>
      </div>
      <h1 className="text-2xl font-bold mb-4">{examPaper?.examName}</h1>
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
              <td className="py-2 px-4 border-b">{questionsAnswers[index] || "—"}</td>
              <td className="py-2 px-4 border-b">
                {userAnswers[index] === "empty" ? "Boş Bırakıldı" : userAnswers[index]}
              </td>
              <td className="py-2 px-4 border-b text-left">
                {questionsAnswers[index] === userAnswers[index] ? (
                  <span className='text-green-500 font-medium'>Doğru</span>
                ) : userAnswers[index] === "empty" ? (
                  <span className='text-orange-500 font-medium'>Boş Bırakıldı</span>
                ) : (
                  <span className='text-red-500 font-medium'>Yanlış</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='w-full px-4 py-2 rounded-md bg-white border mt-3'>
        Sınav Notunuz : {examPoint.toFixed(2)}
      </div>
    </div>
  );
};

export default ResultsDetail;
