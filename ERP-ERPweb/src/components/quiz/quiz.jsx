
import './quiz.css';
import Question from './utils/Question';
export default function Quiz() {
  return (
    <div className='quiz'>
         <h3> Math Quiz</h3>
    <div className='quiz-section'>
          <h5  className='time'>Time Left <span>10 sec</span></h5>
          <Question />
       <div class className="content"></div>
       <h5  className='time'> 1 of 10 Questions<span>Next Question</span></h5>
    </div>
    </div>
  )
}
