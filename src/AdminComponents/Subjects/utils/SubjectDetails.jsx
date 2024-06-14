import React, { useEffect, useState, useContext } from 'react';
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import Loading from '../../../LoadingScreen/Loading';

function SubjectDetails({ Class, section }) {
    const [subjectDetails, setSubjects] = useState([]);
    const [subjectLoading, setSubjectLoading] = useState(false);

    useEffect(() => {
        setSubjectLoading(true);
        fetchSubject();
    }, []);

    const fetchSubject = async () => {
        console.log('class', Class, 'section', section)
        // try {
        //     const response = await axios.post('https://assignsubjectapi.onrender.com/assign', {
        //         accessToken: authState.accessToken,
        //         class: Class,
        //         section: sectionsDetails
        //     });
        //     const sectionsdetail = response.data.sections;
        //     console.log(Class);

        //     setSections(sectionsdetail);
        // } catch (error) {
        //     console.error("Error searching for teachers:", error);
        // } finally {
        //     setSubjectLoading(false);
        // }

    };

    return (
        <div>
            <div className="px-2 flex justify-between w-full py-2 pl-2 bg-bg_blue h-fit border border-black">
                <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                    Subject
                </h1>
                <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                    Teacher
                </h1>
            </div>
            {subjectLoading ? (
                <Loading />
            ) : (
                subjectDetails.map((subject, index) => (
                    <div key={index} className="px-2 flex justify-between w-full py-2 pl-2 h-fit border">
                        <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            {subject.name}
                        </h1>
                        <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                            {subject.teacher}
                        </h1>
                    </div>
                ))
            )}
        </div>
    )
}

export default SubjectDetails


