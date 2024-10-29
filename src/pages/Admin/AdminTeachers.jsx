import { doc, updateDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { db } from '~/firebase/firebaseConfig';
import { setVerifiedTeacherByTeacherUID } from '~/redux/slices/adminSlice';
import { getAllTeachers } from '~/redux/slices/teacherSlice';

const AdminTeachers = () => {
  const dispatch = useDispatch();
  const { teachers } = useSelector((state) => state.teacher);

  const verifiedTeacherFunc = async (teacherUID) => {
    try {
      const teacherRef = doc(db, 'teachers', teacherUID);
      await updateDoc(teacherRef, {
        isVerified: true,
      });
      toast.success('Eğitmen başarıyla aktif edildi.');
      dispatch(getAllTeachers());
    } catch (error) {
      console.error(error);
      toast.error('Bir hata oluştu.');
    }
  };
  const unVerifiedTeacherFunc = async (teacherUID) => {
    try {
      const teacherRef = doc(db, 'teachers', teacherUID);
      await updateDoc(teacherRef, {
        isVerified: false,
      });
      toast.success('Eğitmen başarıyla deaktif edildi.');
      dispatch(getAllTeachers());
    } catch (error) {
      console.error(error);
      toast.error('Bir hata oluştu.');
    }
  };

  useEffect(() => {
    dispatch(getAllTeachers());
  }, [dispatch]);

  return (
    <div className="flex-grow h-full flex flex-col gap-y-5 items-start justify-start p-3">
      <h1 className="font-semibold text-2xl">Eğitmenler</h1>
      <div className="bg-white h-full rounded-md p-4 w-full border">
        <div className="w-full grid grid-cols-4 bg-zinc-100 px-4 py-3 rounded">
          <span className="font-semibold">E-Posta</span>
          <span className="font-semibold">Telefon Numarası</span>
          <span className="font-semibold">İsim Soyisim</span>
          <span className="font-semibold">Aktiflik Durumu</span>
        </div>
        <div className="w-full">
          {teachers.map((teacher) => (
            <div key={teacher.uid} className="grid grid-cols-4 bg-zinc-50 px-4 py-3 gap-4">
              <span >{teacher.email}</span>
              <span>{teacher.phoneNumber}</span>
              <span>{teacher.displayName}</span>
              <p>
                {teacher.isVerified ? (
                  <button onClick={() => unVerifiedTeacherFunc(teacher.uid)} className="rounded-full px-4 bg-green-500 text-white">Aktif</button>
                ) : (
                  <button
                    onClick={() => verifiedTeacherFunc(teacher.uid)}
                    className="rounded-full px-4 bg-red-500 text-white"
                  >
                    DeAktif
                  </button>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminTeachers;
