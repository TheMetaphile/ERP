import './Question.css'

export default function Question() {
    return (
        <div className='question'>
            <div class className="content">
                <h2>Question 1.</h2>
                <p>What is the highest common factor of the numbers 30 and 132 ?</p>
            </div>
            <div className='options' >
                <h5>A.    7</h5>
                <h5 className='green'>b.    6</h5>
                <h5 className='red'>c.     3</h5>
                <h5>d.     3</h5>
            </div>
        </div>
    )
}