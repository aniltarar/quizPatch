import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form';
import { FaRocket } from 'react-icons/fa6'
import { toast } from 'react-toastify';
import { loginScheme } from '~/validation/scheme';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '~/firebase/firebaseConfig';
import { setUser } from '~/redux/slices/userSlice';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Login = () => {


  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(loginScheme)
  });

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogin = async (data) => {
    
    
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
      const user = userCredential.user

      const teacherDoc = await getDoc(doc(db, "teachers", user.uid))

      const studentDoc = await getDoc(doc(db,"students",user.uid))
    
      const studentData = ({
        uid: studentDoc.data()?.uid,
        email: studentDoc.data()?.email,
        displayName: studentDoc.data()?.displayName,
        phoneNumber: studentDoc.data()?.phoneNumber,
        userRole: studentDoc.data()?.userRole,
        
      })

      const teacherData = ({
        uid: teacherDoc.data()?.uid,
        email: teacherDoc.data()?.email,
        displayName: teacherDoc.data()?.displayName,
        phoneNumber: teacherDoc.data()?.phoneNumber,
        userRole: teacherDoc.data()?.userRole,
        isVerified: teacherDoc.data()?.isVerified
       
      })

      if(studentDoc.data()?.userRole === "student"){
        dispatch(setUser(studentData))
      }
      if (teacherDoc.data()?.userRole === "teacher") { 
        dispatch(setUser(teacherData))
      }

      toast.success("Giriş Yapıldı")
      navigate("/")
    } catch (error) {
      toast.error("Bir hata oluştu." + error)
      console.log(error);
    }
  }

  return (
    <div className='w-full bg-gradient-to-r from-orange-500 to-purple-500 flex flex-col md:flex-row justify-center items-start p-24 gap-x-12 flex-grow'>
      <div className='flex flex-col gap-y-2 w-2/3 h-full justify-center'>
        <h1 className='text-5xl font-black text-white flex gap-x-2'>QuizPatch <FaRocket /> </h1>
        <p className='text-white w-[600px]'>Hesabına Giriş Yap
          Quizpatch'e katılarak bilgi yarışmaları ve eğlenceli testlerle dolu dünyamıza adım at! Hızlı ve kolay bir şekilde kaydol, arkadaşlarınla veya tek başına eğlenerek öğren.
          Yeni kullanıcı olarak seni sürpriz ödüller ve avantajlar bekliyor! Hemen kaydol ve bilgiyle dolu bir maceraya başla!
        </p>
      </div>
      <div className='p-4 bg-white rounded-md border md:w-1/4 flex flex-col gap-y-5'>
        <div className='flex flex-col gap-y-1.5 items-center text-gray-600' >
          <h1 className=' text-3xl font-semibold'>Giriş Yap</h1>
          <p className='text-sm' >Lütfen sisteme giriş yapınız.</p>
        </div>
        <form className='flex flex-col gap-y-6  ' onSubmit={handleSubmit(handleLogin)}>
          <div className='flex flex-col gap-y-1'>
            <label className='text-sm font-light text-gray-600'>E-Mail</label>
            <input type="text" placeholder='isim@mail.com' {...register("email")} className={`px-4 py-2 rounded-md border outline-none`} />
          </div>
          <div className='flex flex-col gap-y-1'>
            <label className='text-sm font-light text-gray-600'>Parola</label>
            <input type="password" placeholder='Parolanızı giriniz' {...register("password")} className={`px-4 py-2 rounded-md border outline-none`} />
          </div>
          <button type='submit' className='bg-gradient-to-r from-orange-500 to-purple-500 text-white py-2 rounded-md'>Giriş Yap</button>
        </form>
      </div>
    </div>
  )
}

export default Login



