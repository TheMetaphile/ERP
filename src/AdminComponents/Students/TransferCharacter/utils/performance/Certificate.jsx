import { useLocation, useParams } from "react-router-dom";
import signature from '../../../../../assets/signature.jpg';
import logo from '../../../../../assets/school logo.png'

export default function Certificate() {
    const { id } = useParams();

    const handlePrint = () => {
        window.print();
    };
    return (
        <div className="px-2 mobile:max-tablet:mt-4  rounded-lg shadow-md mb-2 mx-3">

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
                <h1 className='tablet:text-3xl mobile:max-tablet:text-xl font-medium text-text_blue text-center'>Transfer Certificate</h1>
                <div className="border-t-2 border-text_blue my-3 tablet:mx-3 rounded-full "></div>
            </div>
            {/* name={id} */}

            <div className=" justify-between flex px-4 mt-3">
                <div className='font-medium'>
                    T.C No. :
                </div>
                <div className='font-medium'>
                    Affiliation No. :
                </div>
                <div className='font-medium'>
                    School code
                </div>
            </div>

            <div className=" justify-between flex px-4 mt-3">
                <div className='font-medium'>
                    Registration No. :
                </div>
                <div className='font-medium'>
                    Adm. No. :
                </div>
            </div>
            <div className='font-medium px-4 text-sm'>
                (In case of IX to XII)
            </div>

            <div className=" w-full px-4 mt-2">
                {[
                    { label: 'Name of the Student' },
                    { label: 'Mother\'s Name' },
                    { label: 'Father\'s Name/ Guardian\'s Name' },
                    { label: 'Date of Birth' },
                    { label: 'Nationality' },
                    { label: 'Whether the Candidate belongs to (SC, ST, OBC, GEN, EWS)' },
                    { label: 'Date of first Admission in school with class' },
                    { label: 'Class in which the Student last studied' },
                    { label: 'School/ Boar Annual Examination last taken with results' },
                    { label: 'Main Subject studied' },
                    { label: 'Whether qualified for promotion' },
                    { label: 'Month up to which the pupil has paid School dues' },
                    { label: 'Total number of Working days in the Academic Session' },
                    { label: 'Total number of Working days Pupil Present' },
                    { label: 'Extra Co-curricular activities in which the pupil participated' },
                    { label: 'General Conduct' },
                    { label: 'Date of application for certificate' },
                    { label: 'Date of certificate issued' },
                    { label: 'Reason for leaving the school' },
                    { label: 'Any other remarks' },

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
                        Prepared By
                    </h1>
                </div>
                <div className='flex items-center justify-center font-medium'>
                    <h1>
                        <img src={signature} alt="" />
                        Checked By
                    </h1>
                </div>
                <div className='flex items-center justify-center font-medium'>
                    <h1>
                        <img src={signature} alt="" />
                        Principal
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
