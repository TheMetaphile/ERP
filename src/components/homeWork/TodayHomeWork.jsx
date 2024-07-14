import React, { useState, useEffect, useContext } from "react";
import Loading from "../../LoadingScreen/Loading";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import HomeWorkGrid from "./utils/HomeWorkGrid";
import HomeSubjectGrid from "./utils/HomeSubjectGrid";
import { useNavigate } from "react-router-dom";
import { BASE_URL_Homework } from "../../Config";
import SubjectHomeWorkTile from "./utils/SubjectHomeWorkTile";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TodayHomeWork() {
    const [subject, setSubject] = useState('Maths');
    const subjects = ['Maths', 'Science', 'History', 'English', 'Geography'];
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const { authState } = useContext(AuthContext);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(4);
    const [allDataFetched, setAllDataFetched] = useState(false);

    const handleSubjectChange = (e) => {
        const selectedSubject = e.target.value;
        setSubject(selectedSubject);
    };

    useEffect(() => {
        setStart(0);
        setDetails([]);
        setAllDataFetched(false);
        fetchHomework();
    }, [authState.accessToken, subject]);

    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

    useEffect(() => {
        if (start !== 0) {
            fetchHomework();
        }
    }, [start, subject]);

    const fetchHomework = async () => {
        console.log(authState.userDetails.currentClass, new Date().getMonth() + 1, authState.userDetails.academicYear, authState.userDetails.section, subject)
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL_Homework}/homework/fetch/student?class=${authState.userDetails.currentClass}&month=${new Date().getMonth() + 1}&year=${authState.userDetails.academicYear}&section=${authState.userDetails.section}&subject=${subject}&start=${start}&end=${end}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`,
                }
            });

            const work = response.data.homework.length;
            console.log("API response:", response.data.homework);
            if (work < end) {
                toast.success('All data fetched');
                console.log('All data fetched')
                setAllDataFetched(true);
            }
            setDetails(prevData => [...prevData, ...response.data.homework]);
            console.log('fetch', response.data)
        } catch (error) {
            console.error("Error fetching student homework:", error);
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <div className="flex flex-col">
            {/* <h1 className="text-lg font-medium px-2">Today HomeWork</h1>
            <HomeWorkGrid /> */}
            <ToastContainer />
            <div className="flex justify-between items-center px-3 mobile:max-tablet:mt-4">
                <h1 className="text-3xl mobile:max-laptop:text-lg font-medium px-2">Homework</h1>
                <select
                    id="subject"
                    value={subject}
                    onChange={handleSubjectChange}
                    className="mt-1 border block py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                            {subject}
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <Loading />
            ) : details.length === 0 ? (
                <div className="w-full text-center mt-2">No homework found</div>
            ) : (
                <>
                    <SubjectHomeWorkTile subject={subject} details={details} />
                    {!allDataFetched && (
                        <h1 className='text-blue-500 hover:text-blue-800 mt-3 cursor-pointer text-center' onClick={handleViewMore}>View More</h1>
                    )}
                </>
            )
            }
            {/* <HomeSubjectGrid /> */}
        </div>
    )
}