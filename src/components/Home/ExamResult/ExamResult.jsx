
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
        <div className='px-4 py-2 rounded-md bg-white border flex justify-between items-center'>
                      <span className='text-sm text-zinc-600'>{result.examName}</span>
                      <span className='text-sm text-zinc-800 font-semibold'>{Math.floor(result.examPoint)} Puan</span>
        </div>
    );
};

export default ExamResult;
