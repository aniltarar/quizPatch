import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getExamByExamID } from '~/redux/slices/examSlice';
import { setResults } from '~/redux/slices/resultSlice';
import { toast } from 'react-toastify';
import { arrayUnion, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '~/firebase/firebaseConfig';

const EnterExam = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentExam } = useSelector(state => state.exam);
  const { user } = useSelector(state => state.user);
  const { results } = useSelector(state => state.result);
  
  const { register, handleSubmit, setValue, getValues } = useForm();
  const { questions = [], className, examName, examTime, enteredStudents } = currentExam;
  
  
  
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState(examTime);  
  
  useEffect(() => {
    dispatch(getExamByExamID(id));
  }, [dispatch, id]);


 useEffect(() => {
    setRemainingTime(currentExam.examTime);  
  }, [currentExam]);

  useEffect(() => {
    if (remainingTime > 0) {
      const interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000); 

      return () => clearInterval(interval); 
    } else if (remainingTime === 0) {
      toast.warning("Süre doldu, sınav gönderiliyor...");
      onSubmit()
      navigate("/results")
    }
  }, [remainingTime]);



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

  const onSubmit = async() => {
    const myResult = ({
      examID: id,
      userID: user.uid,
      examName: examName,
      myAnswers: answers,
    })
   try {
     const examPaperRef = doc(collection(db,"examPapers"));
     const examRef = doc(db, "exams", id)
     
    
     await setDoc(examPaperRef, {
      id: examPaperRef.id,
      ...myResult
     });

     await setDoc(examRef, {
       ...currentExam,
       enteredStudents : arrayUnion(user.uid)
     },{merge:true})

     toast.success("Sınavınız başarıyla gönderildi.");
      navigate("/results")
   } catch (error) {
      toast.error(error.message)
   }

  };

  const isEntered = enteredStudents?.includes(user.uid);


  if (isEntered) {

    setTimeout(() => {
      navigate("/results")
    }, 3000);


    return (
      <div className='px-4 py-2 w-full bg-red-100 text-red-500 '>Daha önce bu sınav çözülmüş, Sonuçlarınıza yönlendiriliyorsunuz.</div>
    )
  }



  return (
    <div className="w-full flex-grow flex justify-start items-start p-5 flex-col gap-y-5">
      <div className="flex justify-between items-center w-full">
        <h1 className="font-semibold text-3xl">{examName}</h1>
        {remainingTime ? <h1 className="font-semibold text-3xl">{remainingTime}</h1> : <h1 className="font-semibold text-3xl">Süre Doldu</h1>}
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
