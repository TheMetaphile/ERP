import React, { useState, useEffect, useContext } from "react";
import Loading from "../../LoadingScreen/Loading";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import ClassWorkGrid from "./utils/ClassWorkGrid";
import SubjectGrid from "./utils/SubjectGrid";
import { BASE_URL_ClassWork } from "../../Config";
import SubjectClassWorkTile from "./utils/SubjectClassworkTile";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SubjectSelection from "./utils/SubjectSelection";

export default function TodayClassWork() {
    const [selectedSubject, setSelectedSubject] = useState('Maths');
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const { authState } = useContext(AuthContext);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(4);
    const [allDataFetched, setAllDataFetched] = useState(false);

    const handleSubjectSelect = (subject) => {
        setSelectedSubject(subject);
        console.log("Selected Subject:", subject);
    }

    useEffect(() => {
        setStart(0);
        setDetails([]);
        setAllDataFetched(false);
        fetchClassWork();
    }, [authState.accessToken, selectedSubject]);

    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

    useEffect(() => {
        if (start !== 0) {
            fetchClassWork();
        }
    }, [start, selectedSubject]);



    const fetchClassWork = async () => {
        console.log(authState.userDetails.currentClass, new Date().getMonth() + 1, authState.userDetails.academicYear, authState.userDetails.section, selectedSubject)
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL_ClassWork}/classwork/fetch/student?class=${authState.userDetails.currentClass}&month=${new Date().getMonth() + 1}&year=${authState.userDetails.academicYear}&section=${authState.userDetails.section}&subject=${selectedSubject}&start=${start}&end=${end}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`,
                }
            });
            const work = response.data.classwork.length;
            console.log("API response:", response.data.classwork);
            if (work < end) {
                toast.success('All data fetched');
                console.log('All data fetched')
                setAllDataFetched(true);
            }
            setDetails(prevData => [...prevData, ...response.data.classwork]);
            console.log('fetch', response.data)
        } catch (error) {
            console.error("Error fetching student classwork:", error);
        }
        finally {
            setLoading(false)
        }
    };


    return (
        <div className="flex flex-col mobile:max-tablet:mt-4  ">
            <ToastContainer />
            <div className="flex justify-between items-center px-3">
                <h1 className="text-xl mobile:max-tablet:text-lg font-medium px-2">Classwork</h1>
                <SubjectSelection onSubjectSelect={handleSubjectSelect} />
            </div>
            {loading ? (
                <Loading />
            ) : details.length === 0 ? (
                <div className="text-center w-full mt-2">No classwork found</div>
            ) : (
                <>
                    <SubjectClassWorkTile subject={selectedSubject} details={details} />
                    {!allDataFetched && (
                        <h1 className='text-blue-500 hover:text-blue-800 mt-3 cursor-pointer text-center' onClick={handleViewMore}>View More</h1>
                    )}
                </>
            )}
        </div>
    )
}