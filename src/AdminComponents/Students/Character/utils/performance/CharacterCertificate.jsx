import { useLocation, useParams } from "react-router-dom";

import logo from '../../../../../assets/school logo.png'
export default function Certificate() {
    const { id } = useParams();
    const handlePrint = () => {
        window.print();
    };
    return (
        <div className="flex flex-col w-full h-screen overflow-y-auto items-start mt-2 px-2 no-scrollbar">

            <div className="flex justify-center  w-full">
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
                <h1 className='tablet:text-3xl mobile:max-tablet:text-xl font-medium text-text_blue text-center'>Character Certficate</h1>
                <div className="border-t-2 border-text_blue my-3 tablet:mx-3 rounded-full "></div>
            </div>
            name={id}

            <div className="text-xl font-medium my-3 bg-secondary text-black self-center rounded-lg shadow-md py-1 px-3 mt-3 hover:bg-blue-400 cursor-pointer hover:text-white" onClick={handlePrint}>
                Download
            </div>
        </div>
    )
}