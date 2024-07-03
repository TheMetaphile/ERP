import React, { useState, useEffect, useContext } from 'react'
import NewDoubtTile from './NewDoubtTile'
import Loading from '../../../LoadingScreen/Loading'
import axios from 'axios'
import AuthContext from '../../../Context/AuthContext'
import { BASE_URL_AskDoubt } from '../../../Config'

function NewDoubt() {
    const { authState } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [Class, setClass] = useState('');
    const [Section, setSection] = useState('');
    const [Subject, setSubject] = useState('');

    const fetchUserData = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`${BASE_URL_AskDoubt}/doubts/fetch/teacher?class=${Class}&section=${Section}&subject=${Subject}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            console.log("API response:", response.data);
            setData(response.data.doubts || []);

        } catch (err) {
            setError(err.message);

        }
        finally {
            setLoading(false);

        }
    };
    useEffect(() => {
        if (authState.accessToken && Class && Section && Subject) {
            fetchUserData();
        } else {
            setError('Please select Class, Section, and Subject');
            setLoading(false);
        }
    }, [authState.accessToken, Class, Section, Subject]);

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
            <NewDoubtTile data={data} Class={Class} />
        </div>
    )
}

export default NewDoubt