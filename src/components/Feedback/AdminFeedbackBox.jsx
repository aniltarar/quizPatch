import React, { useState } from 'react'
import { IoChatboxOutline } from "react-icons/io5";



const AdminFeedbackBox = ({ feedback ,openModal }) => {

    const statusColors = {
        pending: "text-yellow-600 bg-yellow-100",
        resolved: "text-green-600 bg-green-100",
        rejected: "text-red-600 bg-red-100"
    };

        const statusTranslate = {
        pending: "Beklemede",
        resolved: "Çözüldü",
        rejected: "Reddedildi"
    };



    return (
        <>
        
         <div className="flex flex-col gap-y-3  p-4 border border-gray-300 rounded-lg shadow-lg bg-white ">
          <div className="flex justify-between items-center ">
                <h3 className="text-xl font-semibold text-gray-800">{feedback.title}</h3>
                <div className='flex gap-x-2 items-center'>
                     <span className={`px-3 py-1 text-[12px] font-medium border border-neutral-300 rounded-full bg-neutral-100 text-neutral-400`}>{feedback.username}</span>
                    <span className={`px-3 py-1 text-[12px] font-medium border rounded-full bg-zinc-100 text-zinc-400`}>
                        {feedback.id}
                    </span>
                    <span className={`px-3 py-1 text-[12px] font-medium border rounded-full ${statusColors[feedback.status]}`}>
                        {statusTranslate[feedback.status]}
                    </span>
                    
                </div>
            </div>
          <div className='w-full pb-1' >
                <span className='text-xs text-zinc-400'>{feedback.reportTime}</span>
            </div>
            <p className="text-zinc-700  py-2 border-t">{feedback.description}</p>

              {feedback?.reply &&  <div className='w-full  pt-3 border-t mt-auto flex '>
                <span className='text-sm w-full bg-blue-200 text-blue-500 border border-blue-500 z10 p-3 rounded-lg'>{feedback.reply}</span>
         
            </div>}

            {/* Yanıtla Butonu */}
            <div className="flex justify-end mt-auto">
                <button onClick={() => openModal(feedback)} className="px-4 py-2 flex gap-x-2 items-center bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition">
                    <IoChatboxOutline/>Yanıtla
                </button>
            </div>
            </div>
        </>
    )
}

export default AdminFeedbackBox