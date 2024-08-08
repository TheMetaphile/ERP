import React, { useContext, useEffect, useState } from 'react'
import Stats from './utils/Stats';
import Header from './utils/Header';
import StudentDetailTile from './utils/StudentDetailTile';
import Loading from '../../LoadingScreen/Loading';
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';
import { BASE_URL_Login } from '../../Config';
import { ToastContainer } from 'react-toastify';

function NewAdmission() {
    const [Class, setClass] = useState('9th');
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [statLoading, setStatLoading] = useState(true);
    const [distributionMethod, setDistributionMethod] = useState('By Percentage');
    const { authState } = useContext(AuthContext);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(20);
    const [stat, setStat] = useState({});

    const handleClassChange = (event) => {
        setClass(event.target.value);
    };

    const handleDistributionChange = (event) => {
        setDistributionMethod(event.target.value);
    };

    useEffect(() => {
        if (authState.accessToken) {
            fetchUserData();
            fetchUserStat();
        }
    }, [authState.accessToken, Class]);

    const fetchUserData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL_Login}/newStudents/students?class=${Class}&start=${start}&end=${end}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            console.log("API response:", response.data);

            setUserData(response.data.list);
            setLoading(false);


        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const fetchUserStat = async () => {
        setStatLoading(true);
        try {
            const response = await axios.get(`${BASE_URL_Login}/newStudents/stats?class=${Class}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            console.log("API response:", response.data);

            setStat(response.data);
            setStatLoading(false);
        } catch (err) {
            console.log(err);
            setStatLoading(false);
        }
    };

    const handleDistribute = async () => {
        alert(`You are distributing students based on ${distributionMethod} for class ${Class}`);
        try {
            const response = await axios.put(`${BASE_URL_Login}/newStudents/distribute?class=${Class}&type=${distributionMethod}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                }
            );

            console.log("API response:", response.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="w-full px-3 mobile:max-tablet:px-0 overflow-auto items-start mt-2 mb-3 no-scrollbar mobile:max-tablet:mt-6">
            <ToastContainer />
            <div className='flex items-center justify-between '>
                <h1 className="text-2xl p-2 mobile:max-tablet:text-xl">New Admission</h1>

                <div className='flex items-center gap-2'>
                    <select id="class" value={Class} onChange={handleClassChange} className="rounded-lg shadow-md px-3 py-1 border-2 border-gray-200 text-lg  ">
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

                    <select id="distribution" value={distributionMethod} onChange={handleDistributionChange} className="rounded-lg shadow-md px-3 py-1 border-2 border-gray-200 text-lg  ">
                        <option value="">Select Distribution Method</option>
                        <option value="By Name">By Name (Alphabetical)</option>
                        <option value="By Percentage">By Percentage</option>
                        <option value="New Section">New Section</option>
                    </select>

                    <button className='px-3 py-1 bg-secondary rounded-lg shadow-md text-lg' onClick={handleDistribute}>
                        Distribute
                    </button>
                </div>
            </div>

            <div className="mt-4 mobile:max-tablet:w-full mobile:max-tablet:mx-0 mobile:max-tablet:my-8">
                {statLoading ? (
                    <Loading />
                ) : (
                    <Stats stat={stat} method={distributionMethod} />
                )}
            </div>

            <div className="mobile:max-laptop:overflow-y-auto mt-6">
                <div className="rounded-lg shadow-md border h-screen text-center border-black w-full mobile:max-tablet:w-fit overflow-auto whitespace-nowrap mobile:max-tablet:mt-20">
                    <div className="stutable">
                        <Header headings={['Name', 'Class', 'Gender', 'Percentage', 'Phone No.', 'E-mail', 'Action']} />
                    </div>
                    {loading && userData.length < 1 ? (
                        <Loading />
                    ) : userData.length === 0 ? (
                        <div>No students found</div>
                    ) : (
                        <StudentDetailTile userData={userData} Class={Class} />
                    )}

                </div>
            </div>
        </div>
    )
}

export default NewAdmission
