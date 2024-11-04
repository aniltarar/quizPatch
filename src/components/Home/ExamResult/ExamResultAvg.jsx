
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getExamAveregeByExamID } from '~/redux/slices/examSlice';

const ExamResultAvg = ({ result }) => {
    const dispatch = useDispatch();

    const [examAverege, setExamAverege] = useState(0);

    useEffect(() => {
        dispatch(getExamAveregeByExamID(result.examID)).then((data) => {
            setExamAverege(data.payload);
        });
    }, [dispatch, result.examID]);
    // yuvarladıktan sonra 2 hane bırakmak 

    return (
        <div className='px-4 py-2 rounded-md bg-white border flex justify-between items-center'>
            <span className='text-sm text-zinc-600'>{result.examName}</span>
            <span className='text-sm text-zinc-800 font-semibold'>{examAverege.toLocaleString("tr-TR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })} Ort</span>
        </div>
    );
};

export default ExamResultAvg;
