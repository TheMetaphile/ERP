import React, { useState, useEffect, useContext } from "react";
import Loading from "../../LoadingScreen/Loading";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import ClassWorkGrid from "./utils/ClassWorkGrid";
import SubjectGrid from "./utils/SubjectGrid";
import { BASE_URL_ClassWork } from "../../Config";
import SubjectClassWorkTile from "./utils/SubjectClassworkTile";

export default function TodayClassWork(){
    const [subject, setSubject] = useState('Maths');
    const subjects = ['Maths', 'Science', 'History', 'English', 'Geography'];
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const { authState } = useContext(AuthContext);

    const handleSubjectChange = (e) => {
        const selectedSubject = e.target.value;
        setSubject(selectedSubject);
    };

    useEffect(() => {
        const fetchClassWork = async () => {
            console.log(authState.userDetails.currentClass, new Date().getMonth() + 1, authState.userDetails.academicYear, authState.userDetails.section, subject)
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL_ClassWork}/classwork/fetch/student?class=${authState.userDetails.currentClass}&month=${new Date().getMonth() + 1}&year=${authState.userDetails.academicYear}&section=${authState.userDetails.section}&subject=${subject}`, {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
                    }
                });

                setDetails(response.data.classwork);
                console.log('fetch', response.data)
            } catch (error) {
                console.error("Error fetching student classwork:", error);
            }
            finally {
                setLoading(false)
            }
        };

        fetchClassWork();
    }, [authState.accessToken,subject]);

    return (
        <div className="flex flex-col  ">
            {/* <h1 className="text-xl font-medium mb-2">Todays ClassWork</h1>
            <ClassWorkGrid /> */}
            <div className="flex justify-between items-center px-3">
                <h1 className="text-xl font-medium mt-4 px-2">Classwork</h1>
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
            {/* <h1 className="text-xl font-medium mt-4 mb-2">Subject-wise ClassWork</h1>
            <SubjectGrid /> */}
            {loading ? (
                <Loading />
            ) : details.length === 0 ? (
                <div className="text-center w-full mt-2">No classwork found</div>
            ) : (
                <SubjectClassWorkTile subject={subject} details={details} />

            )}
        </div>
    )
}