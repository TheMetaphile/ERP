import React, { useState, useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../LoadingScreen/Loading'
import axios from 'axios'
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL_Fee } from '../../../Config';
import { Link, Outlet } from 'react-router-dom';

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

function FeeDetails() {
    const [selectedClass, setSelectedClass] = useState("9th");
    const [section, setSelectedSection] = useState("A");
    const [sectionsDetails, setSectionsDetails] = useState([]);

    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([])
    const { authState } = useContext(AuthContext);
    const session = getSessions();
    const [selectedSession, setSelectedSession] = useState(session[0]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(9);
    const [allDataFetched, setAllDataFetched] = useState(false);

    const [clickedIndex, setClickedIndex] = useState(null);

    useEffect(() => {
        const fetchSections = async () => {
            console.log(selectedClass)
            try {
                const response = await axios.post(`${BASE_URL_Fee}/classTeacher/fetch/sections`, {
                    accessToken: authState.accessToken,
                    class: selectedClass,
                });
                console.log(response.data, 'section');
                const sectionsDetail = response.data.sections.map(sectionObj => sectionObj.section);
                setSectionsDetails(sectionsDetail);
            } catch (error) {
                console.error("Error while fetching section:", error);
            }
        };
        fetchSections();
    }, [selectedClass])


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
        <div className=" flex flex-col px-3  mobile:max-tablet:px-0   items-start mt-2  mb-3 ">
            <ToastContainer />

            <div className='flex w-full justify-between whitespace-nowrap mobile:max-tablet:flex-col'>
                <h1 className="text-2xl p-2 mobile:max-tablet:text-lg">Student Fee Details</h1>

                <div className='flex justify-end gap-2 mobile:max-tablet:flex-wrap'>
                    <select
                        id="sessionSelector"
                        value={selectedSession}
                        onChange={handleChange}
                        className="mobile:max-tablet:mx-4 border rounded-md w-fit mobile:max-tablet:px-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                    >
                        {session.map((session, index) => (
                            <option key={index} value={session}>
                                {session}
                            </option>
                        ))}
                    </select>
                    <select
                        className="mobile:max-tablet:mx-4 border rounded-md w-fit  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                        id="Class"
                        name="Class"
                        value={selectedClass}
                        onChange={handleClassChange}
                        required
                    >
                        <option value="" >Select Class</option>
                        <option value="Pre-Nursery">Pre-Nursery</option>
                        <option value="Nursery">Nursery</option>
                        <option value="L.K.G">L.K.G</option>
                        <option value="U.K.G">U.K.G</option>
                        <option value="1st">1st</option>
                        <option value="2nd">2nd</option>
                        <option value="3rd">3rd</option>
                        <option value="4th">4th</option>
                        <option value="5th">5th</option>
                        <option value="6th">6th</option>
                        <option value="7th">7th</option>
                        <option value="8th">8th</option>
                        <option value="9th">9th</option>
                        <option value="10th">10th</option>
                        <option value="11th">11th</option>
                        <option value="12th">12th</option>

                    </select>

                    <select id="section" value={section} onChange={handleSectionChange} className="w-full px-4 py-2 border rounded-md mobile:max-tablet:text-xs mobile:max-tablet:px-1 mobile:max-tablet:py-2">
                        <option value=''>Search by Section</option>
                        {sectionsDetails.map((section, index) => (
                            <option key={index} value={section}>{section}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className=' w-full'>
                <div className=' mt-2  border rounded-lg overflow-auto'>
                    <div className="flex justify-between  py-2  bg-gradient-to-r from-purple-400 to-purple-500 text-white  rounded-t-lg border border-b-2  whitespace-nowrap mobile:max-tan
                    w-fit">
                        <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm ">
                            Roll No.
                        </h1>
                        <h1 className="w-64 mobile:max-tablet:w-44 text-lg text-center font-medium mobile:max-tablet:text-sm ">
                            Name
                        </h1>
                        <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm ">
                            Section
                        </h1>
                        <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm ">
                            Session
                        </h1>
                        <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm ">
                            Total Fee
                        </h1>
                        <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm ">
                            Discount
                        </h1>
                        <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm ">
                            Paid
                        </h1>
                        <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm ">
                            Payable
                        </h1>
                    </div>
                    {loading ? (
                        <Loading />
                    ) : (
                        details.length > 0 ? (
                            <div className=' mobile:max-tablet:w-fit'>
                                {details.map((details, index) => (
                                    <Link to={`/Admin-Dashboard/StudentsFee/details/${details.email}`}>
                                        <div key={index} className={`px-1 flex justify-between w-full py-2 pl-2 h-fit border gap-x-4 items-center ${clickedIndex === index ? 'bg-secondary' : ''}`}
                                        //  onClick={() => handleClick(index)}
                                        >
                                            <h1 className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                {details.rollNumber}
                                            </h1>
                                            <h1 className="w-44 mobile:max-tablet:w-32  text-lg flex items-center gap-2 text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
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
                                            <h1 className="w-32 mobile:max-tablet:w-20 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                {details.totalfee}
                                            </h1>
                                            <h1 className="w-32 mobile:max-tablet:w-24 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                {details.discountAmount}
                                            </h1>
                                            <h1 className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                {details.paid}
                                            </h1>
                                            <h1 className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                {details.payableFee || 'NA'}
                                            </h1>
                                        </div>
                                    </Link>

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

export default FeeDetails;

