import ProgressCard from './progressCard.jsx';

export default function ProgressBarRow() {
    return (
        <div className='flex  mr-4 overflow-x-auto pb-4'>
            <ProgressCard 
                title='Total Assignments'
                percent='63'
                centerText='15'
                trailColor='#90CAF9'
                strokeColor='#2196F3'
            />
            <ProgressCard 
                title='Completed Assignments'
                percent='63'
                centerText='8'
                trailColor='#c8ebc9'
                strokeColor='#4caf50'
            />
            <ProgressCard 
                title='Checked Assignments'
                percent='63'
                centerText='6'
                trailColor='#eac9fe'
                strokeColor='#9100ec'
            />
            <ProgressCard 
                title='Pending Assignments'
                percent='63'
                centerText='7'
                trailColor='#ffc9bb'
                strokeColor='#ff4122'
            />
        </div>
    );
}
