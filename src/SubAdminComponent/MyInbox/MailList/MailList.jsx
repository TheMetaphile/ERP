import React from 'react';
import { Search, Star, UserX } from 'react-feather';
import { getMailsBySection, getSectionTitle } from '../MailData';

function MailList({ setSelectedMail, selectedMail, isOpen, onClose, darkMode, currentSection }) {
    const emails = getMailsBySection(currentSection);
    const sectionTitle = getSectionTitle(currentSection);

    return (
        <div className={`${darkMode ? 'bg-gray-50 dark:bg-gray-900' : 'bg-gray-50'} transform transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col border-r border-gray-200 dark:border-gray-700 h-full`}>
            <div className={`p-4 border-b ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}`}>
                {/* <div className="flex items-center justify-between mb-4">
                    <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {sectionTitle}
                    </h2>
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <UserX className="w-5 h-5" />
                    </button>
                </div> */}

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder={`Search ${sectionTitle.toLowerCase()}...`}
                        className={`
                            w-full pl-10 pr-4 py-2 rounded-lg border transition-all duration-200
                            ${darkMode
                                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                            }
                            focus:outline-none focus:ring-2 focus:ring-blue-500/20
                        `}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {emails.length === 0 ? (
                    <div className={`p-8 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <p>No emails in {sectionTitle.toLowerCase()}</p>
                    </div>
                ) : (
                    emails.map((email) => (
                        <div
                            key={email.id}
                            className={`
                                p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer
                                transition-all duration-200 hover:shadow-md
                                ${selectedMail?.id === email.id
                                    ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500'
                                    : `${darkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-white hover:bg-gray-50'}`
                                }
                                ${email.unread ? 'font-semibold' : 'font-normal'}
                                transform hover:scale-[1.02] hover:translate-x-1
                            `}
                            onClick={() => setSelectedMail(email)}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`
                                    w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0
                                    ${email.unread
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                                        : 'bg-gray-400'
                                    }
                                `}>
                                    {email.avatar}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className={`truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {email.sender}
                                        </h4>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            {email.starred && (
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            )}
                                            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                {email.time}
                                            </span>
                                        </div>
                                    </div>

                                    <h5 className={`text-sm mb-1 truncate ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                        {email.subject}
                                    </h5>

                                    <p className={`text-xs leading-relaxed line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {email.preview}
                                    </p>

                                    {email.unread && (
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default MailList;