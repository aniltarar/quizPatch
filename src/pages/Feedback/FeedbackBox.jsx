
import React, { useState } from 'react'

const FeedbackBox = ({ feedback }) => {
    const statusColors = {
        pending: "text-yellow-600 bg-yellow-100 border-yellow-300",
        resolved: "text-green-600 bg-green-100 border-green-300",
        rejected: "text-red-600 bg-red-100 border-red-300"
    };
    const statusTranslate = {
        pending: "Beklemede",
        resolved: "Çözüldü",
        rejected: "Reddedildi"
    };

    const [isShowMore, setIsShowMore] = useState(false);


    return (
        <div className="flex flex-col  p-4 w-full border border-gray-300 rounded-lg shadow-lg ">
            {/* Başlık ve Durum */}
            <div className="flex justify-between items-center ">
                <h3 className="text-xl font-semibold text-gray-800">{feedback.title}</h3>
                <div className='flex gap-x-1 items-center'>
                    <span className={`px-3 py-1 text-[10px] font-medium border rounded-full bg-zinc-100 text-zinc-400`}>
                        {feedback.id}
                    </span>
                    <span className={`px-3 py-1 text-xs font-medium border rounded-full ${statusColors[feedback.status]}`}>
                        {statusTranslate[feedback.status]}
                    </span>
                </div>
            </div>
            <div className='w-full pb-1' >
                <span className='text-xs text-zinc-400'>{feedback.reportTime}</span>
            </div>


            {/* Açıklama */}
            <div className="text-gray-700 py-2 border-t">
                {feedback.description.length > 300 ? (
                    isShowMore ? (
                        <p>
                            {feedback.description}{" "}
                            <button
                                onClick={() => setIsShowMore(!isShowMore)}
                                className="underline text-blue-500"
                            >
                                Daha az
                            </button>
                        </p>
                    ) : (
                        <p>
                            {feedback.description.slice(0, 300)}...{" "}
                            <button
                                onClick={() => setIsShowMore(!isShowMore)}
                                className="underline text-blue-500"
                            >
                                Daha fazla
                            </button>
                        </p>
                    )
                ) : (
                    <p>{feedback.description}</p>
                )}
            </div>


         


           {feedback?.reply &&  <div className='w-full  pt-3 border-t mt-auto flex '>
                <span className='text-sm w-full bg-blue-200 text-blue-500 border border-blue-500 z10 p-3 rounded-lg'>{feedback.reply}</span>
         
            </div>}

        </div>
    )
}

export default FeedbackBox
