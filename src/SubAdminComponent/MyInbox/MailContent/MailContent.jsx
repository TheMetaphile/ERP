import React from 'react'
import { Mail, Star, Trash2 } from 'react-feather';

function MailContent({ mail, darkMode }) {
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
        </div>
    );
}

export default MailContent;