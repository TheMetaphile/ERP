import React, { useState, useContext, useEffect, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL_Login } from '../../../Config';
import { toast } from 'react-toastify';
import { MdCheck, MdEdit } from "react-icons/md";
import { FaTimes } from "react-icons/fa";

function Assign() {
    const { authState } = useContext(AuthContext);

    const [content, setContent] = useState([
        { id: 1, classRange: 'Pre-Nursery-U.K.G', coordinator: '', email: '', name: '', profile: '', employee: '', suggestions: [], showSuggestions: false },
        { id: 2, classRange: '1st-2nd', coordinator: '', email: '', name: '', profile: '', employee: '', suggestions: [], showSuggestions: false },
        { id: 3, classRange: '3rd-5th', coordinator: '', email: '', name: '', profile: '', employee: '', suggestions: [], showSuggestions: false },
        { id: 4, classRange: '6th-8th', coordinator: '', email: '', name: '', profile: '', employee: '', suggestions: [], showSuggestions: false },
        { id: 5, classRange: '9th-12th', coordinator: '', email: '', profile: '', employee: '', name: '', suggestions: [], showSuggestions: false },
    ]);
    const [editingRowId, setEditingRowId] = useState(null);

    const containerRef = useRef(null);

    const fetchCoordinator = async () => {
        try {
            const response = await axios.get(`${BASE_URL_Login}/co_ordinator/fetch`, {
                headers: {
                    'Authorization': `Bearer ${authState.accessToken}`
                }
            });

            if (response.status === 200) {
                const coordinators = response.data.coordinators;
                setContent(prevContent =>
                    prevContent.map(item => {
                        const coordinator = coordinators.find(c => c.co_ordinator_wing === item.classRange);
                        return coordinator ? {
                            ...item,
                            name: coordinator.name,
                            email: coordinator.employeeId,
                            coordinator: coordinator.profileLink,
                            employeeId: coordinator.employeeId
                        } : item;
                    })
                );
                console.log(coordinators);
                toast.success('Fetched Successfully');
            }
        } catch (error) {
            console.error('Failed to fetch coordinator', error);
            toast.error('Failed to fetch coordinator');
        }
    };

    useEffect(() => {
        fetchCoordinator();
    }, [authState.accessToken]);

    const handleEmailChange = (e, id) => {
        const email = e.target.value;
        setContent(prevContent =>
            prevContent.map(item =>
                item.id === id ? { ...item, email, showSuggestions: true } : item
            )
        );

        const timerId = setTimeout(() => {
            const fetchSuggestions = async () => {
                try {
                    const response = await axios.post(`${BASE_URL_Login}/search/teacher`, {
                        accessToken: authState.accessToken,
                        searchString: email,
                        start: 0,
                        end: 30
                    });
                    const teacherEmails = response.data.Teachers.map(teacher => ({
                        email: teacher.email,
                        name: teacher.name,
                        profileLink: teacher.profileLink
                    }));
                    setContent(prevContent =>
                        prevContent.map(item =>
                            item.id === id ? { ...item, suggestions: teacherEmails } : item
                        )
                    );
                } catch (error) {
                    console.error('Error searching for teachers ', error);
                }
            };

            fetchSuggestions();
        }, 500);

        return () => clearTimeout(timerId);
    };

    const handleSuggestionClick = (suggestion, id) => {
        setContent(prevContent =>
            prevContent.map(item =>
                item.id === id ? {
                    ...item,
                    email: suggestion.email,
                    name: suggestion.name,
                    profile: suggestion.profileLink,
                    employeeId: suggestion.employeeId,
                    showSuggestions: false
                } : item
            )
        );
    };

    const handleSave = async (id) => {
        const selectedItem = content.find(item => item.id === id);
        if (!selectedItem.email) {
            toast.error('Please enter an email before saving');
            return;
        }
        console.log(selectedItem.classRange, selectedItem.email);

        try {
            const response = await axios.post(`${BASE_URL_Login}/co_ordinator/create`, {
                wing: selectedItem.classRange,
                email: selectedItem.email
            }, {
                headers: {
                    'Authorization': `Bearer ${authState.accessToken}`
                }
            });

            if (response.status === 200) {
                console.log(response.data);
                toast.success(`Coordinator saved for ${selectedItem.classRange}`);
            } else {
                toast.error('Failed to save coordinator');
            }
        } catch (error) {
            console.error('Error saving coordinator', error);
            toast.error('Error saving coordinator');
        }
    };

    const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            setContent(prevContent =>
                prevContent.map(item => ({ ...item, showSuggestions: false }))
            );
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleUpdateClick = (id) => {
        const selectedItem = content.find(item => item.id === id);
        setEditingRowId(id);
        setContent(prevContent =>
            prevContent.map(item =>
                item.id === id ? { ...item, email: selectedItem.email, showSuggestions: false } : item
            )
        );
    };

    const handleConfirmClick = (id) => {
        handleSave(id);
        const selectedItem = content.find(item => item.id === id);
        setContent(prevContent =>
            prevContent.map(item =>
                item.id === id ? {
                    ...item,
                    coordinator: selectedItem.profile,
                    employeeId: selectedItem.employeeId,
                    name: selectedItem.name
                } : item
            )
        );
        setEditingRowId(null);
    };

    const handleCancelClick = (id) => {
        const selectedItem = content.find(item => item.id === id);
        setContent(prevContent =>
            prevContent.map(item =>
                item.id === id ? { ...item, email: selectedItem.name, showSuggestions: false } : item
            )
        );
        setEditingRowId(null);
    };

    return (
        <div className="flex mobile:max-tablet:flex-col w-full px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 mb-3 no-scrollbar">
            <div className="border py-4 mobile:max-tablet:px-2 rounded-lg gap-5 shadow-md w-full flex flex-col px-3 overflow-y-auto items-start mt-2 mb-3 no-scrollbar" ref={containerRef}>
                {content.map((con) => (
                    <div key={con.id} className="w-full mobile:max-tablet:flex-col items-center p-2 gap-2 border rounded-md flex mobile:max-tablet:items-start mobile:max-tablet:gap-2">
                        <div className="flex-grow flex justify-between">
                            <h2 className="text-lg">{con.classRange}</h2>
                            {editingRowId === con.id ? (
                                <div className='flex gap-1 justify-center'>
                                    <input
                                        type="text"
                                        className="w-36 px-2 border border-black rounded-lg text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap"
                                        placeholder="Coordinator Name"
                                        value={con.email}
                                        onChange={(e) => handleEmailChange(e, con.id)}
                                        required
                                    />
                                    {con.showSuggestions && con.suggestions.length > 0 && (
                                        <ul className="absolute z-10 w-72 bg-white border rounded-md mt-1 max-h-40 overflow-y-auto">
                                            {con.suggestions.map((suggest, idx) => (
                                                <li
                                                    key={idx}
                                                    className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                                                    onClick={() => handleSuggestionClick(suggest, con.id)}
                                                >
                                                    <img src={suggest.profileLink} alt="Profile" className="w-6 h-6 rounded-full mr-2" />
                                                    {suggest.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    <button
                                        className='bg-green-400 hover:bg-green-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center'
                                        onClick={() => handleConfirmClick(con.id)}
                                    >
                                        <MdCheck />
                                    </button>
                                    <button
                                        className='bg-red-400 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center'
                                        onClick={() => handleCancelClick(con.id)}
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex justify-center gap-2 items-center">
                                    <div className="justify-center">
                                        <div className="flex items-center">
                                            <img src={con.coordinator} alt={con.name} className="w-8 h-8 rounded-full mr-2" />
                                            <span>{con.name}</span>
                                        </div>
                                        <div className="text-center">
                                            <span>{con.employeeId}</span>
                                        </div>
                                    </div>
                                    <button
                                        className='bg-blue-400 hover:bg-blue-700 text-white h-1/2 px-3 py-1 rounded-lg shadow-md flex items-center'
                                        onClick={() => handleUpdateClick(con.id)}
                                    >
                                        <MdEdit />
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Assign;
