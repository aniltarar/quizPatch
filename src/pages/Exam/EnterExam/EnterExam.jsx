import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getExamByExamID } from '~/redux/slices/examSlice';
import { setResults } from '~/redux/slices/resultSlice';
import { toast } from 'react-toastify';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '~/firebase/firebaseConfig';

const EnterExam = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentExam } = useSelector(state => state.exam);
  const { user } = useSelector(state => state.user);
  const { results } = useSelector(state => state.result);
  const { register, handleSubmit, setValue, getValues } = useForm();

  useEffect(() => {
    dispatch(getExamByExamID(id));
  }, [dispatch, id]);

  const { questions = [], className, examName, examTime } = currentExam;
  const [time, setTime] = useState(examTime);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [examTime]);

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      const nextAnswer = getValues(`answers.${questions[currentIndex + 1].id}`);
      setSelectedAnswer(nextAnswer || null);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      const prevAnswer = getValues(`answers.${questions[currentIndex - 1].id}`);
      setSelectedAnswer(prevAnswer || null);
    }
  };

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
    setAnswers([...answers, { questionID: questions[currentIndex].id, answer }]);
  };

  const onSubmit = async(data) => {
    const myResult = ({
      examID: id,
      userID: user.uid,
      examName: examName,
      myAnswers: answers,
    })
   try {
     const examPaperRef = doc(collection(db,"examPapers"));

     const paperData = {
      id : examPaperRef.id,
      ...myResult
     }

     await setDoc(examPaperRef, paperData);
     toast.success("Sınavınız başarıyla gönderildi.");
   } catch (error) {
      toast.error(error.message)
   }

  };

  return (
    <div className="w-full flex-grow flex justify-start items-start p-5 flex-col gap-y-5">
      <div className="flex justify-between items-center w-full">
        <h1 className="font-semibold text-3xl">{examName}</h1>
        {time ? <h1 className="font-semibold text-3xl">{time}</h1> : <h1 className="font-semibold text-3xl">Yükleniyor</h1>}
      </div>

      {questions.length > 0 && (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-y-5">
          <div key={questions[currentIndex].id} className='w-full p-4 flex flex-col gap-y-5'>
            <h2 className="text-2xl font-semibold">{questions[currentIndex].index + 1}{") "} {questions[currentIndex].examQuestionName}</h2>
            <div className='w-full grid grid-cols-2 gap-5'>
              <button
                type="button"
                onClick={() => handleSelectAnswer(questions[currentIndex].optionA)}
                className={`${selectedAnswer === questions[currentIndex].optionA ? "bg-blue-500 text-white" : "bg-white"} w-full px-4 py-2 rounded-md border transition-colors`}
              >
                {"A) "}{questions[currentIndex].optionA}
              </button>

              <button
                type="button"
                onClick={() => handleSelectAnswer(questions[currentIndex].optionB)}
                className={`${selectedAnswer === questions[currentIndex].optionB ? "bg-blue-500 text-white" : "bg-white"} w-full px-4 py-2 rounded-md border transition-colors`}
              >
                {"B) "}{questions[currentIndex].optionB}
              </button>

              <button
                type="button"
                onClick={() => handleSelectAnswer(questions[currentIndex].optionC)}
                className={`${selectedAnswer === questions[currentIndex].optionC ? "bg-blue-500 text-white" : "bg-white"} w-full px-4 py-2 rounded-md border transition-colors`}
              >
                {"C) "}{questions[currentIndex].optionC}
              </button>

              <button
                type="button"
                onClick={() => handleSelectAnswer(questions[currentIndex].optionD)}
                className={`${selectedAnswer === questions[currentIndex].optionD ? "bg-blue-500 text-white" : "bg-white"} w-full px-4 py-2 rounded-md border transition-colors`}
              >
                {"D) "}{questions[currentIndex].optionD}
              </button>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handlePreviousQuestion}
              disabled={currentIndex === 0}
              className="bg-gray-500 text-white px-6 py-2 rounded"
            >
              Geri
            </button>

            <button
              type="button"
              onClick={handleNextQuestion}
              disabled={currentIndex === questions.length - 1}
              className={`bg-blue-500 text-white px-6 py-2 rounded disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-100`}
            >
              İleri
            </button>
          </div>

          {currentIndex === questions.length - 1 && (
            <button type="submit" className="mt-5 bg-green-500 text-white px-6 py-2 rounded">
              Gönder
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default EnterExam;
