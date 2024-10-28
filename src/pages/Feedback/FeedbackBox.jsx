import React from 'react'

const FeedbackBox = ({ feedback }) => {

    return (
        <div className='flex flex-col px-4 py-2 bg-white m-2 rounded-lg w-full gap-y-3 '>
            <div className='flex flex-col  p-1 bg-zinc-50 rounded-sm'>
                <div className='flex items-center justify-between'>

                    <span>Başlık : {feedback.title}</span>
                    <div className='flex items-center gap-3'>
                    <small className='p-1 bg-blue-200 rounded-md'>Tarih: {feedback.reportTime}</small>
                    <small >{feedback.reply?<span className='bg-green-400 p-1 rounded-md'>Cevaplandı</span>:<span className='bg-orange-500 p-1 rounded-md'>Cevaplanmadı</span>}</small>

                    </div>
                </div>
                <small>No : {feedback.id}</small>
            </div>
            <div className='flex flex-col'>
                <span className='underline'>Bildiriminiz:</span>
                <p>{feedback.description}</p>
            </div>
            {
                feedback.status == "pending" && (
                    <div>
                        <p>{feedback.reply}</p>
                    </div>
                )
            }
            {
                feedback.status == "resolved" && (
                    <div>
                    <span>Yöneticinin Mesajı :</span>
                    <p>{feedback.reply}</p>
                </div>
                )
            }

        </div>
    )
}

export default FeedbackBox