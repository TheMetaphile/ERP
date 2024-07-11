import AcademicTopTile from "./AcademicTopTile";
import AcademicBottonTile from "./AcademicBottomTile";
export default function AcademicMiddleTile({ details }) {
    return (
        <div className="border-b-2 mobile:max-tablet:w-fit w-full">
            {details.term1.length > 0 && (
                <div className="mt-2">

                    <h2 className="font-medium text-lg px-3">Term 1</h2>
                    <AcademicTopTile heading={["Subject", 'Obtained Practical Marks', 'Total Practical Marks', 'Obtained Marks', "Total Marks"]} />
                    {details.term1.map((detail, index) => (
                        <div key={index} className='mobile:max-tablet:w-fit w-full flex justify-between border border-gray-300 shadow-md items-center'>
                            <div className='w-52 text-lg text-center py-2'>{detail.subject}</div>
                            <div className='w-60 text-lg text-center py-2 bg-blue-200'>{detail.obtainedPracticalMarks}</div>
                            <div className='w-60 text-lg text-center py-2 bg-green-200'>{detail.totalPracticalMarks}</div>
                            <div className='w-60 text-lg text-center py-2 bg-blue-200'>{detail.marksObtained}</div>
                            <div className='w-60 text-lg text-center py-2 bg-green-200'>{detail.totalMarks}</div>
                        </div>
                    ))}
                    <AcademicBottonTile value={["", 'GPA', "8.2"]} />

                </div>

            )}

            {details.term2.length > 0 && (
                <div className="mt-3">
                    <h2 className="font-medium text-lg px-3">Term 2</h2>
                    <AcademicTopTile heading={["Subject", 'Obtained Practical Marks', 'Total Practical Marks', 'Obtained Marks', "Total Marks"]} />
                    {details.term2.map((detail, index) => (
                        <div key={index} className='mobile:max-tablet:w-fit w-full flex justify-between border border-gray-300 shadow-md items-center'>
                            <div className='w-52 text-lg text-center py-2'>{detail.subject}</div>
                            <div className='w-60 text-lg text-center py-2 bg-blue-200'>{detail.obtainedPracticalMarks}</div>
                            <div className='w-60 text-lg text-center py-2 bg-green-200'>{detail.totalPracticalMarks}</div>
                            <div className='w-60 text-lg text-center py-2 bg-blue-200'>{detail.marksObtained}</div>
                            <div className='w-60 text-lg text-center py-2 bg-green-200'>{detail.totalMarks}</div>
                        </div>
                    ))}
                    <AcademicBottonTile value={["", 'GPA', "8.2"]} />

                </div>
            )}
        </div>
    );
}
