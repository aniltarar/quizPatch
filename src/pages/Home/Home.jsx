import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassromByUserID } from '~/redux/slices/classSlice';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '~/firebase/firebaseConfig';

const Home = () => {

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user); 
  const {userClassrooms} = useSelector(state => state.classrooms);



  useEffect(() => {
    dispatch(getClassromByUserID(user.uid)); 
  }, [dispatch, user.uid]);

  return (
    <div>
      <h1>Anasayfa</h1>
      <h2>Kullanıcıya Ait Sınıflar</h2>
      {userClassrooms?.length > 0 ? (
        <ul>
          {userClassrooms.map((classroom) => (
            <li key={classroom.id}>
             {classroom.className}
            </li>
          ))}
        </ul>
      ) : (
        <p>Kullanıcıya ait sınıf bulunamadı.</p>
      )}
    </div>
  );
};

export default Home;
