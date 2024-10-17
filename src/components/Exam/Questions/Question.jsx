import React from 'react';

const Question = ({ question, index, register }) => {
  return (
    <div className="max-w-5xl h-[200px] border container mx-auto bg-white rounded-md p-3">
      <h1 className="flex gap-x-2 items-center">{`${index + 1})`}<span>{question.examQuestionName}</span></h1>
      
      <div className="grid grid-cols-2 w-full gap-5 mt-3">
        {['A', 'B', 'C', 'D'].map((option,i) => (
          <div
            key={i}
            className="w-full bg-white rounded-md border px-4 py-2 flex justify-between items-center"
          >
            <label htmlFor={`${question.examQuestionId}-${option}`}>
              {`${option}) ${question[`option${option}`]}`}
            </label>
            <input
              type="radio"
              id={`${question.examQuestionId}-${option}`}
              value={option}
              {...register(`question-${index}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
