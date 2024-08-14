import AcademicTopTile from "./AcademicTopTile";
import AcademicBottonTile from "./AcademicBottomTile";
import './Print.css'

export default function AcademicMiddleTile({ term, count }) {
    console.log(term)
    return (
        <div className=" print:your-component  mobile:max-tablet:w-fit w-full px-3">
            {term.length > 0 && (
                <div className="print:term-section mt-2">
                    <h2 className="font-medium text-lg px-3 mb-3">Term {count}</h2>
                    <AcademicTopTile heading={["Subject", 'Obtained Practical Marks', 'Total Practical Marks', 'Obtained Marks', "Total Marks"]} />
                    {term.map((detail, index) => (
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
