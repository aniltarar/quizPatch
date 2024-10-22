import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getExamPaperByUserID } from '~/redux/slices/resultSlice';
import { getExamByExamID } from '~/redux/slices/examSlice';

const ResultsDetail = () => {

    const dispatch = useDispatch();
    const { id } = useParams(); // examPaperID
    const { user } = useSelector(state => state.user);
    const { currentExam } = useSelector((state) => state.exam);
    const { examPaper, correctAnswers } = useSelector((state) => state.result);

    const filteredExamPaper = examPaper?.find((paper) => paper.id === id);
    const filteredCorrectAnswers = correctAnswers?.find((answer) => answer.id === filteredExamPaper?.examID);

    useEffect(() => {
        if (filteredExamPaper?.examID) {
            dispatch(getExamPaperByUserID(user.uid));
            dispatch(getExamByExamID(filteredExamPaper.examID));
        }
    }, [dispatch, user.uid]);

   console.log(filteredExamPaper.myAnswers);



    const { questionsAnswers } = filteredCorrectAnswers;
    const userAnswers = filteredExamPaper.myAnswers.map((answer) => answer.answer);

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Exam ID: {filteredExamPaper?.examID}</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className='grid grid-cols-5 w-full'>
                        <th className="py-2 px-4 border-b text-left">#</th>
                        <th className="py-2 px-4 border-b text-left">Question</th>
                        <th className="py-2 px-4 border-b text-left">Correct Answer</th>
                        <th className="py-2 px-4 border-b text-left">Your Answer</th>
                        <th className="py-2 px-4 border-b text-left">Result</th>
                    </tr>
                </thead>
                <tbody>
                    {currentExam.questions?.map((question, index) => (
                        <tr key={index} className='grid grid-cols-5 w-full'>
                            <td className="py-2 px-4 border-b text-left">{index + 1}</td>
                            <td className="py-2 px-4 border-b">{question.examQuestionName}</td>
                            <td className="py-2 px-4 border-b">{`${questionsAnswers[index]}`}</td>
                            <td className="py-2 px-4 border-b">{userAnswers[index]}</td>
                            <td className="py-2 px-4 border-b text-left">
                                {questionsAnswers[index] === userAnswers[index] ? (
                                    <span className="text-green-500 font-bold">Correct</span>
                                ) : (
                                    <span className="text-red-500 font-bold">Incorrect</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultsDetail;
