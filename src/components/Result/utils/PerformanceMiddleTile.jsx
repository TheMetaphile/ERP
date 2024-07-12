export default function PerformanceMiddleTile({ details }) {
    return (
        <div className="border-b-2 ">
            {details.map((detail, index) => (
                <div key={index} className='mobile:max-laptop:w-fit w-full flex justify-between border border-gray-300 shadow-md items-center' >
                    <div className=' w-52 text-lg text-center py-2'>{detail.subject}</div>
                    <div className=' w-60 text-lg text-center py-2 bg-blue-200'>{detail.obtainedPracticalMarks}</div>
                    <div className=' w-60 text-lg text-center py-2 bg-green-200'>{detail.totalPracticalMarks}</div>
                    <div className=' w-60 text-lg text-center py-2 bg-blue-200'>{detail.marksObtained}</div>
                    <div className=' w-60 text-lg text-center py-2 bg-green-200'>{detail.totalMarks}</div>
                </div>
            ))}
        </div>
    )
} 