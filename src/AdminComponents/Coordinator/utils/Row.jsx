import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../../Context/AuthContext";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { BASE_URL_Login } from '../../../Config';
import { toast } from 'react-toastify';
import { MdCheck, MdEdit } from "react-icons/md";
import { FaTimes } from "react-icons/fa";

export default function Row({ con }) {
    const { authState } = useContext(AuthContext);
    const [selectedTeacher, setSelectedTeacher] = useState({});
    const [coordinator, setCoordinator] = useState({
        name: con.name,
        profileLink: con.profileLink,
        employeeId: con.employeeId,
    });
    const containerRef = useRef(null);
    const [suggestions, setSuggestions] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [editingRowId, setEditingRowId] = useState(con.name.toString() === "");

    useEffect(() => {
        setCoordinator({
            name: con.name,
            profileLink: con.profileLink,
            employeeId: con.employeeId,
        });
        setEditingRowId(con.name.toString() === "");
    }, [con]);

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setSearchString(email);
        const timerId = setTimeout(() => {
            const fetchSuggestions = async () => {
                try {
                    const response = await axios.post(`${BASE_URL_Login}/search/teacher`, {
                        accessToken: authState.accessToken,
                        searchString: email,
                        start: 0,
                        end: 30
                    });
                    setSuggestions(response.data.Teachers);
                } catch (error) {
                    console.error('Error searching for teachers', error);
                }
            };

            fetchSuggestions();
        }, 500);

        return () => clearTimeout(timerId);
    };

    const handleSuggestionClick = (suggestion) => {
        setSelectedTeacher(suggestion);
    };

    const handleSave = async () => {
        try {
            const response = await axios.post(`${BASE_URL_Login}/co_ordinator/create`, {
                wing: con.classRange,
                email: selectedTeacher.email
            }, {
                headers: {
                    'Authorization': `Bearer ${authState.accessToken}`
                }
            });

            if (response.status === 200) {
                console.log(response.data);
                toast.success(`Coordinator saved for ${con.classRange}`);
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
            setSuggestions([]);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleUpdateClick = () => {
        setEditingRowId(true);
    };

    const handleConfirmClick = () => {
        handleSave();
        setCoordinator({
            name: selectedTeacher.name,
            profileLink: selectedTeacher.profileLink,
            employeeId: selectedTeacher.employeeId,
        });
        setSelectedTeacher({});
        setEditingRowId(false);
    };

    const handleCancelClick = () => {
        setSelectedTeacher({});
        setEditingRowId(false);
    };

    return (
        <div key={con.id} className="w-full mobile:max-tablet:flex-col items-center p-2 gap-2 border rounded-md flex mobile:max-tablet:items-start mobile:max-tablet:gap-2" ref={containerRef}>
            <div className="flex-grow flex justify-between items-center">
                <h2 className="text-lg">{con.classRange}</h2>
                {editingRowId ? (
                    Object.keys(selectedTeacher).length > 0 ? (
                        <div className="flex justify-center gap-2 items-center">
                            <div className="flex justify-start w-52">
                                <div className="flex items-center">
                                    <img src={selectedTeacher.profileLink} alt={selectedTeacher.name} className="w-14 h-14 rounded-full mr-2" />
                                </div>
                                <div className="text-left">
                                    <div>{selectedTeacher.name}</div>
                                    {selectedTeacher.employeeId}
                                </div>
                            </div>
                            <button
                                className='bg-green-400 hover:bg-green-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center'
                                onClick={handleConfirmClick}
                            >
                                <MdCheck />
                            </button>
                            <button
                                className='bg-red-400 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center'
                                onClick={handleCancelClick}
                            >
                                <FaTimes />
                            </button>
                        </div>
                    ) : (
                        <div className='flex gap-1 justify-center relative'>
                            <input
                                type="text"
                                className="w-52 px-2 border border-black rounded-lg text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap"
                                placeholder="Coordinator Name"
                                value={searchString}
                                onChange={handleEmailChange}
                                required
                            />
                            {suggestions.length > 0 && (
                                <ul className="absolute z-10 w-52 bg-white border rounded-md mt-8 max-h-40 overflow-y-auto">
                                    {suggestions.map((suggestion, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                                            onClick={() => handleSuggestionClick(suggestion)}
                                        >
                                            <img src={suggestion.profileLink} alt="Profile" className="w-6 h-6 rounded-full mr-2" />
                                            {suggestion.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )
                ) : (
                    <div className="flex justify-center gap-2 items-center">
                        <div className="flex justify-start w-52">
                            <div className="flex items-center">
                                <img src={coordinator.profileLink} alt="img" className="w-14 h-14 rounded-full mr-2" />
                            </div>
                            <div className="text-left">
                                <div>{coordinator.name}</div>
                                {coordinator.employeeId}
                            </div>
                        </div>
                        <button
                            className='bg-blue-400 hover:bg-blue-700 text-white h-1/2 px-3 py-1 rounded-lg shadow-md flex items-center'
                            onClick={handleUpdateClick}
                        >
                            <MdEdit />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
