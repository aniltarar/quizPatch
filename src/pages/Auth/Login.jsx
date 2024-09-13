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
      const userCredential = await signInWithEmailAndPassword(auth,data.email,data.password)
      const user = userCredential.user

      const userDoc = await getDoc(doc(db,"users",user.uid))

      const userData = ({
        uid : user.uid,
        email: user.email,
        displayName : user.displayName,
        phoneNumber: userDoc.data()?.phoneNumber,
        userRole : userDoc.data()?.userRole,
        classrooms : userDoc.data()?.classrooms
      })
      
      dispatch(setUser(userData))
      toast.success("Giriş Yapıldı")
      navigate("/")
    } catch (error) {
      toast.error("Bir hata oluştu." + error)
      console.log(error);
    }
  }
  
  return (
    <div className='w-full h-screen flex'>
    <div className='w-[60%] bg-gradient-to-tl from-orange-500 to-purple-500 flex flex-col justify-center items-start p-24 gap-y-2'>
      <h1 className='text-5xl font-black text-white flex gap-x-2'>QuizPatch <FaRocket /> </h1>
      <p className='text-white'>Hesabına Giriş Yap
        Quizpatch'e katılarak bilgi yarışmaları ve eğlenceli testlerle dolu dünyamıza adım at! Hızlı ve kolay bir şekilde kaydol, arkadaşlarınla veya tek başına eğlenerek öğren.
        Yeni kullanıcı olarak seni sürpriz ödüller ve avantajlar bekliyor! Hemen kaydol ve bilgiyle dolu bir maceraya başla!</p>
    </div>
    <div className='w-[40%] flex flex-col items-center p-6 '>
      <div className='flex flex-col items-center gap-y-2 border rounded-xl p-3 bg-white w-full'>
        <h1 className='text-3xl font-semibold text-gray-600 '>Giriş Yap </h1>
        <p className='text-sm text-gray-600 '>Lütfen sisteme Giriş yap</p>
        <form className='w-3/4 flex flex-col gap-y-6' onSubmit={handleSubmit(handleLogin)}>
          <div className='flex flex-col gap-y-1'>
            <label className='text-sm font-light text-gray-600'>E-Mail</label>
            <input type="text" placeholder='isim@mail.com' {...register("email")}  className={`px-4 py-2 rounded-md border outline-none`} />
          </div>
          <div className='flex flex-col gap-y-1'>
            <label className='text-sm font-light text-gray-600'>Parola</label>
            <input type="password" placeholder='Parolanızı giriniz' {...register("password")}  className={`px-4 py-2 rounded-md border outline-none`} />
          </div>
      
          <button type='submit' className='bg-gradient-to-r from-orange-500 to-purple-500 text-white py-2 rounded-md'>Giriş Yap</button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Login