import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../Context/AuthContext';
import { Link, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewDoubt from './utils/NewDoubt';
import Answered from './utils/Answered';
function StudentDoubts() {
    const { authState } = useContext(AuthContext);
    const [Class, setClass] = useState('9th');
    const [Section, setSection] = useState('A');
    const [Subject, setSubject] = useState('Maths');
    const [selectedLink, setSelectedLink] = useState(`/Teacher-Dashboard/studentdoubts/new`);

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

    const handleLinkSelect = (link) => {
        setSelectedLink(link);
    };

    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const handleClassChange = (e) => {
        setClass(e.target.value);
    };

    const handleSectionChange = (e) => {
        setSection(e.target.value);
    };

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    };

    return (
        <div className="flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar mobile:max-laptop:mt-0">
            <ToastContainer />
            <div className="flex justify-between w-full items-center">
                <h1 className="text-3xl mobile:max-laptop:text-xl whitespace-nowrap">Student Doubts</h1>
                <div className="block tablet:hidden w-full mobile:max-tablet:text-end">
                    <button
                        className="p-2 border rounded"
                        onClick={() => setDropdownVisible(!isDropdownVisible)}
                    >
                        Filter
                    </button>
                    {isDropdownVisible && (
                        <div className="flex absolute left-0 right-0 bg-white p-4 gap-2 justify-between mobile:max-tablet:flex-col mobile:max-ta">
                            <select id="class" value={Class} onChange={handleClassChange} className="rounded-lg mr-3 mobile:max-tablet:mr-0 shadow-md px-3 py-1 border-2 border-gray-200 text-lg">
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
                    )}
                </div>

                <div className="flex justify-between mobile:max-tablet:hidden">
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
            </div>
            <div className="mt-2 mobile:max-tablet:mt-0 w-full">
                <div className="flex mt-2 mobile:max-laptop:mt-1 mr-3 items-center justify-between">
                    <div className="flex gap-2">
                        <button className={`p-2 mx-1 ${selectedLink === `/Teacher-Dashboard/studentdoubts/new` ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600"}`}
                            onClick={() => handleLinkSelect(`/Teacher-Dashboard/studentdoubts/new`)}>New Doubts</button>

                        <button className={`p-2 mx-1 ${selectedLink === `/Teacher-Dashboard/studentdoubts/answered` ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600"}`}
                            onClick={() => handleLinkSelect(`/Teacher-Dashboard/studentdoubts/answered`)}>                            Answered Doubts
                        </button>
                    </div>
                </div>
                <hr className="border-t-2 bg-slate-500 -mt-0.5 mb-3" />
                <div className="mt-2">
                    {selectedLink === '/Teacher-Dashboard/studentdoubts/new' && (
                        <div className="">
                            <NewDoubt Class={Class} Section={Section} Subject={Subject} />
                        </div>
                    )}

                    {selectedLink === '/Teacher-Dashboard/studentdoubts/answered' && (
                        <div className="">
                            <Answered Class={Class} Section={Section} Subject={Subject} />
                        </div>
                    )}
                </div>
                {/* <Outlet /> */}
                <br />
            </div>
        </div>
    );
}

export default StudentDoubts;
