import { FaEdit } from 'react-icons/fa';

export default function StudentBasicDetails(props) {
    const studentDetails = {
        "Roll No.": props.rollNumber,
        'Class' : props.class,
        'Date of Birth': '12/27/2000',
        'Admission Date' : '01/12/2020',
        'Registration Number':'123489756',
        'Permanent Address': "'O'-Block, Ganga Nagar,Meerut-250001",
        'Academic Year': '2024-25',
        'Aadhar Number': '2456-9875-7896-3219',
        'Personal Email':'bhanu68tyagi@gmail.com',
        'Emergency Contact': '(+91) 9874563210'
    }
    const parentsDetails={
        'Father Name': 'Mr. Raj kumar Tyagi',
        'Mother Name' : 'Mrs. Manju Tyagi',
        'Father Phone Number': '(+91) 9871236549',
        'Mother Phone Number': '(+91) 4561237895',
        'Parent Email': 'ygbjh@gmail.com',
        'Father Occupation': 'Physiotherapist',
        'Mothers Occupation': 'House wife'
    }
    return (
        <div className="flex-1 w-full mt-3 mb-2 shadow-md rounded-lg bg-white p-2 h-fit">
            <div className="flex justify-between flex-grow items-center">
                <h1 className="text-xl font-medium">
                    All Details
                </h1>
                <FaEdit className='bg-secondary rounded-lg shadow-md px-3 py-1 w-fit h-8' />
            </div>
            <div className='border-gray-300 border-t-2 mt-2'></div>
            <div className='tablet:flex mt-2'>
            <div className='tablet:w-1/2'>
            {
                Object.entries(studentDetails).map(([key, value]) => (
                    <div className='flex w-full text-base  mb-2'>
                        <h1 className='font-medium text-sky-500 tablet:w-2/5 mobile:max-tablet:w-1/2'>
                            {key}
                        </h1>
                        <h1 className='w-fit ml-2 font-normal text-gray-400'>
                            {value}
                        </h1>
                    </div>
                )
                )
            }
            </div>
            <div className='tablet:w-1/2'>
            {
                Object.entries(parentsDetails).map(([key, value]) => (
                    <div className='flex full text-base mb-2'>
                        <h1 className='font-medium text-sky-500 tablet:w-3/5 mobile:max-tablet:w-1/2'>
                            {key}
                        </h1>
                        <h1 className='w-fit ml-2 font-normal text-gray-400'>
                            {value}
                        </h1>
                    </div>
                )
                )
            }
            </div>
            </div>
        </div>
    )
}