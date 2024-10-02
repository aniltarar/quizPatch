import React,{useState} from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const LeftSide = ({setExamInfo,examQuestions,examInfo}) => {


    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user)
    const { userClassrooms } = useSelector(state => state.classrooms);
    const { register, handleSubmit, reset } = useForm()
    const [examTime, setExamTime] = useState(60);


const addExam = (data) => {
    try {

        const examFullData = {...data, examTime: examTime, questions: examQuestions}
        console.log(examFullData);
    } catch (error) {
        console.log(error);
    }
}

const isValid = examQuestions.length >= 4 
    
  return ( 

  <form className="flex flex-col p-3 gap-y-5 bg-white rounded-md w-1/2" onSubmit={handleSubmit(addExam)}>
  <div className=" flex flex-col gap-y-1">
      <label className='font-semibold text-sm' >Sınıf Seçin</label>
          <select {...register("classrooms")}> 
              <option value="">Seçiniz...</option>
              {userClassrooms.map((classroom)=>(
                      <option key={classroom.id} value={classroom.id}>
                          {classroom.className}
                      </option>
                  ))
              }
         </select>
  </div>
  <div className="selectClassroom  flex flex-col gap-y-1">
      <label className='font-semibold text-sm'>Sınavın Adı</label>
      <input type="text" className='px-4 py-2 rounded-md border' {...register("examName")} placeholder='Sınav Adını Giriniz...' />
  </div>
  <div className="selectClassroom  flex flex-col gap-y-1">
      <label >Sınavın Süresi (Dakika Bazında)</label>
      <input className='px-4 py-2 rounded-md border outline-none bg-zinc-100' value={examTime} disabled step={5} type="number" max={180} min={5} onChange={(e) => setExamTime(e.target.value)}/>
      <input  type="range" step={5} max={180} min={5} onChange={(e) => setExamTime(e.target.value)} />
  </div>
  <button type='submit' className={`px-4 py-2 rounded-md text-white transition-colors ${isValid ? 'bg-blue-500' : "bg-gray-500 "}`}
  disabled={!isValid}
  >Ekle</button>
</form> 
  )
}

export default LeftSide