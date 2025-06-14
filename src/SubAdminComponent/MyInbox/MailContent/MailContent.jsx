import React, { useContext, useEffect, useRef, useState } from 'react';
import { Mail, Star, Trash2 } from 'react-feather';
import {
    Archive,
    Heart,
    Folder,
} from 'lucide-react';
import { LuArrowDownUp } from "react-icons/lu";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL, WEB_SOCKET_BASE_URL } from '../../../Config';
import axios from 'axios';
import ForwardDialog from './ForwardDialog';
import ReplyDialog from './ReplyDialog';
import { useParams } from 'react-router-dom';

function MailContent({ mail, darkMode }) {
    const { authState } = useContext(AuthContext);
    const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [tags, setTags] = useState([]);
    const [mailContent, setMailContent] = useState([]);
    const [mailTo, setMailTo] = useState([]);
    const [mailCc, setMailCc] = useState([]);
    const [showForwardDialog, setShowForwardDialog] = useState(false);
    const [showReplyDialog, setShowReplyDialog] = useState(false);
    const { section, id } = useParams();
    const socketRef = useRef(null);

    const [folders, setFolders] = useState([
        { id: 1, name: 'Archived' },
        { id: 2, name: 'Starred' },
        { id: 3, name: 'Deleted' },
        { id: 4, name: 'Favourite' },

    ]);
    console.log(mail)
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

    const handleMarkAs = async (conversationID, actionFlags) => {
        try {
            const payload = {
                ConversationID: conversationID,
                UserID: authState?.userDetails?._id,
                ...actionFlags
            };

            const response = await axios.put(
                `${BASE_URL}/myInbox/update/markAs`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`,
                        'Content-Type': 'application/json',
                    }
                }
            );

            console.log('Status updated:', response.data);
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    const handleApplyTag = async (tagId, mailId) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/myInbox/applyTag`,
                {
                    TagID: tagId,
                    ConversationID: mailId,
                    UserID: authState?.userDetails?._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                toast.success('Tag applied successfully');
            } else {
                toast.error(response.data?.error || 'Failed to apply tag');
            }
        } catch (error) {
            console.error('Error applying tag:', error);
            toast.error(error.response?.data?.error || 'An error occurred while applying the tag');
        }
    };

    const handleMoveToFolder = async (folderId, mailId) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/myInbox/moveToFolder`,
                {
                    FolderID: folderId,
                    ConversationID: mailId,
                    UserID: authState?.userDetails?._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                toast.success('Mail moved to folder successfully');
            } else {
                toast.error(response.data?.error || 'Failed to move mail to folder');
            }
        } catch (error) {
            console.error('Error moving mail to folder:', error);
            toast.error(error.response?.data?.error || 'An error occurred while moving the mail');
        }
    };

    const handleRemoveFromFolder = async (mailId) => {
        try {
            const response = await axios.put(
                `${BASE_URL}/myInbox/update/removeFromFolder`,
                {
                    ConversationID: mailId,
                    UserID: authState?.userDetails?._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                toast.success('Mail removed from folder successfully');
            } else {
                toast.error(response.data?.error || 'Failed to remove mail from folder');
            }
        } catch (error) {
            console.error('Error removing mail from folder:', error);
            toast.error(error.response?.data?.error || 'An error occurred while removing the mail');
        }
    };

    useEffect(() => {
        if (!mailContent || !Array.isArray(mailContent) || mailContent.length == 0) return;
        const markSeen = async (msgId) => {
            try {
                const payload = {
                    MessageID: msgId,
                    UserID: authState?.userDetails?._id,
                    seen: true
                };

                const response = await axios.put(
                    `${BASE_URL}/myInbox/update/markSeen`,
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${authState?.accessToken}`,
                            'Content-Type': 'application/json',
                        }
                    }
                );
            } catch (err) {
                console.error(err);
                toast.error(err);
            }
        };

        for (const msg of mailContent) {
            if (!msg?.isRead) {
                markSeen(msg._id)
            }
        }
    }, [authState?.userDetails?._id, mailContent]);

    useEffect(() => {
        if (!mail) return;
        const fetchMail = async () => {
            try {
                const socket = new WebSocket(
                    `${WEB_SOCKET_BASE_URL}/getThreadedMessages/${mail._id}?token=${authState?.accessToken}`
                );
                socketRef.current = socket;
                socket.onopen = () => {
                    console.log("WebSocket connected");
                };

                socket.onmessage = (event) => {
                    try {
                        const response = JSON.parse(event.data);
                        console.log(response);

                        switch (response.type) {
                            case "initial":
                                console.log("here", response.messages);
                                setMailTo(response.To);
                                setMailCc(response.Cc);
                                setMailContent(response.messages);
                                break;

                            case "new":
                                setMailContent((prevEmails) => [response.newMessage, ...prevEmails]);
                                break;

                            case "update":
                                setMailContent((prevEmails) =>
                                    prevEmails.map((email) =>
                                        email._id === response.messageId
                                            ? { ...email, SeenBy: response.SeenBy }
                                            : email
                                    )
                                );
                                break;
                            default:
                                console.log("Default");
                        }
                    } catch (err) {
                        console.error("Error parsing WebSocket message:", err);
                    }
                };

                socket.onerror = (error) => {
                    console.error("WebSocket error:", error);
                };

                socket.onclose = () => {
                    console.log("WebSocket disconnected");
                };

                return () => {
                    socket.close();
                };
            } catch (error) {
                console.error("Error fetching emails:", error);
            }

        };

        fetchMail();
    }, [authState?.userDetails?._id, mail]);

    const addNewMessage = (newMessage) => {
        setMailContent((prevContent) => [...prevContent, newMessage]);
    };

    if (!mail) {
        return (
            <div className={`h-full w-full flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
                <div className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Mail className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">No email selected</h3>
                    <p>Choose an email from the list to view its contents</p>
                </div>
            </div>
        );
    }


    console.log(section, 'here', id)
    return (
        <div className={``}>
            <div
                className={`flex items-center justify-between px-6 py-3 border-b ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-100 bg-white'
                    } sticky top-0 z-10`}
            >
                <div className="flex items-center gap-4 text-sm">
                    <button
                        onClick={() => handleMarkAs(mail._id, { Archived: true })}
                        className="flex items-center gap-1 hover:text-blue-600 transition"
                    >
                        <Archive size={16} /> Archive
                    </button>
                    <button
                        onClick={() => handleMarkAs(mail._id, { Deleted: true })}
                        className="flex items-center gap-1 hover:text-red-500 transition"
                    >
                        <Trash2 size={16} /> Delete
                    </button>
                    <button
                        onClick={() => handleMarkAs(mail._id, { Starred: true })}
                        className="flex items-center gap-1 hover:text-yellow-500 transition"
                    >
                        <Star size={16} /> Star
                    </button>
                    <button
                        onClick={() => handleMarkAs(mail._id, { Favourite: true })}
                        className="flex items-center gap-1 hover:text-pink-500 transition"
                    >
                        <Heart size={16} /> Favorite
                    </button>

                    {tags.length > 0 && (
                        <div className="relative group inline-block">
                            <div className="flex items-center gap-1 text-sm hover:text-green-600 transition cursor-pointer">
                                <Folder size={16} /> Apply Tag ▾
                            </div>

                            <div className="absolute right-0 mt-1 w-52 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-20">
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 max-h-60 overflow-y-auto">
                                    {tags.map((tag, index) => (
                                        <li
                                            key={`tag-${index}`}
                                            className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                            onClick={() => handleApplyTag(tag._id, mail._id)}
                                        >
                                            <span
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: tag.TagColor }}
                                            ></span>
                                            <span className="truncate font-medium">{tag.TagName}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                </div>


                {section && id ?
                    <div className="relative group inline-block">
                        <div className="flex items-center gap-1 text-sm font-medium hover:text-green-600 transition cursor-pointer"
                            onClick={() => handleRemoveFromFolder(mail._id)}
                        >
                            <Folder size={16} /> Remove from Folder
                        </div>
                    </div>
                    :
                    <div className="relative group inline-block">
                        <div className="flex items-center gap-1 text-sm font-medium hover:text-green-600 transition cursor-pointer">
                            <Folder size={16} /> Move to Folder ▾
                        </div>

                        <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-20">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                {folders.map((folder) => (
                                    <li
                                        key={folder.id}
                                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                        onClick={() => handleMoveToFolder(folder._id, mail._id)}
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
                }

            </div>
            <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {mail.Subject}
                        </h2>

                        <div className="flex items-center gap-2 text-sm mb-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                                <img
                                    src={mail.CreatedUser.profileLink}
                                    alt="avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {mail.CreatedUser.name}
                                </p>
                                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {mail.CreatedUser.email}
                                </p>
                            </div>
                        </div>

                        {mailTo && (
                            <div className="flex items-center gap-1 flex-wrap text-sm">
                                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
                                    To:
                                </span>
                                {mailTo?.slice(0, 1).map((recipient, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs font-medium"
                                    >
                                        {recipient.name}
                                    </span>
                                ))}

                                {mailTo?.length > 1 && (
                                    <div className="relative group inline-block">
                                        <span className="text-blue-600 underline cursor-pointer group-hover:text-blue-800 text-xs font-medium ml-1">
                                            +{mailTo.length - 1} more
                                        </span>

                                        <div className="absolute z-50 hidden group-hover:block bg-white dark:bg-gray-800 border dark:border-gray-600 shadow-lg p-4 rounded-lg w-72 max-h-64 overflow-y-auto mt-2 left-0">
                                            <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                                All Recipients
                                            </h4>
                                            <ul className="space-y-2 text-sm">
                                                {mailTo.map((recipient, index) => (
                                                    <li key={index} className="flex items-center gap-2">
                                                        <img
                                                            src={recipient.profileLink}
                                                            alt={recipient.name}
                                                            className="w-6 h-6 rounded-full object-cover border"
                                                        />
                                                        <div>
                                                            <div className="font-medium text-gray-800 dark:text-gray-100">
                                                                {recipient.name}
                                                            </div>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                {recipient.email}
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}


                        {mail.Cc && (
                            <div className="flex items-center gap-1 flex-wrap text-sm">
                                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
                                    To:
                                </span>
                                {mailCc?.slice(0, 1).map((recipient, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs font-medium"
                                    >
                                        {recipient.name}
                                    </span>
                                ))}

                                {mailCc?.length > 1 && (
                                    <div className="relative group inline-block">
                                        <span className="text-blue-600 underline cursor-pointer group-hover:text-blue-800 text-xs font-medium ml-1">
                                            +{mailCc.length - 1} more
                                        </span>

                                        <div className="absolute z-50 hidden group-hover:block bg-white dark:bg-gray-800 border dark:border-gray-600 shadow-lg p-4 rounded-lg w-72 max-h-64 overflow-y-auto mt-2 left-0">
                                            <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                                All Recipients
                                            </h4>
                                            <ul className="space-y-2 text-sm">
                                                {mailCc.map((recipient, index) => (
                                                    <li key={index} className="flex items-center gap-2">
                                                        <img
                                                            src={recipient.profileLink}
                                                            alt={recipient.name}
                                                            className="w-6 h-6 rounded-full object-cover border"
                                                        />
                                                        <div>
                                                            <div className="font-medium text-gray-800 dark:text-gray-100">
                                                                {recipient.name}
                                                            </div>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                {recipient.email}
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {new Date(mail.LastMessageAt).toLocaleString()}
                    </span>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {mail.unSeenCount > 0 ? mail.unSeenCount : ''}
                    </span>
                </div>
            </div>



            <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className={`space-y-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {mailContent.map((message, index) => (
                        <div
                            key={message._id}
                            className={`p-6 rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl group
          ${darkMode
                                    ? index % 2 === 0
                                        ? 'bg-gray-800 border-gray-700'
                                        : 'bg-gray-700 border-gray-600'
                                    : index % 2 === 0
                                        ? 'bg-white border-gray-200'
                                        : 'bg-gray-200 border-gray-100'
                                }`}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={message.Sender?.profileLink}
                                        alt={message.Sender?.name}
                                        className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover shadow-sm"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-lg">
                                            {message.Sender?.name}{' '}
                                            <span className="text-sm text-gray-400">({message.Sender?.Role})</span>
                                        </h4>
                                        <p className="text-sm text-gray-500">{message.Sender?.email}</p>
                                    </div>
                                </div>

                                <div className="flex justify-center items-center gap-2 text-xs sm:text-sm text-gray-400">
                                    <span>Sent At: {new Date(message.SentAt).toLocaleString()}</span>
                                    {/* <span
                                        className={`inline-block px-2 py-1 rounded-full font-medium ${message.isRead
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-700'
                                            }`}
                                    >
                                        {message.isRead ? 'Read' : 'Unread'}
                                    </span> */}
                                </div>
                            </div>

                            {/* Body */}
                            <div
                                className={`prose max-w-none leading-relaxed text-[15px] ${darkMode ? 'prose-invert' : ''}`}
                                dangerouslySetInnerHTML={{ __html: message.MessageBody }}
                            />

                            {/* Seen By */}
                            {message.SeenBy && message.SeenBy.length > 0 && (
                                <div className="flex items-center gap-1 flex-wrap text-sm">
                                    <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
                                        Seen By ({message.SeenBy.length})
                                    </span>

                                    <ul className="text-sm pl-2 space-y-2">
                                        {message.SeenBy.slice(0, 1).map((seen, idx) => (
                                            <li key={idx} className="flex items-center gap-3">
                                                <img
                                                    src={seen.UserID?.profileLink}
                                                    alt={seen.UserID?.name}
                                                    className="w-8 h-8 rounded-full object-cover border"
                                                />
                                                <div className="flex gap-3 items-center flex-wrap">
                                                    <div className="font-medium">{seen.UserID?.name}</div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    {message.SeenBy.length > 1 && (
                                        <div className="relative inline-block">
                                            <div className="group/seen relative inline-block">
                                                <span className="text-blue-600 cursor-pointer underline group-hover/seen:text-blue-800 text-xs font-medium ml-1">
                                                    +{message.SeenBy.length - 1} more
                                                </span>

                                                <div className="absolute z-50 hidden group-hover/seen:block bg-white dark:bg-gray-800 border dark:border-gray-600 shadow-lg p-4 rounded-lg w-72 max-h-64 overflow-y-auto mt-2 left-0">
                                                    <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                                        Seen By
                                                    </h4>
                                                    <ul className="space-y-2 text-sm">
                                                        {message.SeenBy.map((seen, index) => (
                                                            <li key={index} className="flex items-center gap-2">
                                                                <img
                                                                    src={seen.UserID?.profileLink}
                                                                    alt={seen.UserID?.name}
                                                                    className="w-6 h-6 rounded-full object-cover border"
                                                                />
                                                                <div>
                                                                    <div className="font-medium text-gray-800 dark:text-gray-100">
                                                                        {seen.UserID?.name}
                                                                    </div>
                                                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                        &lt;{seen.UserID?.email}&gt;
                                                                    </div>
                                                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                        {seen.IsRead
                                                                            ? `Read at ${new Date(seen.ReadAt).toLocaleString()}`
                                                                            : 'Unread'}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            )}



                        </div>
                    ))}
                </div>
            </div>


            <div className={`p-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowReplyDialog(true)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                        Reply
                    </button>
                    <button
                        onClick={() => setShowForwardDialog(true)}
                        className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        Forward
                    </button>
                </div>
            </div>

            {showReplyDialog && (
                <ReplyDialog
                    onClose={() => setShowReplyDialog(false)}
                    ConversationID={mail._id}
                    addNewMessage={addNewMessage}
                />
            )}

            {showForwardDialog && (
                <ForwardDialog
                    onClose={() => setShowForwardDialog(false)}
                    ConversationID={mail._id}
                />
            )}

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