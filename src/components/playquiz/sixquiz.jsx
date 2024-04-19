import React from 'react';

export default function SixQuiz(props) {
  return (
    <div className={`flex ${props.color} w-40 h-16 mr-2 justify-between mt-5 p-4 relative shadow-md rounded-lg ml-4`}>
      <h1 className="text-xl text-black px-1">{props.Subject}</h1>
      <img src={props.img} alt={props.img} className='w-14 h-9 text-right  -ml-10 '/>
    </div>
  );
}
