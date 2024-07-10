import React, { useState, useEffect, useContext } from 'react'
import AnsweredTile from './AnsweredTile'
import Loading from '../../../LoadingScreen/Loading'
import axios from 'axios'
import AuthContext from '../../../Context/AuthContext'
import { BASE_URL_AskDoubt } from '../../../Config'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Answered() {
    const { authState } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [Class, setClass] = useState('9th');
    const [Section, setSection] = useState('A');
    const [Subject, setSubject] = useState('Maths');
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(4);
    const [allDataFetched, setAllDataFetched] = useState(false);

    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

    useEffect(() => {
        if (authState.accessToken && Class && Section && Subject) {
            setStart(0);
            setData([]);
            fetchUserData();
        } else {
            setError('No access token available');
            setLoading(false);
        }
    }, [authState.accessToken, Class, Section, Subject]);

    useEffect(() => {
        if (start !== 0) {
            fetchUserData();
        }
    }, [start]);

    const fetchUserData = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`${BASE_URL_AskDoubt}/doubts/fetch/teacher?class=${Class}&section=${Section}&subject=${Subject}&status=${'Resolved'}&start=${start}&end=${end}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
             const doubt = response.data.doubts;
            console.log("API response:", response.data);
            setData(prevData => [...prevData, ...response.data.doubts]);
            if (doubt.length < end) {
                toast.success('All data fetched');
                console.log('All data fetched')
                setAllDataFetched(true);
            }

        } catch (err) {
            setError(err.message);

        }
        finally {
            setLoading(false);

        }
    };


    const handleClassChange = (e) => {
        setClass(e.target.value);
    };

    const handleSectionChange = (e) => {
        setSection(e.target.value);
    };

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    };

    if (loading) {
        return <Loading />;
    }


    const uniqueClasses = Array.from(new Set(authState.subject.map(subj => subj.class)));

    const uniqueSections = Array.from(new Set(authState.subject.map(subj => subj.section)));

    const uniqueSubjects = Array.from(new Set(authState.subject.map(subj => subj.subject)));

    return (
        <div className=' mr-3'>
            <div className='flex justify-between'>
                <select id="class" value={Class} onChange={handleClassChange} className="rounded-lg mr-3 shadow-md px-3 py-1 border-2 border-gray-200 text-lg">
                    <option value="">Search by Class</option>
                    {uniqueClasses.map((classOption, index) => (
                        <option key={index} value={classOption}>{classOption}</option>
                    ))}
                </select>

                <select id="section" value={Section} onChange={handleSectionChange} className="rounded-lg shadow-md px-3 py-1 border-2 border-gray-200 text-lg">
                    <option value="">Search by Section</option>
                    {uniqueSections.map((sectionOption, index) => (
                        <option key={index} value={sectionOption}>{sectionOption}</option>
                    ))}
                </select>

                <select id="subject" value={Subject} onChange={handleSubjectChange} className="rounded-lg shadow-md px-3 py-1 border-2 border-gray-200 text-lg">
                    <option value="">Search by Subject</option>
                    {uniqueSubjects.map((subjectOption, index) => (
                        <option key={index} value={subjectOption}>{subjectOption}</option>
                    ))}
                </select>
            </div>
            <AnsweredTile data={data} />
            {!allDataFetched && (
                <h1 className='text-blue-500 hover:text-blue-800 mt-3 cursor-pointer text-center' onClick={handleViewMore}>View More</h1>
            )}
        </div>
    )
}

export default Answered