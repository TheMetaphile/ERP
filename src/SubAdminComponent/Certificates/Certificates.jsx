import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';
import { BASE_URL_Login, BASE_URL_ClassTeacher } from '../../Config';
import Loading from "../../LoadingScreen/Loading";
import { ToastContainer, toast } from 'react-toastify';

const Certificates = () => {
    const [tcData, setTcData] = useState([]);
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [Class, setClass] = useState('9th');
    const [sectionsDetails, setSections] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(5);
    const [allDataFetched, setAllDataFetched] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState('2024-25');
    const [clickedIndex, setClickedIndex] = useState(null);

    const handleClick = (index) => {
        setClickedIndex(index);
    };
    
    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const newSessions = [];

        for (let i = 0; i < 5; i++) {
            const startYear = currentYear - i;
            const endYear = startYear + 1;
            newSessions.push(`${startYear}-${endYear.toString().slice(-2)}`);
        }

        setSessions(newSessions);
    }, []);

    const handleSessionChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedSession(selectedValue);
    };


    useEffect(() => {
        if (selectedSession) {
            setStart(0);
            setTcData([]);
            fetchUserTc();
            fetchSections();
        }
    }, [selectedSession, Class]);

    useEffect(() => {
        fetchSections();
    }, [Class]);

    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

    useEffect(() => {
        if (start !== 0) {
            fetchUserTc();
        }
    }, [start]);


    const fetchUserTc = async () => {
        setLoading(true);
        console.log(selectedSession, Class)
        console.log(start, 'start', end, 'end')

        try {
            const response = await axios.get(`${BASE_URL_Login}/terminate/terminatedStudents?Class=${Class}&session=${selectedSession}&start=${start}&end=${end}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            if (response.status === 200) {
                console.log(response.data)
                const tc = response.data.list.length;
                if (tc < end) {
                    toast.success('All data fetched');
                    console.log('All data fetched')
                    setAllDataFetched(true);
                }
                setTcData(prevData => [...prevData, ...response.data.list]);

            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleClassChange = (event) => {
        setClass(event.target.value);
    };

    const fetchSections = async () => {
        console.log()
        try {
            if (sectionsDetails.length <= 0 && Class) {
                const response = await axios.post(`${BASE_URL_Login}/classTeacher/fetch/sections`, {
                    accessToken: authState.accessToken,
                    class: Class,
                });
                console.log('section', response.data)
                const sectionsdetail = response.data.sections;
                setSections(sectionsdetail);
            }
        } catch (error) {
            console.error("Error while fetching section:", error);
        }
    };

    return (
        <div className="mx-auto p-4">
            <ToastContainer />
            <div className="flex items-center justify-between pt-20">

                <h1 className='text-3xl mobile:max-tablet:text-2xl '>Certificates</h1>
                <div className="flex items-center gap-2">
                    <select id="class" value={Class} onChange={handleClassChange} className="rounded-lg shadow-md px-3 py-1 border-2 border-gray-200 text-lg mr-3 mobile:max-tablet:mr-0 flex-1">
                        <option value="">Search by Class</option>
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

                    <div>
                        <select id="school-sessions" value={selectedSession} onChange={handleSessionChange} className="rounded-lg shadow-md px-3 py-1 border-2 border-gray-200 text-lg mr-3 mobile:max-tablet:mr-0 flex-1">
                            <option value="">Select Session</option>
                            {sessions.map((session, index) => (
                                <option key={index} value={session}>
                                    {session}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto border-1 rounded-lg pt-4">
                <table className="table w-full border-2">
                    <thead className=" bg-purple-200">
                        <tr className="border border-gray-300 table-row whitespace-nowrap rounded-md ">
                            <th className=" font-normal mobile:max-laptop:text-base text-xl p-2">Roll No.</th>
                            <th className=" font-normal mobile:max-laptop:text-base text-xl p-2">Admission No</th>
                            <th className=" font-normal mobile:max-laptop:text-base text-xl p-2">Name</th>
                            <th className=" font-normal mobile:max-laptop:text-base text-xl p-2">Class</th>
                            <th className=" font-normal mobile:max-laptop:text-base text-xl p-2">Section</th>
                            <th className=" font-normal mobile:max-laptop:text-base text-xl p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody className="table-row-group">
                        {loading ? (
                            <Loading />
                        ) : tcData.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center p-4">
                                    No Data available
                                </td>
                            </tr>
                        ) : (
                            <>
                                {tcData.map((item, index) => (
                                    <tr key={index} className={`border border-gray-300 text-center ${clickedIndex === index ? 'bg-purple-100' : ''}`} onClick={() => handleClick(index)}>
                                        <td className="p-2">{item.rollNumber}</td>
                                        <td className="p-2">15</td>
                                        <td className="flex items-center">
                                            <img src={item.profileLink} alt="" className="w-8 h-8 rounded-full" />
                                            <div className="p-2">{item.name}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">{item.currentClass}</td>
                                        <td className="p-2 whitespace-nowrap">{item.section}</td>

                                        <td className="p-2 whitespace-nowrap">
                                            <Link to={`/Sub-Admin/Certificates/character/${item._id}/${item.currentClass}/${item.section}/${selectedSession}`}>
                                                <button className="bg-purple-100 text-purple-500 px-2 py-0.5 mr-2 rounded">CC</button>
                                            </Link>
                                            <Link to={`/Sub-Admin/Certificates/transfer/${item._id}/${item.currentClass}/${item.section}/${selectedSession}`}>
                                                <button className="bg-purple-100 text-purple-500 px-2 py-0.5 mr-2 rounded">TC</button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {!allDataFetched && (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            <h1 className='text-blue-500 hover:text-blue-800 mt-3 cursor-pointer' onClick={handleViewMore}>View More</h1>
                                        </td>
                                    </tr>
                                )}
                            </>
                        )}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Certificates;
