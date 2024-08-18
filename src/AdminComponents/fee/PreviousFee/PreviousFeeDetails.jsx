import React, { useState, useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../LoadingScreen/Loading'
import axios from 'axios'
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL_Fee } from '../../../Config';
import { Outlet } from 'react-router-dom';

const getSessions = () => {
    const currentYear = new Date().getFullYear();
    const newSessions = [];

    for (let i = 0; i < 5; i++) {
        const startYear = currentYear - i;
        const endYear = startYear + 1;
        newSessions.push(`${startYear}-${endYear.toString().slice(-2)}`);
    }

    return newSessions;
}

function PreviousFeeDetailsAdmin() {

    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([])
    const { authState } = useContext(AuthContext);
    const session = getSessions();
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(9);
    const [allDataFetched, setAllDataFetched] = useState(false);

    const [clickedIndex, setClickedIndex] = useState(null);




    useEffect(() => {
        if (authState.accessToken) {
            fetchDetails();
        }
    }, [authState.accessToken]);

    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

    useEffect(() => {
        if (start !== 0) {
            fetchDetails();
        }
    }, [start]);

    const fetchDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL_Fee}/fee/fetch/pendingFeeStats`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            if (response.status === 200) {
                console.log(response.data);
                const list = response.data.length;
                if (list < end) {
                    toast.success('All data fetched');
                    console.log('All data fetched')
                    setAllDataFetched(true);
                }
                setDetails(prevUsers => [...prevUsers, ...response.data]);
                setLoading(false);

            }

        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }


    return (
        <div className=" flex flex-col px-3  mobile:max-tablet:px-0   items-start mt-2  mb-3 ">
            <ToastContainer />

            <div className='flex w-full justify-between whitespace-nowrap mobile:max-tablet:flex-col'>
                <h1 className="text-2xl p-2">Previous Fee Details</h1>


            </div>

            <div className='overflow-auto w-full'>
                <div className=' mt-2  border rounded-lg'>
                    <div className="flex justify-between  py-2  bg-gradient-to-r from-teal-400 to-blue-500 text-white  rounded-t-lg border border-b-2  whitespace-nowrap">
                        <h1 className="w-44 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Name
                        </h1>
                        <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Class
                        </h1>
                        <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Section
                        </h1>
                        <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Session
                        </h1>
                        <h1 className="w-44 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Phone Number
                        </h1>
                        <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Total Fee
                        </h1>
                        <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Discount
                        </h1>
                        <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Payable
                        </h1>
                    </div>
                    {loading ? (
                        <Loading />
                    ) : (
                        details.length > 0 ? (
                            <div>
                                {details.map((details, index) => (
                                    // <Link to={`/Admin-Dashboard/StudentsFee/details/${details.email}?Class=${selectedClass}&session=${details.session}&name=${details.name}&section=${details.section}`}>
                                    <div key={index} className={`px-1 flex justify-between w-full py-2 pl-2 h-fit border gap-x-4 items-center ${clickedIndex === index ? 'bg-secondary' : ''}`}
                                    //  onClick={() => handleClick(index)}
                                    >
                                        <h1 className="w-44 text-lg flex items-center gap-2 text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            <img src={details.Student.profileLink} alt="profile pic" className='w-10 h-10 rounded-full ' />
                                            <div className='w-32'>
                                                {details.Student.name}
                                            </div>
                                        </h1>
                                        <h1 className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.Student.currentClass}
                                        </h1>
                                        <h1 className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.Student.section}
                                        </h1>
                                        <h1 className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.session}
                                        </h1>
                                        <h1 className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.Student.fatherPhoneNumber}
                                        </h1>
                                        <h1 className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.total}
                                        </h1>
                                        <h1 className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.discount}
                                        </h1>
                                        <h1 className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.total - details.discount}
                                        </h1>
                                    </div>
                                    // {/* </Link> */}

                                ))}
                                {!allDataFetched && (
                                    <div colSpan="4" className="text-center">
                                        <h1 className='text-blue-500 hover:text-blue-800 mt-3 cursor-pointer' onClick={handleViewMore}>View More</h1>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className='text-center mt-2'>No Fee Details available</div>
                        )
                    )}
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default PreviousFeeDetailsAdmin;

