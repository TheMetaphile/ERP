import React, { useState } from 'react';
import Question from './utils/Question';
import { useParams } from 'react-router-dom';
import QuizProgressCard from './utils/QuizProgressCard.jsx';
import CountDown from './utils/CountDown.jsx'; // Import the CountDown component
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function Quiz() {
  let { subject } = useParams();
  subject = subject.charAt(0).toUpperCase() + subject.slice(1);
  const questions = [
    { id: 1, text: 'this is Question 1', options: ['225', '455', '10', '788'] },
    { id: 2, text: 'this is Question 2', options: ['54', '684', '19//740', '987465'] },
    { id: 3, text: 'this is Question 3', options: ['9/7', '35', '6846', '0'] },
    // Add more questions as needed
  ];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [remainingTimes, setRemainingTimes] = useState(Array(questions.length).fill(30)); // Default remaining time is 30 seconds for each question



  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const onSelectAnswer = (answer) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questions[currentQuestionIndex].id]: answer
    }));
  };

  const goToNextQuestion = () => {
    console.log("next");
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const updateRemainingTime = (time) => {
    const updatedRemainingTimes = [...remainingTimes];
    console.log(remainingTimes);
    updatedRemainingTimes[currentQuestionIndex] = time;
    console.log(updatedRemainingTimes[currentQuestionIndex]);
    setRemainingTimes(updatedRemainingTimes);
  };


  return (
    <div className='flex flex-col w-full h-screen overflow-y-auto items-start mt-2 ml-2 mr-3'>
      <h1>{subject}</h1>
      <QuizProgressCard currentQuestionIndex={currentQuestionIndex} len={questions.length} />
      <div className="w-full rounded-lg shadow-lg px-4 py-2 mt-4">
        <CountDown next={goToNextQuestion} seconds={remainingTimes[currentQuestionIndex]} updateRemainingTime={updateRemainingTime} />
        <hr className='border-t-2 mt-2 mb-3' />

        <div className="w-full transition-all duration-300">
          <Question key={questions[currentQuestionIndex].id} onSelectAnswer={onSelectAnswer} question={questions[currentQuestionIndex]} Qno={currentQuestionIndex} len={questions.length} answers={answers} />
        </div>

        <div className="flex justify-between mt-4 px-10 py-4">

          <div className='flex items-center'>
            <button
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="flex p-2 items-center bg-secondary text-white rounded-full disabled:opacity-50"
            >

              <div className='bg-blue-500 p-2 rounded-full'>
              <FaArrowLeft className='text-black' />
              </div>
              <h1 className='text-base text-black pl-2 pr-2'>Previous</h1>
            </button>
            
          </div>

          <div className='flex items-center'>
            <button
              onClick={goToNextQuestion}
              disabled={currentQuestionIndex === questions.length-1}
              className="flex p-2 items-center bg-secondary text-white rounded-full disabled:opacity-50"
            >

              
              <h1 className='text-base text-black pl-2 pr-2'>Next</h1>
              <div className='bg-blue-500 p-2 rounded-full'>
              <FaArrowRight className='text-black' />
              </div>
            </button>
            
          </div>

        </div>

      </div>
    </div>
  );
}

export default Quiz;
