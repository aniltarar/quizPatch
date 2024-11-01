
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getExamAveregeByExamID } from '~/redux/slices/examSlice';

const ExamResult = ({ result }) => {
    const dispatch = useDispatch();
    const [examAverege, setExamAverege] = useState(0);

    useEffect(() => {
        dispatch(getExamAveregeByExamID(result.examID)).then((data) => {
            setExamAverege(data.payload);
        });
    }, [dispatch, result.examID]);

    return (
        <div key={result.examID} className="flex flex-col border p-3 h-full gap-y-1"> {/* h-full eklendi */}
            <h1 className='text-2xl border-b-2'>{result.examName}</h1>

            {/* Öğrenci Notu Progress Bar */}
            <h2 className='text-xl'>Notunuz: {result.examPoint}</h2>
            <div className="flex w-full h-3 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow={result.examPoint} aria-valuemin="0" aria-valuemax="100">
                <div
                    className="flex flex-col justify-center rounded-full bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500"
                    style={{ width: `${result.examPoint}%` }}
                ></div>
            </div>
            <h2 className='text-xl'>Sınıf Ortalaması: {examAverege}</h2>

            {/* Sınıf Ortalaması Progress Bar */}
            <div className="flex w-full h-3 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow={examAverege} aria-valuemin="0" aria-valuemax="100">
                <div
                    className="flex flex-col justify-center rounded-full text-xs text-white text-center whitespace-nowrap transition duration-500 bg-orange-500"
                    style={{ width: `${examAverege}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ExamResult;
