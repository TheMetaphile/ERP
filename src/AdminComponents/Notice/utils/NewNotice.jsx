import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import Loading from './../../../LoadingScreen/Loading';
import { BASE_URL_Notice, BASE_URL_ClassTeacher, BASE_URL_Login } from '../../../Config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegTimesCircle } from "react-icons/fa";

function NewNotice({ setShowModal }) {
    const { authState } = useContext(AuthContext);
    const [selectedOption, setSelectedOption] = useState('For All');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [emailIds, setEmailIds] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchInputStudent, setSearchInputStudent] = useState('');
    const [searchResultsStudent, setSearchResultsStudent] = useState([]);
    const [searchInputSubAdmin, setSearchInputSubAdmin] = useState('');
    const [searchResultsSubAdmin, setSearchResultsSubAdmin] = useState([]);
    const [classOptions] = useState(['Pre-Nursery', 'Nursery', 'L.K.G', 'U.K.G', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th']);
    const [selectedClass, setSelectedClass] = useState('');
    const [sectionOptions, setSectionOptions] = useState([]);
    const [selectedSection, setSelectedSection] = useState('');
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        if (selectedClass) {
            fetchSections();
        }
    }, [selectedClass]);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    function getCurrentSession() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();

        if (currentMonth > 3) {
            return `${currentYear}-${(currentYear + 1).toString().slice(-2)}`;
        } else {
            return `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
        }
    }
    const Session = getCurrentSession();

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const today = getCurrentDate();

    const handleSubmit = async () => {
        if (!description || !title) {
            alert('Please fill all fields')
        }
        else {
            const payload = {
                title,
                type: selectedOption,
                description,
                session: Session,
                date: today,
            };

            if (selectedOption === 'Particular Students' || selectedOption === 'Particular Teachers' || selectedOption === 'Particular Sub Admin') {
                payload.emailIds = emailIds;
            } else if (selectedOption === 'Particular Classes') {
                payload.Classes = classes;
            }

            console.log('payload', payload);
            setLoading(true);

            try {
                const response = await axios.post(`${BASE_URL_Notice}/notice/upload/admin`,
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${authState.accessToken}`,
                        }
                    }
                );
                if (response.status === 200) {
                    toast.success('Successfully Posted');
                    console.log('fetch', response.data);
                    handleCloseModal();
                }
            } catch (error) {
                toast.error(error.message);
                console.error("Error in posting notice:", error);
            } finally {
                setLoading(false);
            }
        }

    };

    const fetchSections = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${BASE_URL_ClassTeacher}/classTeacher/fetch/sections`, {
                accessToken: authState.accessToken,
                class: selectedClass,
            });
            if (response.status === 200) {
                console.log('section fetched');
                const sectionsdetail = response.data.sections.map(section => section.section);
                setSectionOptions(sectionsdetail);
            }

        } catch (error) {
            console.error("Error fetching sections:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddClass = () => {
        const existingClass = classes.find(cls => cls.Class === selectedClass);

        if (existingClass) {
            if (!existingClass.sections.includes(selectedSection)) {
                existingClass.sections.push(selectedSection);
                setClasses([...classes]);
            }
        } else {
            setClasses([...classes, { Class: selectedClass, sections: [selectedSection] }]);
        }

        setSelectedClass('');
        setSelectedSection('');
        setSectionOptions([]);
    };

    const handleRemoveClass = (classToRemove) => {
        setClasses(classes.filter(cls => cls.Class !== classToRemove));
    };

    const handleRemoveSection = (classToRemove, sectionToRemove) => {
        setClasses(classes.map(cls => {
            if (cls.Class === classToRemove) {
                return { ...cls, sections: cls.sections.filter(sec => sec !== sectionToRemove) };
            }
            return cls;
        }));
    };

    const removeEmailId = (email) => {
        setEmailIds(emailIds.filter(id => id !== email));
    };

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
        if (e.target.value.length > 2) {
            searchUsers(e.target.value);
        } else {
            setSearchResults([]);
        }
    };

    const handleSearchChangeStudent = (e) => {
        setSearchInputStudent(e.target.value);
        if (e.target.value.length > 2) {
            searchStudents(e.target.value);
        } else {
            setSearchResultsStudent([]);
        }
    };

    const handleSearchChangeSubAdmin = (e) => {
        setSearchInputSubAdmin(e.target.value);
        if (e.target.value.length > 2) {
            searchSubAdmin(e.target.value);
        } else {
            setSearchResultsSubAdmin([]);
        }
    };

    const searchStudents = async (query) => {
        console.log(query)
        try {
            const response = await axios.post(`${BASE_URL_Login}/search/student`, {
                accessToken: authState.accessToken,
                searchString: query,
            });
            console.log('search', response.data);
            setSearchResultsStudent(response.data.Teachers);
        } catch (error) {
            console.error("Error searching users:", error);
        }
    };

    const searchSubAdmin = async (query) => {
        console.log(query)
        try {
            const response = await axios.post(`${BASE_URL_Login}/search/subAdmin`, {
                accessToken: authState.accessToken,
                searchString: query,
            });
            console.log('search', response.data);
            setSearchResultsSubAdmin(response.data.Teachers);
        } catch (error) {
            console.error("Error searching users:", error);
        }
    };

    const searchUsers = async (query) => {
        try {
            const response = await axios.post(`${BASE_URL_Login}/search/teacher`, {
                accessToken: authState.accessToken,
                searchString: query,
            });
            console.log('search', response.data);
            setSearchResults(response.data.Teachers);
        } catch (error) {
            console.error("Error searching users:", error);
        }
    };

    const addEmailId = (email,name) => {
        if (!emailIds.includes(email)) {
            setEmailIds([...emailIds, email]);
            setName(name);
        }
    };

    const renderSpecificOptions = () => {
        switch (selectedOption) {
            case 'Particular Students':
                return (
                    <div>
                        <input
                            type="text"
                            className="w-full mb-4 border border-gray-300 rounded-lg px-3 py-2"
                            placeholder="Search for users"
                            value={searchInputStudent}
                            onChange={handleSearchChangeStudent}

                        />
                        {searchResultsStudent.length > 0 ? (
                            <div className="w-full mb-4 border border-gray-300 rounded-lg px-3 py-2 max-h-40 overflow-y-scroll">
                                {searchResultsStudent.map(user => (
                                    <div key={user.email} className="flex justify-between items-center mb-2">
                                        <span className="flex items-center gap-2">
                                            <img src={user.profileLink} alt="" className="w-6 h-6 rounded-full"></img>{user.name} </span>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                            onClick={() => addEmailId(user.email, user.name)}
                                        >
                                            Add
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <></>
                        )}

                        <div className="w-full mb-4 border border-gray-300 rounded-lg px-3 py-2">
                            {emailIds.length > 0 ? (
                                emailIds.map(email => (
                                    <div key={email} className="flex justify-between border mt-2 border-gray-300 shadow-md rounded-full px-2 items-center py-1">
                                        <span>{name}</span>
                                        <FaRegTimesCircle className="text-red-500 h-5 w-5" onClick={() => removeEmailId(email)} />
                                    </div>
                                ))
                            ) : (
                                <span>No email IDs added.</span>
                            )}
                        </div>
                    </div>
                );
            case 'Particular Teachers':
                return (
                    <div>
                        <input
                            type="text"
                            className="w-full mb-4 border border-gray-300 rounded-lg px-3 py-2"
                            placeholder="Search for users"
                            value={searchInput}
                            onChange={handleSearchChange}

                        />
                        {searchResults.length > 0 ? (
                            <div className="w-full mb-4 border border-gray-300 rounded-lg px-3 py-2 max-h-40 overflow-y-scroll">
                                {searchResults.map(user => (
                                    <div key={user.email} className="flex justify-between items-center mb-2">
                                        <span className="flex items-center gap-2">
                                            <img src={user.profileLink} alt="" className="w-6 h-6 rounded-full"></img>{user.name} </span>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                            onClick={() => addEmailId(user.email,user.name)}
                                        >
                                            Add
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <></>
                        )}


                        <div className="w-full mb-4 border border-gray-300 rounded-lg px-3 py-2">
                            {emailIds.length > 0 ? (
                                emailIds.map(email => (
                                    <div key={email} className="flex justify-between border mt-2 border-gray-300 shadow-md rounded-full px-2 items-center py-1">
                                        <span>{name}</span>
                                        <FaRegTimesCircle className="text-red-500 h-5 w-5" onClick={() => removeEmailId(email)} />
                                    </div>
                                ))
                            ) : (
                                <span>No email IDs added.</span>
                            )}
                        </div>
                    </div>
                );
            case 'Particular Sub Admin':
                return (
                    <div>
                        <input
                            type="text"
                            className="w-full mb-4 border border-gray-300 rounded-lg px-3 py-2"
                            placeholder="Search for users"
                            value={searchInputSubAdmin}
                            onChange={handleSearchChangeSubAdmin}

                        />
                        {searchResultsSubAdmin.length > 0 ? (
                            <div className="w-full mb-4 border border-gray-300 rounded-lg px-3 py-2 max-h-40 overflow-y-scroll">
                                {searchResultsSubAdmin.map(user => (
                                    <div key={user.email} className="flex justify-between items-center mb-2">
                                        <span className="flex items-center gap-2">
                                            <img src={user.profileLink} alt="" className="w-6 h-6 rounded-full"></img>{user.name} </span>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                            onClick={() => addEmailId(user.email, user.name)}
                                        >
                                            Add
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <></>
                        )}


                        <div className="w-full mb-4 border border-gray-300 rounded-lg px-3 py-2">
                            {emailIds.length > 0 ? (
                                emailIds.map(email => (
                                    <div key={email} className="flex justify-between border mt-2 border-gray-300 shadow-md rounded-full px-2 items-center py-1">
                                        <span>{name}</span>
                                        <FaRegTimesCircle className="text-red-500 h-5 w-5" onClick={() => removeEmailId(email)} />
                                    </div>
                                ))
                            ) : (
                                <span>No email IDs added.</span>
                            )}
                        </div>
                    </div>
                );
            case 'Particular Classes':
                return (
                    <div>
                        <div className="flex mb-4 space-x-4">
                            <select
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                            >
                                <option value="">Select Class</option>
                                {classOptions.map(cls => (
                                    <option key={cls} value={cls}>{cls}</option>
                                ))}
                            </select>
                            <select
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                value={selectedSection}
                                onChange={(e) => setSelectedSection(e.target.value)}
                                disabled={!selectedClass}
                            >
                                <option value="">Select Section</option>
                                {sectionOptions.map(section => (
                                    <option key={section} value={section}>{section}</option>
                                ))}
                            </select>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleAddClass}
                                disabled={!selectedClass || !selectedSection}
                            >
                                Add
                            </button>
                        </div>
                        {classes.length > 0 ? (
                            <ul className="w-full mb-4 border border-gray-300 rounded-lg px-3 py-2">
                                {classes.map(cls => (
                                    <li key={cls.Class} className="mb-2">
                                        <div className="flex justify-between mt-2 border border-gray-300 shadow-md rounded-full px-2 items-center py-1">
                                            <span>{cls.Class}: {cls.sections.join(', ')}</span>
                                            <FaRegTimesCircle className="text-red-500 h-5 w-5" onClick={() => handleRemoveClass(cls.Class)} />
                                        </div>
                                        <ul>
                                            {cls.sections.map(section => (
                                                <li key={section} className=" flex justify-between  mt-2 border border-gray-300 shadow-md rounded-full px-2 items-center py-1">
                                                    <span>{section}</span>
                                                    <FaRegTimesCircle className="text-red-500 h-5 w-5" onClick={() => handleRemoveSection(cls.Class, section)} />
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <></>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-bold mobile:max-tablet:font-normal mobile:max-tablet:w-1/4 mb-4">Write Notice</h2>
                <div className="flex space-x-4 mb-4">
                    <select
                        className="w-full mb-4 border border-gray-300 rounded-lg px-3 py-2"
                        value={selectedOption}
                        onChange={handleOptionChange}
                    >
                        <option value="For All">For All</option>
                        <option value="For Students">For Student</option>
                        <option value="For Teachers">For Teacher</option>
                        <option value="For Sub Admin">For Sub Admin</option>
                        <option value="Particular Students">Particular Students</option>
                        <option value="Particular Classes">Particular Classes</option>
                        <option value="Particular Teachers">Particular Teachers</option>
                        <option value="Particular Sub Admin">Particular Sub Admin</option>
                    </select>
                </div>
                <input
                    className="w-full mb-4 border border-gray-300 rounded-lg px-3 py-2"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    className="w-full mb-4 border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                {renderSpecificOptions()}
                <div className="flex justify-end">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? <Loading /> : "Submit"}
                    </button>
                    <button
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
                        onClick={handleCloseModal}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewNotice;
