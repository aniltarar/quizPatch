import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassromByUserID, getClassroomByUserIDStudent } from '~/redux/slices/classSlice';
import { getExamResultByUserID } from '~/redux/slices/examSlice';
import ClassroomBox from '~/components/Home/Classrooms/ClassroomBox';
import ExamResult from '~/components/Home/ExamResult/ExamResult';
import { MdOutlineClass } from "react-icons/md";
import { Link } from 'react-router-dom';
import { PiChalkboardTeacherFill, PiStudent, PiBellSimpleRinging } from 'react-icons/pi';
import { getFeedbacks } from '~/redux/slices/feedbackSlice';
import { FiAlertCircle } from 'react-icons/fi';
import ExamResultAvg from '~/components/Home/ExamResult/ExamResultAvg';


const Home = () => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { userClassrooms } = useSelector((state) => state.classrooms);
  const { myResults } = useSelector(state => state.exam) // bu öğrenciye ait sonuçlar
  const { feedbacks } = useSelector(state => state.feedback)

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
    dispatch(getFeedbacks(user.uid))
  }, [dispatch, user.uid])


  return (
    <>
      <div className='w-full flex flex-grow  justify-center items-center'>
        <div className='container mx-auto  flex flex-col gap-7 p-12'>
          <div className='flex flex-col tracking-tighter leading-tight text-[50px]'>
            <h1 className='bg-gradient-to-l bg-clip-text text-transparent from-orange-500 to-purple-500 font-semibold'>Selam , {user.displayName}</h1>
            <p className='bg-gradient-to-l bg-clip-text text-transparent from-orange-500 to-purple-500 font-semibold'>Çalışmaların nasıl gidiyor ?</p>
          </div>
          <p className='text-sm text-zinc-500 w-1/2'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat, incidunt amet itaque saepe consequuntur, quas, quos quod quidem voluptates quibusdam quae.
          </p>
          <div className='w-full grid lg:grid-cols-2 grid-cols-1 grid-rows-2 py-1 gap-5'>
            <div className='lg:h-[200px] h-[300px] bg-white  rounded-xl shadow-lg border p-5 flex flex-col gap-3'>
              <div className='w-full flex justify-between items-center border-b pb-4 '>
                <Link to="/results" className='text-zinc-700 font-semibold uppercase text-sm hover:text-zinc-500'>Sonuçlarım</Link>
                <span>
                  <MdOutlineClass size={20} />
                </span>
              </div>
              <div className='w-full grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-3 lg:max-h-32 max-h-60 overflow-y-auto '>
                {myResults.length > 0 ?
                  myResults?.map((result) => (
                    <ExamResult result={result} key={result.examID} />
                  ))
                  : <div className='bg-red-100 text-red-500 col-span-2 px-4 py-2 rounded-md'>Henüz sınava girmediniz.</div>}
              </div>
            </div>
            <div className='lg:h-[200px] h-[300px] bg-white  rounded-xl shadow-lg border p-5 flex flex-col gap-3'>
              <div className='w-full flex justify-between items-center border-b pb-4 '>
                <Link to="/my-classrooms" className='text-zinc-700 font-semibold uppercase text-sm hover:text-zinc-500'>Ait Olduğum Sınıflar</Link>
                <span>
                  <MdOutlineClass size={20} />
                </span>
              </div>
              <div className='w-full grid lg:grid-cols-2 grid-cols-1 gap-5 lg:max-h-32 max-h-64 overflow-y-auto '>


                {
                  userClassrooms?.length > 0 ?
                    userClassrooms?.map((classroom) => (
                      <div className='px-4 py-2 rounded-md bg-white border flex justify-between items-center'>
                        <span className='text-sm text-zinc-600'>{classroom.className}</span>
                        <div className='flex gap-x-3'>
                          <span className='text-sm text-zinc-800 font-semibold flex gap-x-1 items-center'>
                            <PiChalkboardTeacherFill size={20} />
                            {classroom.selectedTeacher.length}
                          </span>
                          <span className='text-sm text-zinc-800 font-semibold flex gap-x-1 items-center'>
                            <PiStudent size={20} />
                            {classroom.selectedStudent.length}
                          </span>
                        </div>
                      </div>
                    ))
                    : <div className='bg-red-100 text-red-500 col-span-2 px-4 py-2 rounded-md'>Henüz sınıfa katılmadınız.</div>
                }
              </div>
            </div>

            <div className='lg:h-[200px] h-[300px] bg-white  rounded-xl shadow-lg border p-5 flex flex-col gap-3'>
              <div className='w-full flex justify-between items-center border-b pb-4 '>
                <Link to="/my-classrooms" className='text-zinc-700 font-semibold uppercase text-sm hover:text-zinc-500'>Sınavlarımın Ortalaması</Link>
                <span>
                  <MdOutlineClass size={20} />
                </span>
              </div>
              <div className='w-full grid lg:grid-cols-2 grid-cols-1 gap-5 lg:max-h-32 max-h-64 overflow-y-auto '>

                {myResults.length > 0 ?
                  myResults?.map((result) => (
                    <ExamResultAvg result={result} key={result.examID} />
                  ))
                  : <div className='bg-red-100 text-red-500 col-span-2 px-4 py-2 rounded-md'>Henüz sınava girmediniz.</div>}
              </div>
            </div>


            <div className='lg:h-[200px] h-[300px] bg-white  rounded-xl shadow-lg border p-5 flex flex-col gap-3'>
              <div className='w-full flex lg:justify-between lg:flex-row flex-col justify-start  items-start lg:items-center border-b pb-4 '>
                <Link to="/feedback" className='text-zinc-700 font-semibold uppercase text-sm hover:text-zinc-500'>Bildirimler</Link>

                <div className='flex gap-x-1 items-center '>
                  <div className='flex c gap-x-2 items-center mr-3'>
                    <span className='bg-green-500 border-2 border-green-200 rounded-full  px-4 text-sm text-white'>Çözüldü</span>
                    <span className='bg-red-500 border-2 border-red-200 rounded-full  px-4 text-sm text-white'>Reddedildi</span>
                    <span className='bg-orange-500 border-2 border-orange-200 rounded-full  px-4 text-sm text-white'>Beklemede</span>
                  </div>
                  <PiBellSimpleRinging size={20} />
                </div>
              </div>
              <div className='w-full grid lg:grid-cols-2 grid-cols-1 gap-5 lg:max-h-32 max-h-64 overflow-y-auto '>

                {feedbacks.length > 0 ?
                  feedbacks?.map((feedback) => (
                    <div className='px-4 py-2 rounded-md bg-white border flex justify-between items-center'>
                      <span className='text-sm text-zinc-800 font-semibold flex gap-x-2 items-center'>
                        <FiAlertCircle size={18} />
                        {feedback.title}
                      </span>

                      <span className={`text-sm  w-5 h-5  rounded-full  
                          
                          ${feedback.status === "pending" && "bg-orange-500 border-2 border-orange-200"}
                          ${feedback.status === "rejected" && "bg-red-500 border-2 border-red-200"}
                          ${feedback.status === "resolved" && "bg-green-500 border-2 border-green-200"}
                          
                          `} />


                    </div>
                  ))
                  : <div className='bg-red-100 text-red-500 col-span-2 px-4 py-2 rounded-md'>Henüz geri bildirim oluşturulmadı</div>
                }
              </div>
            </div>
          </div>
        </div>


      </div>



      {/* <div className='grid grid-cols-1 lg:grid-cols-3 bg-zinc-100 border rounded-lg p-5 gap-3'>
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
      </div>  */}



    </>
  );
};

export default Home;
