import { FaRocket } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { registerScheme } from "~/validation/scheme"
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "~/firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { setUser } from "~/redux/slices/userSlice";
import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerScheme)
  });


  const registerHandle = async (data) => {
    const isValid = data.password === data.passwordConfirmation;

    try {
      if (isValid) {


        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: data.displayName
        });

        dispatch(setUser({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          phoneNumber: data.phoneNumber,
          userRole: data.role,
       
        }));


        const teacherRef = doc(collection(db, "teachers"), user.uid);
        const studentRef = doc(collection(db, "students"), user.uid);
        const usersRef = doc(collection(db, "users"), user.uid);

        // Eğitmen tablosuna kayıt
        if (data.role === "teacher") {
          await setDoc(teacherRef, {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            phoneNumber: data.phoneNumber,
            userRole: data.role,
            isVerified:false
          });
        }


        // Öğrenci tablosuna kayıt
        if (data.role === "student") {
          await setDoc(studentRef, {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            phoneNumber: data.phoneNumber,
            userRole: data.role,

          });
        }

        // Users tablosuna kayıt
        await setDoc(usersRef, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          phoneNumber: data.phoneNumber,
          userRole: data.role,
          isVerified:false
        })
      } else {
        toast.error("Parolalar uyuşmuyor!");
      }
      navigate("/")
      toast.success("Kayıt Başarılı, Firestore kontrol ediniz!");
    } catch (error) {
      toast.error(error.message);
    }
  };



  return (
    <div className='w-full flex-grow flex bg-gradient-to-tl from-orange-500 to-purple-500 justify-center items-center'>
      <div className='flex flex-col items-center p-6 w-full flex-grow'>
        <div className='flex flex-col items-center gap-y-2 border rounded-xl p-3 bg-white w-3/4'>
          <h1 className='text-3xl font-semibold text-gray-600 '>Kayıt Ol</h1>
          <p className='text-sm text-gray-600 '>Lütfen sisteme ücretsiz bir şekilde kayıt ol</p>
          <form className='w-full px-5 flex flex-col gap-y-3' onSubmit={handleSubmit(registerHandle)}>
            <div className='flex flex-col gap-y-1'>
              <label className='text-sm font-light text-gray-600'>E-Mail</label>
              <input type="text" placeholder='isim@mail.com' {...register("email")} className={`px-3 py-1.5 rounded-md border outline-none ${errors.email && "border-red-500 "}`} />
              <span className="text-red-500 text-sm">{errors.email && errors.email.message}</span>
            </div>
            <div className='flex flex-col gap-y-1'>
              <label className='text-sm font-light text-gray-600'>Adınız Soyadınız</label>
              <input type="text" placeholder='Örn: Anıl Tarar' {...register("displayName")} className={`px-3 py-1.5 rounded-md border outline-none ${errors.displayName && "border-red-500 "}`} />
              <span className="text-red-500 text-sm">{errors.displayName && errors.displayName.message}</span>
            </div>
            <div className='flex flex-col gap-y-1'>
              <label className='text-m font-light text-gray-600'>Telefon Numaranız</label>
              <input type="text" placeholder='5554561234' {...register("phoneNumber")} className={`px-3 py-1.5 rounded-md border outline-none ${errors.phoneNumber && "border-red-500 "}`} />
              <span className="text-red-500 text-sm">{errors.phoneNumber && errors.phoneNumber.message}</span>
            </div>
            <div className='flex flex-col gap-y-1'>
              <label className='text-sm font-light text-gray-600'>Şifreniz</label>
              <input type="password" placeholder='Parolanızı giriniz.' {...register("password")} className={`px-3 py-1.5 rounded-md border outline-none ${errors.password && "border-red-500 "}`} />
              <span className="text-red-500 text-sm">{errors.password && errors.password.message}</span>
            </div>
            <div className='flex flex-col gap-y-1'>
              <label className='text-sm font-light text-gray-600'>Şifre Tekrarı</label>
              <input type="password" placeholder='Parolanızı tekrar giriniz.' {...register("passwordConfirmation")} className={`px-3 py-1 rounded-md border outline-none ${errors.passwordConfirmation && "border-red-500 "}`} />
              <span className="text-red-500 text-sm">{errors.passwordConfirmation && errors.passwordConfirmation.message}</span>
            </div>

            <div className="flex justify-around items-center mb-4">
              <div className="flex items-center gap-x-1">
                <input
                  id="student"
                  type="radio"
                  name="option"
                  value="student"
                  required
                  className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 "
                  {...register("role")}
                />
                <label htmlFor="student" className="ml-2 text- font-medium text-gray-900">Öğrenci</label>
              </div>
              <div className="flex items-center gap-x-1">
                <input
                  id="teacher"
                  type="radio"
                  name="option"
                  value="teacher"
                  required
                  {...register("role")}
                  className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300"
                />
                <label htmlFor="teacher" className="ml-2 text-sm font-medium text-gray-900">Eğitmen</label>
              </div>
            </div>

            <button className='bg-gradient-to-r from-orange-500 to-purple-500 text-white py-2 rounded-md'>Kayıt Ol</button>
          </form>
        </div>
      </div>
      <div className='flex flex-col justify-center items-start p-24 gap-y-2 w-full '>
        <h1 className='text-5xl font-black text-white flex gap-x-2'>QuizPatch <FaRocket /> </h1>
        <p className='text-white'>Hesabını Oluştur
          Quizpatch'e katılarak bilgi yarışmaları ve eğlenceli testlerle dolu dünyamıza adım at! Hızlı ve kolay bir şekilde kaydol, arkadaşlarınla veya tek başına eğlenerek öğren.
          Yeni kullanıcı olarak seni sürpriz ödüller ve avantajlar bekliyor! Hemen kaydol ve bilgiyle dolu bir maceraya başla!</p>
      </div>
    </div>
  )
}

export default Register