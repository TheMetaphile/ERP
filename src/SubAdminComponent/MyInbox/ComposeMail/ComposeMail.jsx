import React, { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { LuCircleX } from "react-icons/lu";
import { BASE_URL } from '../../../Config';
import AuthContext from '../../../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ComposeEmail = () => {
    const { authState } = useContext(AuthContext);
    const [to, setTo] = useState([]);
    const [cc, setCc] = useState([]);
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [role, setRole] = useState('teacher');
    const [showRoles, setShowRoles] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [ccSearchString, setCcSearchString] = useState('');
    const [ccShowRoles, setCcShowRoles] = useState(false);
    const [ccIsFocused, setCcIsFocused] = useState(false);

    // New states for IDs
    const [toIds, setToIds] = useState([]);
    const [ccIds, setCcIds] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (toIds.length === 0) {
            toast.warning("Please add at least one recipient in 'To'");
            return;
        }
        try {
            const payload = {
                Sender: String(authState?.userDetails?._id || ""),
                MessageBody: body || "",
                Subject: subject || "",
                DraftStatus: false,
                IsClosed: false,
                Role: authState?.userDetails?.rolee || "",
                ToRecipients: toIds,
                CcRecipients: ccIds
            };
            console.log(payload)

            const response = await axios.post(
                `${BASE_URL}/myInbox/startConversation`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.status === 200) {
                toast.success("Message sent successfully");
                setTo([]);
                setCc([]);
                setToIds([]);
                setCcIds([]);
                setSubject('');
                setBody('');
                setShowRoles(false);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to send message");
        }
    };

    const modules = {
        toolbar: [
            [{ 'font': [] }, { 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'align': [] }],
            ['link', 'image'],
        ]
    };

    const handleSuggestionClick = (suggestion, type) => {
        setShowSuggestions(false);
        if (type === 'to') {
            setTo(prev => [...prev, suggestion.email]);
            setToIds(prev => [...prev, suggestion._id]);
            setSearchString('');
        } else if (type === 'cc') {
            setCc(prev => [...prev, suggestion.email]);
            setCcIds(prev => [...prev, suggestion._id]);
            setCcSearchString('');
        }
    };

    const removeRecipient = (email, type) => {
        if (type === 'to') {
            setTo(prev => prev.filter(item => item !== email));
            const index = to.findIndex(item => item === email);
            setToIds(prev => prev.filter((_, i) => i !== index));
        } else if (type === 'cc') {
            setCc(prev => prev.filter(item => item !== email));
            const index = cc.findIndex(item => item === email);
            setCcIds(prev => prev.filter((_, i) => i !== index));
        }
    };

    const handleInputFocus = () => {
        setShowRoles(true);
        setIsFocused(true);
    };

    const handleInputBlur = () => {
        setTimeout(() => {
            if (!isFocused) {
                setShowRoles(false);
            }
        }, 100);
    };

    const handleCcInputFocus = () => {
        setCcShowRoles(true);
        setCcIsFocused(true);
    };

    const handleCcInputBlur = () => {
        setTimeout(() => {
            if (!ccIsFocused) {
                setCcShowRoles(false);
            }
        }, 100);
    };

    useEffect(() => {
        if (searchString || ccSearchString) {
            const handler = setTimeout(() => {
                setShowSuggestions(true);
                const searchRole = async () => {
                    try {
                        const response = await axios.post(`${BASE_URL}/search/${role}`, {
                            accessToken: authState?.accessToken,
                            searchString: searchString || ccSearchString,
                            start: 0,
                            end: 30
                        });

                        const roleSuggestions = response.data.Teachers.map(person => ({
                            _id: person._id,
                            email: person.email,
                            profileLink: person.profileLink,
                            name: person.name
                        }));
                        setSuggestions(roleSuggestions);

                    } catch (error) {
                        console.error("Error searching for roles:", error);
                    }
                };
                searchRole();
            }, 500);

            return () => {
                clearTimeout(handler);
            };
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [searchString, ccSearchString, role, authState?.accessToken]);

    return (
        <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Compose Email</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium">To:</label>
                    <div className="flex items-center space-x-2 overflow-x-auto border p-2 rounded">
                        {to.map((email, idx) => (
                            <div key={idx} className="bg-gray-300 p-1 rounded flex items-center">
                                <span>{email}</span>
                                <LuCircleX
                                    className="ml-1 text-red-600 hover:text-red-800 cursor-pointer"
                                    onClick={() => removeRecipient(email, 'to')}
                                />
                            </div>
                        ))}
                        <input
                            type="text"
                            value={searchString}
                            onChange={(e) => setSearchString(e.target.value)}
                            className="flex-grow p-1 outline-none"
                            placeholder={`Search ${role.charAt(0).toUpperCase() + role.slice(1)}s`}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                        />
                    </div>
                    {showRoles && (
                        <div
                            className="mt-2 mb-4 grid grid-cols-3 gap-4"
                            onMouseEnter={() => setIsFocused(true)}
                            onMouseLeave={() => setIsFocused(false)}
                        >
                            {['teacher', 'student', 'subAdmin'].map((roleOption) => (
                                <button
                                    key={roleOption}
                                    type="button"
                                    onClick={() => setRole(roleOption)}
                                    className={`p-2 border rounded text-center ${role === roleOption ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                >
                                    {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">CC:</label>
                    <div className="flex items-center space-x-2 overflow-x-auto border p-2 rounded">
                        {cc.map((email, idx) => (
                            <div key={idx} className="bg-gray-300 p-1 rounded flex items-center">
                                <span>{email}</span>
                                <LuCircleX
                                    className="ml-1 text-red-600 hover:text-red-800 cursor-pointer"
                                    onClick={() => removeRecipient(email, 'cc')}
                                />
                            </div>
                        ))}
                        <input
                            type="text"
                            value={ccSearchString}
                            onChange={(e) => setCcSearchString(e.target.value)}
                            className="flex-grow p-1 outline-none"
                            placeholder={`Search ${role.charAt(0).toUpperCase() + role.slice(1)}s`}
                            onFocus={handleCcInputFocus}
                            onBlur={handleCcInputBlur}
                        />
                    </div>
                    {ccShowRoles && (
                        <div
                            className="mt-2 mb-4 grid grid-cols-3 gap-4"
                            onMouseEnter={() => setCcIsFocused(true)}
                            onMouseLeave={() => setCcIsFocused(false)}
                        >
                            {['teacher', 'student', 'subAdmin'].map((roleOption) => (
                                <button
                                    key={roleOption}
                                    type="button"
                                    onClick={() => setRole(roleOption)}
                                    className={`p-2 border rounded text-center ${role === roleOption ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                >
                                    {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {showSuggestions && (
                    <div className="mt-2">
                        <ul className="max-h-40 overflow-y-auto shadow-lg bg-white rounded-md">
                            {suggestions.map((suggestion, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSuggestionClick(suggestion, searchString ? 'to' : 'cc')}
                                >
                                    <img
                                        src={suggestion.profileLink}
                                        alt="Profile"
                                        className='w-6 h-6 rounded-full mr-2'
                                    />
                                    <span>
                                        {suggestion.email}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-sm font-medium">Subject:</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full mt-1 p-2 border rounded"
                        placeholder="Email subject"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Body:</label>
                    <ReactQuill
                        value={body}
                        onChange={setBody}
                        modules={modules}
                        theme="snow"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default ComposeEmail;