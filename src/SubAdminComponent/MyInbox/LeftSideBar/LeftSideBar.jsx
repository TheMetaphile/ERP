import React, { useEffect, useState } from 'react';
import { AlertTriangle, Inbox, Mail, Plus, Send, Star, Trash2, UserX } from 'react-feather';

function LeftSideBar({ isOpen, onClose, darkMode, onCompose, currentSection, onSectionChange }) {
    const [customFolders, setCustomFolders] = useState([
        { Name: 'Projects' }
    ]);

    const [showMore, setShowMore] = useState(false);

    const sidebarItems = [
        { icon: Inbox, label: 'Default', count: 24, section: 'default' },
        { icon: Inbox, label: 'Inbox', count: 24, section: 'inbox' },
        { icon: Send, label: 'Sent', count: null, section: 'sent' },
        { icon: Mail, label: 'Drafts', count: 2, section: 'drafts' },
        { icon: Star, label: 'Archived', count: 3, section: 'archived' },
        { icon: Star, label: 'Starred', count: 3, section: 'starred' },
        { icon: Star, label: 'Deleted', count: 3, section: 'deleted' },
        { icon: Star, label: 'Favourite', count: 3, section: 'favourite' },
        { icon: AlertTriangle, label: 'Spam', count: 1, section: 'spam' },
    ];

    useEffect(() => {
        const fetchCustomFolders = async () => {
        };

        fetchCustomFolders();
    }, []);

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

                    <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                        {sidebarItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => onSectionChange(item.section)}
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
                                {item.count && (
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

                        {customFolders.length > 0 && (
                            <>
                                <button
                                    onClick={() => setShowMore((prev) => !prev)}
                                    className="w-full flex items-center justify-between p-3 rounded-xl text-left transition-all duration-200 font-medium text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <span>{showMore ? 'Less' : 'More'}</span>
                                    <span>{showMore ? '▲' : '▼'}</span>
                                </button>

                                {showMore && (
                                    <div className="mt-1 pl-2 border-l-2 border-gray-200 dark:border-gray-700 space-y-1">
                                        {customFolders.map((folder, index) => (
                                            <button
                                                key={`custom-${index}`}
                                                onClick={() => onSectionChange(folder.Name.toLowerCase())}
                                                className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 font-medium text-sm ${currentSection === folder.Name.toLowerCase()
                                                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400 shadow-sm'
                                                        : darkMode
                                                            ? 'text-gray-300 hover:bg-gray-800'
                                                            : 'text-gray-700 hover:bg-gray-50'
                                                    } hover:shadow-md hover:scale-105`}
                                            >
                                                {folder.Name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </nav>

                    <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                                JD
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className={`font-semibold truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    John Doe
                                </p>
                                <p className={`text-sm truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    john@example.com
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
