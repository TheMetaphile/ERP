import React, { useContext, useEffect, useRef, useState } from 'react';
import { Mail, Star, Trash2 } from 'react-feather';
import {
    Archive,
    Heart,
    ShieldAlert,
    Folder,
} from 'lucide-react';
import { LuArrowDownUp } from "react-icons/lu";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL } from '../../../Config';
import axios from 'axios';

function MailContent({ mail, darkMode }) {
    const { authState } = useContext(AuthContext);

    const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [folders, setFolders] = useState([
        { id: 1, name: 'Archived' },
        { id: 2, name: 'Starred' },
        { id: 3, name: 'Deleted' },
        { id: 4, name: 'Favourate' },
        { id: 5, name: 'Spam' },

    ]);
    const [priorityMenuOpen, setPriorityMenuOpen] = useState(false);
    const [priority, setPriority] = useState(null);
    const priorityRef = useRef(null);


    const handleCreateNewFolder = () => {
        setShowCreateFolderModal(true);
    };

    useEffect(() => {
        const fetchCustomFolders = async () => {
            try {
                const response = await axios.post(
                    `${BASE_URL}/myInbox/fetch/getFolder`,
                    { UserID: authState?.userDetails?._id || '' },
                    {
                        headers: {
                            Authorization: `Bearer ${authState?.accessToken}`,
                            'Content-Type': 'application/json',
                        }
                    }
                );
                const customFolders = response.data.Folders.map((folder, index) => ({
                    id: `custom-${index}`,
                    name: folder.Name,
                    _id: folder._id,
                    unSeenCount: folder.unSeenCount
                }));

                setFolders(prev => [...prev, ...customFolders]);
            } catch (error) {
                console.error('Error fetching folders:', error?.response?.data?.message || error.message);
            }
        };

        if (authState?.userDetails?._id) {
            fetchCustomFolders();
        }
    }, [authState?.userDetails?._id]);

    const handleSaveFolder = async () => {
        if (!newFolderName.trim()) return;

        try {
            const payload = {
                FolderName: newFolderName.trim(),
                UserID: authState?.userDetails?._id || ''
            };

            const response = await axios.post(
                `${BASE_URL}/myInbox/createFolder`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`,
                        'Content-Type': 'application/json',
                    }
                }
            );

            if (response.status === 200) {
                const newFolder = {
                    id: response.data.result?.FolderID || Date.now(),
                    name: newFolderName.trim()
                };
                setFolders(prev => [...prev, newFolder]);
                setNewFolderName('');
                setShowCreateFolderModal(false);
                toast.success('Folder created successfully');
            } else {
                toast.error(response.data?.error || 'Failed to create folder');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.error || 'An error occurred while creating the folder');
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (priorityRef.current && !priorityRef.current.contains(event.target)) {
                setPriorityMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const priorityColor = {
        top: 'text-red-600',
        moderate: 'text-yellow-500',
        least: 'text-green-600',
    };

    const priorityLabel = {
        top: 'Top',
        moderate: 'Moderate',
        least: 'Least',
    };


    if (!mail) {
        return (
            <div className={`flex-1 ${darkMode ? 'bg-gray-900' : 'bg-white'} flex flex-col items-center justify-center p-8`}>
                <div className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Mail className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">No email selected</h3>
                    <p>Choose an email from the list to view its contents</p>
                </div>
            </div>
        );
    }

    return (
        <div className={``}>
            <div
                className={`flex items-center justify-between px-6 py-3 border-b ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-100 bg-white'
                    } sticky top-0 z-10`}
            >
                <div className="flex items-center gap-4 text-sm">
                    <button className="flex items-center gap-1 hover:text-blue-600 transition">
                        <Archive size={16} /> Archive
                    </button>
                    <button className="flex items-center gap-1 hover:text-red-500 transition">
                        <Trash2 size={16} /> Delete
                    </button>
                    <button className="flex items-center gap-1 hover:text-yellow-500 transition">
                        <Star size={16} /> Star
                    </button>
                    <button className="flex items-center gap-1 hover:text-pink-500 transition">
                        <Heart size={16} /> Favorite
                    </button>
                    <button className="flex items-center gap-1 hover:text-orange-500 transition">
                        <ShieldAlert size={16} /> Spam
                    </button>
                    <div className="relative">
                        <button
                            onClick={() => setPriorityMenuOpen((open) => !open)}
                            className={`flex items-center gap-1 transition  ${priority ? priorityColor[priority] : 'hover:text-gray-700 dark:hover:text-gray-300'
                                }`}
                        >
                            <LuArrowDownUp size={16} /> Priority {priority ? `: ${priorityLabel[priority]}` : ''}
                        </button>

                        {priorityMenuOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50">
                                <button
                                    onClick={() => {
                                        setPriority('top');
                                        setPriorityMenuOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded transition"
                                >
                                    Top Priority (Red)
                                </button>
                                <button
                                    onClick={() => {
                                        setPriority('moderate');
                                        setPriorityMenuOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-yellow-500 hover:bg-yellow-100 dark:hover:bg-yellow-900 rounded transition"
                                >
                                    Moderate Priority (Yellow)
                                </button>
                                <button
                                    onClick={() => {
                                        setPriority('least');
                                        setPriorityMenuOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900 rounded transition"
                                >
                                    Least Priority (Green)
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="relative group inline-block">
                    <div className="flex items-center gap-1 text-sm hover:text-green-600 transition cursor-pointer">
                        <Folder size={16} /> Move to Folder ▾
                    </div>

                    <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-20">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                            {folders.map((folder) => (
                                <li
                                    key={folder.id}
                                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                >
                                    {folder.name}
                                </li>
                            ))}
                            <li
                                className="px-4 py-2 text-blue-600 hover:underline cursor-pointer"
                                onClick={handleCreateNewFolder}
                            >
                                ➕ Create New Folder
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
            <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {mail.subject}
                        </h2>
                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                    {mail.avatar}
                                </div>
                                <div>
                                    <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {mail.sender}
                                    </p>
                                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {mail.email}
                                    </p>
                                </div>
                            </div>
                            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {mail.time}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                            <Star className={`w-5 h-5 ${mail.starred ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
                        </button>
                        <button className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                            <Trash2 className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
                <div className={`prose max-w-none ${darkMode ? 'prose-invert' : ''}`}>
                    <p className={`text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {mail.preview}
                    </p>

                    <div className="mt-6 space-y-4">
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
            </div>

            <div className={`p-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex gap-3">
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                        Reply
                    </button>
                    <button className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                        Forward
                    </button>
                </div>
            </div>

            {showCreateFolderModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className={`bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg w-full max-w-md`}>
                        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Create New Folder</h2>
                        <input
                            type="text"
                            placeholder="Enter folder name"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg mb-4 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowCreateFolderModal(false)}
                                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveFolder}
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default MailContent;