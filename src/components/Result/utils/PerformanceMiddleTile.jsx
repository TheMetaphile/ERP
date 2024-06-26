export default function PerformanceMiddleTile({details}){
    return (
        <div className="w-full  border-b-2 ">
            {details.map((detail, index) => (
                <div key={index} className='flex justify-between border border-gray-300 shadow-md items-center    w-full' >
                    <div className=' w-1/3 text-lg text-center py-2'>{detail.subject}</div>
                    <div className=' w-1/3 text-lg text-center py-2 bg-blue-200'>{detail.obtainedPracticalMarks}</div>
                    <div className=' w-1/3 text-lg text-center py-2 bg-green-200'>{detail.totalPracticalMarks}</div>
                    <div className=' w-1/3 text-lg text-center py-2 bg-blue-200'>{detail.marksObtained}</div>
                    <div className=' w-1/3 text-lg text-center py-2 bg-green-200'>{detail.totalMarks}</div>
                </div>
            ))}
        </div>
    )
}