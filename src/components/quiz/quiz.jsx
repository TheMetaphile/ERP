
import './quiz.css';
import Question from './utils/Question';
export default function Quiz() {
  return (
    <div className='quiz'>
         <h3> Math Quiz</h3>
    <div className='quiz-section'>
          <h5  className='time'>Time Left <span className='time2'>10 sec</span></h5>
          <Question Question="What is the highest common factor of the numbers 30 and 132 ?"/>
       <div class className="content"></div>
       <h4  className='time'> 1 of 10 Questions<span className='time2'>Next Question</span></h4>
    </div>
    </div>
  )
}
