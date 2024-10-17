import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const ResultsDetail = () => {
    const { examPaper, correctAnswers } = useSelector(state => state.result);

    // console.log("examPaper", examPaper); // Öğrencinin Sınav Kağıdı (İşaretlenen Şıklar)
    console.log("correctAnswers", correctAnswers); // DB'den gelen cevap anahtarı


    console.log("examPaper",examPaper);
    
    const mappedExamPaper = examPaper.map((item) => ({
        examID: item.examID,
        studentAnswers: item.myAnswers
    }))


    // Elimizde cevap anahtarı ve öğrencinin işaretlediği şıklar var. 
    // Cevap anahtarı => correctAnswers
    // Öğrencinin işaretlediği şıklar => mappedExamPapper
    // öğrencinin işaretlediği şıklar ile cevap anahtarını karşılaştırıp doğru ve yanlış sayılarını bulacağız.

    const resultExam = mappedExamPaper.map((item)=>{



    })

    

    return (
        <div>
            <h1>Results Detail</h1>

        </div>
    );
}

export default ResultsDetail;

