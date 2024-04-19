import './Question.css'
//import Check from './../../../assets/Checkmark(1).png';
export default function Question(props) {
    return (
        <div className='question'>
            <div class className="content">
                <h2>Question 1:-</h2>
                <p>{props.Question}</p>
            </div>
            <div className='options' >
                <h5 className='first'>A.<span >6</span></h5>
               <h5 className='second' >B.<span>6</span>  </h5>
                <h5 className='third'>C. <span>3</span></h5>
                <h5 className='fourth'>D. <span>3</span></h5>
            </div>
        </div>
    )
}