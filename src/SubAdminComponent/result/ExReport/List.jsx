import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import AuthContext from "../../../Context/AuthContext";
import { BASE_URL_Login } from '../../../Config';
import Loading from "../../../LoadingScreen/Loading";
import { ToastContainer, toast } from 'react-toastify';

const List = () => {
    const [data, setData] = useState([]);
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [Class, setClass] = useState('9th');
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(5);
    const [allDataFetched, setAllDataFetched] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState('2024-25');

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
            setData([]);
            fetchUsers();
        }
    }, [selectedSession, Class]);

 

    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

    useEffect(() => {
        if (start !== 0) {
            fetchUsers();
        }
    }, [start]);


    const fetchUsers = async () => {
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
                setData(prevData => [...prevData, ...response.data.list]);

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

 

    return (
        <div className="">
            <ToastContainer />
            <div className="flex items-center justify-between px-3 py-2">

                <h1 className='text-xl font-medium mb-2 '>Ex Student Result</h1>
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
            <div className="overflow-x-auto border-1 rounded-lg pt-2">
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
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center p-4">
                                    No Data available
                                </td>
                            </tr>
                        ) : (
                            <>
                                {data.map((item, index) => (
                                    <tr key={index} className="border border-gray-300 text-center">
                                        <td className="p-2">{item.rollNumber}</td>
                                        <td className="p-2">15</td>
                                        <td className="flex items-center">
                                            <img src={item.profileLink} alt="" className="w-8 h-8 rounded-full" />
                                            <div className="p-2">{item.name}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">{item.currentClass}</td>
                                        <td className="p-2 whitespace-nowrap">{item.section}</td>

                                        <td className="p-2 whitespace-nowrap">
                                            <Link to={`/Sub-Admin/Result/exStudent/${item._id}?Class=${item.currentClass}&session=${selectedSession}`}>
                                                <button className="bg-purple-100 text-purple-500 px-2 py-0.5 mr-2 rounded">Result</button>
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

export default List;
