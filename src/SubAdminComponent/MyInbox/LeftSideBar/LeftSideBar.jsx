import React, { useContext, useEffect, useState } from 'react';
import { AlertTriangle, Inbox, Mail, Plus, Send, Star, Trash2, UserX } from 'react-feather';
import AuthContext from '../../../Context/AuthContext';
import axios from 'axios';
import { BASE_URL } from '../../../Config';
import { FaTrash } from 'react-icons/fa';
import { MdDeleteForever, MdAdd, MdSave, MdCancel } from "react-icons/md";
import { toast } from 'react-toastify';

function LeftSideBar({ isOpen, onClose, darkMode, onCompose, currentSection, onSectionChange }) {
    const [customFolders, setCustomFolders] = useState([
        { Name: 'Projects' }
    ]);
    const { authState } = useContext(AuthContext);
    const [showMore, setShowMore] = useState(false);

    const staticSidebarItems = [
        { icon: Inbox, label: 'Inbox', section: 'inbox' },
        { icon: Send, label: 'Sent', section: 'sent' },
        { icon: Star, label: 'Archived', section: 'archived' },
        { icon: Star, label: 'Starred', section: 'starred' },
        { icon: Star, label: 'Deleted', section: 'deleted' },
        { icon: Star, label: 'Favourite', section: 'favourite' }
    ];
    const [tags, setTags] = useState([]);
    const [showCreateTagInline, setShowCreateTagInline] = useState(false);
    const [newTagName, setNewTagName] = useState('');
    const [newTagColor, setNewTagColor] = useState("#ff0000");
    const [showTags, setShowTags] = useState(false);
    const [showCreateFolderInline, setShowCreateFolderInline] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');

    const sidebarItems = staticSidebarItems.map(item => {
        let matchName = item.label.toLowerCase();

        if (matchName === "sent") {
            matchName = "outbox";
        }

        const folder = customFolders.find(f =>
            f.Name?.toLowerCase() === matchName
        );

        return {
            ...item,
            count: folder?.unSeenCount ?? null
        };
    });


    const handleSaveTag = async () => {
        if (!newTagName.trim()) return;

        try {
            const payload = {
                TagName: newTagName.trim(),
                UserID: authState?.userDetails?._id || '',
                TagColor: newTagColor
            };

            const response = await axios.post(
                `${BASE_URL}/myInbox/createTag`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`,
                        'Content-Type': 'application/json',
                    }
                }
            );

            if (response.status === 200) {
                const newTag = {
                    id: response.data.result?.TagID || Date.now(),
                    TagName: newTagName.trim(),
                    TagColor: newTagColor
                };
                setTags(prev => [...prev, newTag]);
                setNewTagName('');
                setNewTagColor('#ff0000');
                setShowCreateTagInline(false);
                toast.success('Tag created successfully');
            } else {
                toast.error(response.data?.error || 'Failed to create tag');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.error || 'An error occurred while creating the tag');
        }
    };


    const handleDeleteTag = async (tagId) => {
        try {
            const response = await axios.delete(
                `${BASE_URL}/myInbox/deleteTag`,
                {
                    data: {
                        UserID: authState?.userDetails?._id,
                        TagID: tagId
                    },
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`,
                        'Content-Type': 'application/json',
                    }
                }
            );

            if (response.status === 200) {
                toast.success("Tag Deleted successfully");
                setTags(tags.filter(tag => tag._id !== tagId));
            }

        } catch (error) {
            console.error('Error deleting tag:', error);
        }
    };

    console.log(authState?.userDetails)

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const res = await axios.post(`${BASE_URL}/myInbox/fetch/getTag`, {
                    UserID: authState?.userDetails?._id,
                }, {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`,
                    }
                });

                setTags(res.data.Tags || []);
            } catch (err) {
                console.error('Failed to load tags:', err);
            }
        };

        fetchTags();
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
                    _id: response.data.result?.FolderID || Date.now(),
                    Name: newFolderName.trim(),
                };
                setCustomFolders((prev) => [...prev, newFolder]);
                setNewFolderName('');
                setShowCreateFolderInline(false);
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
                setCustomFolders(response.data.Folders);
            } catch (error) {
                console.error('Error fetching folders:', error?.response?.data?.message || error.message);
            }
        };

        if (authState?.userDetails?._id) {
            fetchCustomFolders();
        }
    }, [authState?.userDetails?._id]);

    const handleDeleteFolder = async (folderId) => {
        try {
            const response = await axios.delete(
                `${BASE_URL}/myInbox/deleteFolder`,
                {
                    data: {
                        UserID: authState?.userDetails?._id,
                        FolderID: folderId
                    },
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`,
                        'Content-Type': 'application/json',
                    }
                }
            );

            if (response.status === 200) {
                toast.success("Folder Deleted successfully");
                setCustomFolders((prevFolders) => prevFolders.filter(folder => folder._id !== folderId));
            }

        } catch (error) {
            console.error('Failed to delete folder:', error?.response?.data?.message || error.message);
            toast.error(error?.response?.data?.message);
        }
    };


    return (
        <>
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />
            <div
                className={`fixed lg:relative inset-y-0 left-0 z-50 w-80 lg:w-72 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-r transform transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col h-full`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                        <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Mail</h1>
                        <button
                            onClick={onClose}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <UserX className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-4">
                        <button
                            onClick={onCompose}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Compose
                        </button>
                    </div>

                    <nav className="flex-1 px-4 space-y-1 overflow-y-auto mb-2 py-2">
                        {sidebarItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => onSectionChange(item.section, item._id)}
                                className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all duration-200 group ${currentSection === item.section
                                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400 shadow-sm'
                                    : `${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'}`
                                    } hover:shadow-md hover:scale-105`}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon
                                        className={`w-5 h-5 ${currentSection === item.section ? 'text-blue-600 dark:text-blue-400' : ''
                                            }`}
                                    />
                                    <span className="font-medium">{item.label}</span>
                                </div>
                                {item.count > 0 && (
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${currentSection === item.section
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                                            }`}
                                    >
                                        {item.count}
                                    </span>
                                )}
                            </button>
                        ))}

                        <>
                            <button
                                onClick={() => setShowMore((prev) => !prev)}
                                className="w-full flex items-center justify-between p-3 rounded-xl text-left transition-all duration-200 font-medium text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                <span>{showMore ? 'Less' : 'More'}</span>
                                <span>{showMore ? '▲' : '▼'}</span>
                            </button>

                            {showMore && (
                                <div className="mt-1 pl-2 space-y-2">
                                    {customFolders.map((folder, index) => (
                                        folder._id && (
                                            <div
                                                key={`custom-${index}`}
                                                className="flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 shadow-sm transition-transform hover:scale-[1.02] hover:shadow-md group"
                                            >
                                                <button
                                                    onClick={() => onSectionChange(folder.Name.toLowerCase(), folder._id)}
                                                    className={`flex-1 text-left font-medium text-sm truncate transition-colors ${currentSection === folder.Name.toLowerCase()
                                                        ? 'text-blue-600 dark:text-blue-400'
                                                        : darkMode
                                                            ? 'text-gray-300'
                                                            : 'text-gray-700'
                                                        }`}
                                                >
                                                    {folder.Name}
                                                </button>
                                                {folder.unSeenCount > 0 && (
                                                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white">
                                                        {folder.unSeenCount}
                                                    </span>
                                                )}
                                                <button
                                                    onClick={() => handleDeleteFolder(folder._id)}
                                                    className="ml-3 p-2 rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-red-800 transition-opacity opacity-0 group-hover:opacity-100"
                                                    title="Delete Folder"
                                                >
                                                    <FaTrash className="h-4 w-4" />
                                                </button>
                                            </div>
                                        )
                                    ))}


                                    {showCreateFolderInline ? (
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                placeholder="Folder name"
                                                value={newFolderName}
                                                onChange={(e) => setNewFolderName(e.target.value)}
                                                className="flex-1 p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                                            />
                                            <button
                                                onClick={handleSaveFolder}
                                                className="px-2 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm"
                                            >
                                                <MdSave size={16} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setShowCreateFolderInline(false);
                                                    setNewFolderName('');
                                                }}
                                                className="px-2 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
                                            >
                                                <MdCancel size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div
                                            className="px-4 py-2 text-blue-600 hover:underline cursor-pointer text-sm flex items-center gap-2"
                                            onClick={() => setShowCreateFolderInline(true)}
                                        >
                                            <MdAdd size={16} /> Create New Folder
                                        </div>
                                    )}
                                </div>
                            )}
                        </>


                        <>
                            <button
                                onClick={() => setShowTags(prev => !prev)}
                                className="w-full flex items-center justify-between p-3 rounded-xl text-left transition-all duration-200 font-medium text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                <span>{showTags ? 'Tags ' : 'Tags '}</span>
                                <span>{showTags ? '▲' : '▼'}</span>
                            </button>

                            {showTags && (
                                <>
                                    {tags.length > 0 && (
                                        <div className="mt-2 px-4 space-y-2">
                                            {tags.map((tag, index) => (
                                                <div
                                                    key={`tag-${index}`}
                                                    className="flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 shadow-sm hover:scale-[1.02] hover:shadow-md group transition-transform cursor-pointer"
                                                >
                                                    <span
                                                        className="flex items-center gap-2 px-2 py-2"
                                                    >
                                                        <span
                                                            className="w-3 h-3 rounded-full"
                                                            style={{ backgroundColor: tag.TagColor }}
                                                        ></span>
                                                        <span className="truncate font-medium">{tag.TagName}</span>
                                                    </span>

                                                    <button
                                                        onClick={() => handleDeleteTag(tag._id)}
                                                        className="ml-3 p-2 rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-red-800 transition-opacity opacity-0 group-hover:opacity-100"
                                                        title="Delete Tag"
                                                    >
                                                        <FaTrash className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="mt-3 space-y-2">
                                        {showCreateTagInline ? (
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Tag name"
                                                        value={newTagName}
                                                        onChange={(e) => setNewTagName(e.target.value)}
                                                        className="flex-1 p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                                                    />
                                                    <button
                                                        onClick={handleSaveTag}
                                                        className="px-2 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm"
                                                    >
                                                        <MdSave size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setShowCreateTagInline(false);
                                                            setNewTagName('');
                                                            setNewTagColor('red');
                                                        }}
                                                        className="px-2 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
                                                    >
                                                        <MdCancel size={16} />
                                                    </button>
                                                </div>

                                                <div className="flex gap-2 items-center text-sm ml-1">
                                                    <label className="text-gray-600 dark:text-gray-300" htmlFor="tag-color-picker">
                                                        Choose color:
                                                    </label>
                                                    <input
                                                        type="color"
                                                        id="tag-color-picker"
                                                        value={newTagColor}
                                                        onChange={(e) => setNewTagColor(e.target.value)}
                                                        className="w-8 h-8 p-0 border-none cursor-pointer bg-transparent"
                                                    />
                                                </div>

                                            </div>
                                        ) : (
                                            <div
                                                onClick={() => setShowCreateTagInline(true)}
                                                className="text-blue-600 hover:underline p-2 text-sm cursor-pointer flex items-center gap-2"
                                            >
                                                <MdAdd size={16} /> Create New Tag
                                            </div>
                                        )}
                                    </div>

                                </>
                            )}
                        </>
                    </nav>

                    <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                                {authState?.userDetails?.name
                                    ?.split(' ')
                                    .map(word => word[0])
                                    .join('')
                                    .toUpperCase()
                                    .slice(0, 2)}

                            </div>
                            <div className="flex-1 min-w-0">
                                <p className={`font-semibold truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {authState?.userDetails?.name}
                                </p>
                                <p className={`text-sm truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {authState?.userDetails?.email}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default LeftSideBar;
