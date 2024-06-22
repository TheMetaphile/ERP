import { useLocation, useParams } from "react-router-dom";
import signature from '../../../../../assets/signature.jpg';
import logo from '../../../../../assets/school logo.png'

export default function Certificate() {
    const { id } = useParams();

    const handlePrint = () => {
        window.print();
    };
    return (
        <div className="  px-2  rounded-lg shadow-md mb-2 mx-3">

            <div className="flex justify-center  w-full ">
                <img src={logo} alt="img" className='mobile:max-tablet:w-20' />
                <div className='self-center ml-3'>
                    <h1 className='tablet:text-3xl mobile:max-tablet:text-lg font-medium text-text_blue'>
                        Metaphile Public School
                    </h1>
                    <h3 className='tablet:text-xl text-gray-400 mb-4'>
                        'O' Block, Ganganagar, Meerut-250001
                    </h3>
                </div>
            </div>
            <div className="w-full">
                <div className="border-t-2 border-text_blue my-2 tablet:mx-3 rounded-full "></div>
                <h1 className='tablet:text-3xl mobile:max-tablet:text-xl font-medium text-text_blue text-center'>Transfer Certficate</h1>
                <div className="border-t-2 border-text_blue my-3 tablet:mx-3 rounded-full "></div>
            </div>
            {/* name={id} */}

            <div className=" w-full px-4">
                {[
                    { label: 'Student Name' },
                    { label: 'Admission ID' },
                    { label: 'Class' },
                    { label: 'TC No.' },
                    { label: 'TC Reason.' },
                    { label: 'Roll Number' },
                    { label: 'Date of Birth' },
                    { label: 'Mother\'s Name' },
                    { label: 'Father\'s Name' },
                    { label: 'Total Attendance' },
                    { label: 'Present Attendance' },
                    { label: 'Result' },
                    { label: 'Fee Due' },
                    { label: 'Category' },
                    { label: 'Gender' },
                    { label: 'NCC Candidate' },
                    { label: 'Stream' },
                    { label: 'Date of Issue' },

                ].map((field, idx) => (
                    <div key={idx} className="flex  border-b-2 py-3 text-base px-4">
                        <label className="block  font-medium text-gray-700">{idx + 1}.</label>
                        <label className="block  font-medium text-gray-700">&nbsp;&nbsp;{field.label}&nbsp; :</label>

                    </div>
                ))}
            </div>
            <div className=" justify-between flex px-4 mt-3">
                <div className='flex items-center justify-center font-medium'>
                    <h1>
                        <img src={signature} alt="" />
                        Principal
                    </h1>
                </div>
                <div className='flex items-center justify-center font-medium'>
                    <h1>
                        <img src={signature} alt="" />
                        Stamp
                    </h1>
                </div>
            </div>
            <div className=" w-full flex items-center justify-center">
                <div className="text-xl font-medium mb-4 justify-center w-fit rounded-lg shadow-md py-1 px-3 mt-3 bg-secondary text-black hover:bg-blue-400 cursor-pointer hover:text-white" onClick={handlePrint}>
                    Download
                </div>
            </div>

        </div>
    )
}
