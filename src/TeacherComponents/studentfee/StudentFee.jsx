import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../Context/AuthContext';
import Loading from '../../LoadingScreen/Loading';
import axios from 'axios'
import Selection from './utils/Selection';
import Header from '../../AdminComponents/Home/utils/TeachersDetails/LeftCard/Header'
import { BASE_URL_Fee } from '../../Config';
import { ToastContainer, toast } from 'react-toastify';

function StudentFee() {
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const { authState } = useContext(AuthContext);
    const [filter, setFilter] = useState('');
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(10);
    const [allDataFetched, setAllDataFetched] = useState(false);
    const [clickedIndex, setClickedIndex] = useState(null);

    const handleClick = (index) => {
        setClickedIndex(index);
    };

    useEffect(() => {
        setStart(0);
        setDetails([]);
        setLoading(true);
        fetchDetails();
    }, [authState.accessToken, filter]);

    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

    useEffect(() => {
        if (start !== 0) {
            fetchDetails();
        }
    }, [start, filter]);


    const fetchDetails = async () => {
        setLoading(true);
        try {
            console.log(start, "-", end);
            const response = await axios.get(`${BASE_URL_Fee}/fee/fetch/classTeacher?&start=${start}&end=${end}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            if (response.status === 200) {
                const output = response.data.output;
                console.log("API response:", response.data.output);
                if (output < end) {
                    toast.success('All data fetched');
                    console.log('All data fetched')
                    setAllDataFetched(true);
                }
                setDetails(prevStudents => [...prevStudents, ...response.data.output]);
            }

        } catch (err) {
            console.log("r", err);

        }
        finally {
            setLoading(false);
        }
    }



    return (
        <div className=" w-full items-start  px-2 ">
            <ToastContainer />
            <div className=' my-3 flex  w-full justify-between'>
                <h1 className="text-2xl mobile:max-tablet:text-lg font-medium mb-2">Student Fee</h1>
                <Selection setFilter={setFilter} />
            </div>
            <div className=' overflow-auto'>
                <div className='  rounded-lg border shadow-md border-gray-300 mobile:max-tablet:h-auto  w-full mobile:max-tablet:w-fit  overflow-x-auto'  >
                    <Header headings={['Roll No.', 'Name', 'Total Fee', 'Fine', 'Discount', 'Paid', 'Payable', 'Pending']} />

                    {loading && details.length == 0 ? (
                        <Loading />
                    ) : (
                        details.length > 0 ? (

                            <div className=' ' >
                                {details.map((details, index) => (
                                    filter === 'Paid'
                                        ?
                                        details.payableFee - details.paid == 0
                                            ?
                                            <div key={index} className={`flex justify-evenly  py-2 pl-2 h-fit mobile:max-laptop:w-fit border ${clickedIndex === index ? 'bg-secondary' : ''}`} onClick={() => handleClick(index)}>

                                                <h1 className="w-40 mobile:max-tablet:w-20 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                    {details.rollNumber}
                                                </h1>
                                                <div className="w-52 mobile:max-tablet:w-48 overflow-hidden text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap flex items-center gap-1">
                                                    <img src={details.profileLink} alt="img" className='w-8 h-8 rounded-full'></img>
                                                    <h1 >
                                                        {details.name}
                                                    </h1>
                                                </div>
                                                <h1 className="w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                    {details.totalfee}
                                                </h1>
                                                <h1 className="w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                    {details.fine}
                                                </h1>
                                                <h1 className="w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                    {details.discountAmount}
                                                </h1>
                                                <h1 className={`w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap`}>
                                                    {details.paid}
                                                </h1>
                                                <h1 className="w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                    {details.payableFee}
                                                </h1>
                                                <h1 className={`w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap ${(details.payableFee - details.paid) === 0 ? "text-green-500" : "text-red-500"}`}>
                                                    {details.payableFee - details.paid}
                                                </h1>

                                            </div>
                                            :
                                            <div></div>
                                        :
                                        filter === 'Pending'
                                            ?
                                            details.payableFee - details.paid > 0
                                                ?
                                                <div key={index} className={`flex justify-evenly  py-2 pl-2 h-fit border mobile:max-laptop:w-fit ${clickedIndex === index ? 'bg-secondary' : ''}`} onClick={() => handleClick(index)}>

                                                    <h1 className="w-40 mobile:max-tablet:w-20 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                        {details.rollNumber}
                                                    </h1>
                                                    <div className="w-52 mobile:max-tablet:w-44 overflow-hidden text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap flex items-center gap-1">
                                                        <img src={details.profileLink} alt="img" className='w-8 h-8 rounded-full'></img>
                                                        <h1 >
                                                            {details.name}
                                                        </h1>
                                                    </div>
                                                    <h1 className="w-40 mobile:max-tablet:w-24 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                        {details.totalfee}
                                                    </h1>
                                                    <h1 className="w-40 text-lg mobile:max-tablet:w-28 text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                        {details.fine}
                                                    </h1>
                                                    <h1 className="w-40 mobile:max-tablet:w-24 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                        {details.discountAmount}
                                                    </h1>
                                                    <h1 className={`w-40 mobile:max-tablet:w-24 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap`}>
                                                        {details.paid}
                                                    </h1>
                                                    <h1 className="w-40 mobile:max-tablet:w-24 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                        {details.payableFee}
                                                    </h1>
                                                    <h1 className={`w-40 mobile:max-tablet:w-24 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap ${(details.payableFee - details.paid) === 0 ? "text-green-500" : "text-red-500"}`}>
                                                        {details.payableFee - details.paid}
                                                    </h1>
                                                </div>
                                                :
                                                <div></div>
                                            :
                                            <div key={index} className={`flex justify-evenly  py-2 pl-2 h-fit border ${clickedIndex === index ? 'bg-secondary' : ''}`} onClick={() => handleClick(index)}>

                                                <h1 className="w-40 mobile:max-tablet:w-20 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                    {details.rollNumber}
                                                </h1>
                                                <div className="w-52 mobile:max-tablet:w-48 overflow-hidden text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap flex items-center gap-1">
                                                    <img src={details.profileLink} alt="img" className='w-8 h-8 rounded-full'></img>
                                                    <h1 >
                                                        {details.name}
                                                    </h1>
                                                </div>
                                                <h1 className="w-40 mobile:max-tablet:w-24 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                    {details.totalfee}
                                                </h1>
                                                <h1 className="w-40 mobile:max-tablet:w-20 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                    {details.fine}
                                                </h1>
                                                <h1 className="w-40 mobile:max-tablet:w-20 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                    {details.discountAmount}
                                                </h1>
                                                <h1 className={`w-40 mobile:max-tablet:w-20 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap`}>
                                                    {details.paid}
                                                </h1>
                                                <h1 className="w-40 mobile:max-tablet:w-20 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                    {details.payableFee}
                                                </h1>
                                                <h1 className={`w-40 mobile:max-tablet:w-20 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap ${(details.payableFee - details.paid) === 0 ? "text-green-500" : "text-red-500"}`}>
                                                    {details.payableFee - details.paid}
                                                </h1>
                                            </div>
                                ))}
                            </div>

                        ) : (
                            <div className='text-center mt-2'>No Fee Details available</div>
                        )
                    )}
                    {!allDataFetched && (
                        <h1 className='text-blue-500 hover:text-blue-800 mt-3 cursor-pointer text-center' onClick={handleViewMore}>View More</h1>
                    )}
                </div>
            </div>
        </div>
    )
}

export default StudentFee
