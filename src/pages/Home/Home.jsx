import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassromByUserID, getClassroomByUserIDStudent } from '~/redux/slices/classSlice';
import { getExamResultByUserID } from '~/redux/slices/examSlice';
import Test from '../Test/Test';
import ClassroomBox from '~/components/Home/Classrooms/ClassroomBox';
import ExamResult from '~/components/Home/ExamResult/ExamResult';

const Home = () => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { userClassrooms } = useSelector((state) => state.classrooms);
  const { myResults } = useSelector(state => state.exam) // bu öğrenciye ait sonuçlar

  //  İçinde bulunduğum sınıflar
  // Zirvedeki Öğrenciler

  useEffect(() => {
    if (user.userRole === 'teacher') {
      dispatch(getClassromByUserID(user.uid));
    }
    else if (user.userRole === 'student') {
      dispatch(getClassroomByUserIDStudent(user.uid));
    }

  }, [dispatch, user.uid]);



  useEffect(() => {
    dispatch(getExamResultByUserID(user.uid))
  }, [dispatch, user.uid])


  return (
    <>

      <div className='grid grid-cols-1 lg:grid-cols-3 bg-zinc-100 border rounded-lg p-5 gap-3'>
        <div className="leftSide flex flex-col gap-y-5 border-2 shadow-lg bg-white p-3 col-span-1 lg:col-span-2">
          <div className="welcomeSection  border p-4 rounded-md">
            <h1 className="text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-l py-4 drop-shadow-xl from-orange-500 to-violet-500">
              Hoş geldin, {user.displayName}
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis obcaecati esse facere ex totam cupiditate corrupti impedit ad voluptates placeat, officiis eos illum voluptas optio debitis ipsum velit est aliquid?
            </p>
          </div>
          <div className="classroomsAndScores  grid grid-cols-1 lg:grid-cols-2 gap-3 ">
            <div className="classrooms flex flex-col gap-y-5  max-h-[100%] overflow-y-auto   w-full">
              <h1 className='text-2xl underline'>Ait olduğum sınıflar</h1>
              <div className='grid grid-cols-1 gap-3 '>
                {
                  userClassrooms?.map((classroom) => (
                    <ClassroomBox classroom={classroom} key={classroom.id} />
                  ))
                }
              </div>
            </div>
            <div className="scores flex flex-col gap-y-5 w-full">
              <h1 className='text-2xl underline'>Açıklanan Sınavlarım</h1>
              <div className='flex flex-col gap-y-3 w-full h-full'>
                {
                  myResults?.map((result) => (
                    <ExamResult result={result} key={result.examID} />
                  ))
                }
              </div>
            </div>
          </div>
        </div>

        <div className="rightSide border-2 bg-violet-500 p-3 w-full">
          Öğrenci Not Listesi / Duyuru Listesi
        </div>
      </div>



    </>
  );
};

export default Home;
