import LinearProgressBar from './../../Home/utils/SubjectProgress/LinearProgressBar/LinearProgressBar.jsx'

export default function QuizProgressCard(params) {
    return (
        <div className='flex flex-row w-full rounded-lg shadow-lg px-4 py-2  items-end' >
            <h2 className='mr-3'>Progress</h2>
            <div className='flex flex-col h-fit w-full items-end'>
                <h3 className='w-fit text-gray-500 text-sm'>{((params.currentQuestionIndex / params.len) * 100).toFixed(2)}% completed</h3>
                <div className='w-full'><LinearProgressBar value={params.currentQuestionIndex} max={params.len} /></div>
            </div>
        </div>
    )
}