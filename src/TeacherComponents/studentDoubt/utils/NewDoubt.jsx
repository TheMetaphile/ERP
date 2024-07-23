import React, { useState, useEffect, useContext } from 'react'
import NewDoubtTile from './NewDoubtTile'
import Loading from '../../../LoadingScreen/Loading'
import axios from 'axios'
import AuthContext from '../../../Context/AuthContext'
import { BASE_URL_AskDoubt } from '../../../Config'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { set } from 'date-fns/fp/set'

function NewDoubt() {
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
    const uniqueClasses = Array.from(new Set(authState.subject.map(subj => subj.class)));

    const [uniqueSections, setUniqueSections] = useState([]);
    const [uniqueSubjects, setUniqueSubjects] = useState([]);
    useEffect(() => {
        setUniqueSections(Array.from(new Set(
            authState.subject
                .filter(subj => subj.class === Class)
                .map(subj => subj.section)
        )));
    }, [Class]);


    useEffect(() => {
        setUniqueSubjects(Array.from(new Set(
            authState.subject
                .filter(subj => subj.section === Section && subj.class === Class)
                .map(subj => subj.subject)
        )));
    }, [Section, Class]);

    useEffect(() => {
        setStart(0);
        setData([]);
        setLoading(true);
        setAllDataFetched(false);
        fetchUserData();
    }, [Class, Section, Subject]);

    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

    useEffect(() => {
        if (start !== 0) {
            fetchUserData();
        }
    }, [start]);

    const fetchUserData = async () => {
        console.log(Subject, start, end)
        try {
            const response = await axios.get(`${BASE_URL_AskDoubt}/doubts/fetch/teacher?class=${Class}&section=${Section}&subject=${Subject}&start=${start}&end=${end}&status=${'Pending'}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            const doubt = response.data.doubts;
            console.log("API response:", response.data);
            if (doubt.length < end) {
                toast.success('All data fetched');
                console.log('All data fetched')
                setAllDataFetched(true);
            }
            setData(prevData => [...prevData, ...response.data.doubts]);


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

    if (loading && start === 0) {
        return <Loading />;
    }


    return (
        <div className=' mr-3'>
            <div className='flex justify-between mobile:max-tablet:hidden'>
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
            <NewDoubtTile data={data} Class={Class} />
            {(!allDataFetched) && (
                <h1 className='text-blue-500 hover:text-blue-800 mt-3 cursor-pointer text-center' onClick={handleViewMore}>View More</h1>
            )}
        </div>
    )
}

export default NewDoubt