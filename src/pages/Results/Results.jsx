import React , {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCorrectAnswersByExamID, getExamPaperByUserID } from '~/redux/slices/resultSlice'

const Results = () => {


  const dispatch = useDispatch()

  const {user} = useSelector(state => state.user)
  const {examPaper, correctAnswers} = useSelector(state => state.result)


  useEffect(() => {
    dispatch(getExamPaperByUserID(user.uid)) 
    dispatch(getCorrectAnswersByExamID(examPaper.examID))

  },[])



  return (
    <div className='w-full flex-grow p-6 flex flex-col'>
       
      <div className='flex w-full justify-between gap-y-2'>
        <h1 className='text-4xl font-bold'>Sınav Sonuçlarım</h1>
      </div>
    

<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-500 uppercase bg-gray-50 ">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Sınavın Adı
                </th>
                <th scope="col" className="px-6 py-3">
                    Soru Sayısı
                </th>

                <th scope="col" className="px-6 py-3">
                    Puan
                </th>
                <th scope="col" className="px-6 py-3">
                    Detaylar
                </th>
            </tr>
        </thead>
        <tbody>
             {examPaper.map((item,i) => (
              
              <tr  key={i} className="bg-white border-b ">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {item.examName}
              </th>
              <td className="px-6 py-4">
                  {item.myAnswers.length}
              </td>
              <td className="px-6 py-4">
                  {item.examPoint ? Math.floor(item.examPoint) :  "Sonuca ulaşmak için detayları ziyaret ediniz." }
              </td>
              <td className="px-6 py-4">
                  <Link className='px-4 py-2 text-white rounded-md bg-blue-500' to={`/results/${item.id}`} >Detaylar</Link>
              </td>
           
          </tr>
             ))}


        </tbody>
    </table>
</div>

      
    </div>
  )
}

export default Results