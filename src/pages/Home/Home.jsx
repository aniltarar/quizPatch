import React from 'react';
import { useSelector } from 'react-redux';
import MyClassHome from './children/MyClassHome';
import MyProfileHome from './children/MyProfileHome';

const Home = () => {

  const { user } = useSelector((state) => state.user);


  return (
    <div className="sm:grid sm:grid-cols-5 sm:grid-rows-4 sm:gap-4 max-h-screen p-5 flex flex-col gap-y-5 px-12">
      <MyProfileHome user={user}/>
      <MyClassHome user={user}/>
      <div className="col-span-2 row-span-2 col-start-1 row-start-3 bg-blue-500">AKTİF SINAVLAR</div>
      <div className="col-span-3 row-span-2 col-start-3 row-start-3 bg-violet-500">SONUÇLARIM</div>
    </div>
  );
};

export default Home;


