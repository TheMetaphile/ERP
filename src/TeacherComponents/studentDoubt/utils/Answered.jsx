import React, { useState, useEffect, useContext } from 'react'
import AnsweredTile from './AnsweredTile'
import Loading from '../../../LoadingScreen/Loading'
import axios from 'axios'
import AuthContext from '../../../Context/AuthContext'
import { BASE_URL_AskDoubt } from '../../../Config'

function Answered() {
    const { authState } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [Class, setClass] = useState('9th');
    const [Section, setSection] = useState('A');
    const [Subject, setSubject] = useState('Maths');

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

        if (authState.accessToken) {
            fetchUserData();
        } else {
            setError('No access token available');
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



    return (
        <div className=' mr-3'>
            <div className='flex justify-between'>
                <select id="class" value={Class} onChange={handleClassChange} className="rounded-lg mr-3 shadow-md px-3 py-1 border-2 border-gray-200 text-lg">
                    <option value="">Search by Class</option>
                    <option value="Pre-Nursery">Pre-Nursery</option>
                    <option value="Nursery">Nursery</option>
                    <option value="L.K.J">L.K.J</option>
                    <option value="U.K.J">U.K.J</option>
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

                <select id="section" value={Section} onChange={handleSectionChange} className="rounded-lg shadow-md px-3 py-1 border-2 border-gray-200 text-lg">
                    <option value="">Search by Section</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                    <option value="H">H</option>
                    <option value="I">I</option>
                </select>

                <select id="subject" value={Subject} onChange={handleSubjectChange} className="rounded-lg shadow-md px-3 py-1 border-2 border-gray-200 text-lg">
                    <option value="">Search by Subject</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Maths">Maths</option>
                    <option value="Science">Science</option>
                    <option value="English">English</option>
                    <option value="History">History</option>
                    <option value="Geography">Geography</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Computer">Computer</option>
                </select>
            </div>
            <AnsweredTile data={data} />
        </div>
    )
}

export default Answered