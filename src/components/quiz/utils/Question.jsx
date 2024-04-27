import React from 'react';

function Question({ question, onSelectAnswer, Qno, len ,answers}) {
  const handleSelectAnswer = (option) => {
    onSelectAnswer(option);
  };

  return (
    <div className="w-full">
      <div className='flex w-full justify-between text-lg'>
        <h2>Question {Qno+1}. </h2>
        <h2>{Qno+1}/{len}</h2>
      </div>
      <h3>{question.text}</h3>
      <div className="flex flex-col">
        {question.options.map((option, index) => (
          <div key={index} className='rounded-lg shadow-md w-full px-3 py-2 mt-3' onClick={() => handleSelectAnswer(option)}>
            <input
              type="radio"
              id={`${question.id}-${index}`}
              name={`question-${question.id}`}
              value={option}
              checked={question.id in answers && answers[question.id] === option}
              onChange={() => handleSelectAnswer(option)}
            />
            <label htmlFor={`${question.id}-${index}`} className='ml-3'>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Question;
