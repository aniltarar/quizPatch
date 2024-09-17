import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {

  const { user } = useSelector((state) => state.user);


  return (
    <div className="sm:grid sm:grid-cols-5 sm:grid-rows-4 sm:gap-4 h-screen p-5 flex flex-col gap-y-5 px-12">
      <div className="col-span-2 row-span-2 border rounded-md bg-gradient-to-r from-orange-500 to-purple-500 p-[3px]">
        <div className=" h-full w-full bg-white  rounded flex flex-col ">
          <div className='w-full bg-zinc-100 h-10 rounded-t flex justify-start items-center px-3'>
            <h1 className='text-center text-xs '>Kişisel Bilgilerim</h1>
          </div>
          <div className='p-4 w-full flex justify-start items-center'>
            <span className='bg-zinc-100 border px-4 py-0.5 rounded-md'>{user.displayName}</span>
          </div>
          <div className='p-4'>
            Profil Tipi : <span className='bg-red-500'>{user?.userRole === "teacher" ? "Öğretmen" : "Öğrenci"}</span>
          </div>
          <div className='p-4'>
            Sınıf Sayısı: <span className='bg-red-500'>{user?.classrooms?.length}</span>
          </div>
        </div>
      </div>
      <div className="col-span-3 row-span-2 col-start-3 row-start-1 bg-pink-500">
        <span>Sınıflarım</span>
        <div>{user?.classrooms?.map((classroom) => (
          <Link key={classroom?.id} to={`/classroom/${classroom.id}`} >{classroom?.className} </Link>
        ))}
        </div>
      </div>
      <div className="col-span-2 row-span-2 col-start-1 row-start-3 bg-blue-500">AKTİF SINAVLAR</div>
      <div className="col-span-3 row-span-2 col-start-3 row-start-3 bg-violet-500">SONUÇLARIM</div>
    </div>
  );
};

export default Home;


