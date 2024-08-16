import React, { useState, useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../LoadingScreen/Loading'
import axios from 'axios'
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL_Fee } from '../../../Config';
import { Link, Outlet } from 'react-router-dom';
import { MdSchool } from 'react-icons/md';
import { motion } from "framer-motion";

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

function FeeDetailsSubAdmin() {
    const [selectedClass, setSelectedClass] = useState("9th");
    const [section, setSelectedSection] = useState("A");
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([])
    const { authState } = useContext(AuthContext);
    const session = getSessions();
    const [selectedSession, setSelectedSession] = useState(session[0]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(9);
    const [allDataFetched, setAllDataFetched] = useState(false);

    const [clickedIndex, setClickedIndex] = useState(null);

    const handleClick = (index) => {
        setClickedIndex(index);
    };

    const handleClassChange = (e) => {
        setDetails([]);
        setAllDataFetched(false);
        setSelectedClass(e.target.value);
        setStart(0);
    };

    const handleSectionChange = (e) => {
        setDetails([]);
        setAllDataFetched(false);
        setSelectedSection(e.target.value);
        setStart(0);
    };

    const handleChange = (event) => {
        setSelectedSession(event.target.value);
    };






    useEffect(() => {
        if (selectedClass !== "" && selectedSession !== "" && section !== "") {
            fetchDetails();
        }
    }, [selectedClass, selectedSession, section]);

    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

    useEffect(() => {
        if (start !== 0) {
            fetchDetails();
        }
    }, [start]);

    const fetchDetails = async () => {
        console.log(selectedClass, selectedSession)
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL_Fee}/fee/fetch/admin?class=${selectedClass}&start=${start}&end=${end}&session=${selectedSession}&section=${section}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            if (response.status === 200) {
                console.log(response.data);
                const list = response.data.output.length;
                if (list < end) {
                    toast.success('All data fetched');
                    console.log('All data fetched')
                    setAllDataFetched(true);
                }
                setDetails(prevUsers => [...prevUsers, ...response.data.output]);
                setLoading(false);

            }

        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }


    return (

        <div className="flex flex-col px-6 py-8">
            <ToastContainer />
            <div className='flex justify-between items-center mb-8'>
                <h1 className="text-3xl font-bold text-purple-500 flex items-center"><MdSchool className="mr-2" />Student Fee Details</h1>


                <div className='flex justify-end gap-2'>
                    <select id="sessionSelector" value={selectedSession} onChange={handleChange} className="bg-white border-2 border-purple-300 rounded-md py-2 px-4 text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300">
                        {session.map((session, index) => (
                            <option key={index} value={session}>{session}</option>
                        ))}
                    </select>
                    <select id="Class" name="Class" value={selectedClass} onChange={handleClassChange} className="bg-white border-2 border-purple-300 rounded-md py-2 px-4 text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300">
                        <option value="">Select Class</option>
                        {["Pre-Nursery", "Nursery", "L.K.G", "U.K.G", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"].map(cls => (
                            <option key={cls} value={cls}>{cls}</option>
                        ))}
                    </select>
                    <select id="Section" name="Section" value={section} onChange={handleSectionChange} className="bg-white border-2 border-purple-300 rounded-md py-2 px-4 text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300">
                        <option value="">Select Class</option>
                        {["A", "B", "C", "D", "E", "F"].map(cls => (
                            <option key={cls} value={cls}>{cls}</option>
                        ))}
                    </select>

                </div>
            </div>

            <div className='overflow-auto w-full'>

                <div className="flex justify-between  py-2  bg-purple-200 rounded-t-lg border border-b-2  whitespace-nowrap">
                    <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                        Roll No.
                    </h1>
                    <h1 className="w-44 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                        Name
                    </h1>
                    <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                        Section
                    </h1>
                    <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                        Session
                    </h1>
                    <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                        Total Fee
                    </h1>
                    <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                        Discount
                    </h1>
                    <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                        Paid
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
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                                    <Link to={`/Sub-Admin/StudentsFee/details/${details.email}?Class=${selectedClass}&session=${details.session}&name=${details.name}&section=${details.section}`}>
                                        <div key={index} className={`px-1 flex justify-between w-full py-2 pl-2 h-fit border gap-x-4 items-center ${clickedIndex === index ? 'bg-secondary' : 'bg-white'}`} onClick={() => handleClick(index)}>
                                            <h1 className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                {details.rollNumber}
                                            </h1>
                                            <h1 className="w-44 text-lg flex items-center gap-2 text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                <img src={details.profileLink} alt="profile pic" className='w-10 h-10 rounded-full ' />
                                                <div className='w-32'>
                                                    {details.name}
                                                </div>
                                            </h1>
                                            <h1 className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                {details.section}
                                            </h1>
                                            <h1 className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                {details.session}
                                            </h1>
                                            <h1 className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                {details.totalfee}
                                            </h1>
                                            <h1 className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                {details.discountAmount}
                                            </h1>
                                            <h1 className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                {details.fine}
                                            </h1>
                                            <h1 className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                {details.paid}
                                            </h1>
                                            <h1 className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                {details.payableFee}
                                            </h1>
                                        </div>
                                    </Link>
                                </motion.div>

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
            <Outlet />
        </div>
    );
}



export default FeeDetailsSubAdmin;

