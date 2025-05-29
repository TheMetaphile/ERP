import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';
import LeftSideBar from './LeftSideBar/LeftSideBar';
import MailList from './MailList/MailList';
import MailContent from './MailContent/MailContent';
import ComposeMail from './ComposeMail/ComposeMail';
import { ChevronLeft, ChevronRight, Menu } from 'react-feather';

function MyInbox() {
    const { section } = useParams(); // Get current section from URL
    const navigate = useNavigate();
    const { darkMode } = useContext(AuthContext);
    const [selectedMail, setSelectedMail] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [mailListOpen, setMailListOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isComposing, setIsComposing] = useState(false);

    const currentSection = section || 'inbox';

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth >= 1024) {
                setSidebarOpen(false);
                setMailListOpen(false);
            }
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        setSelectedMail(null);
        setIsComposing(false);
    }, [currentSection]);

    const handleMailSelect = (mail) => {
        setSelectedMail(mail);
        setIsComposing(false);
        if (isMobile) setMailListOpen(false);
    };

    const handleCompose = () => {
        setIsComposing(true);
        setSelectedMail(null);
    };

    const handleSectionChange = (sectionName) => {
        navigate(`/Sub-Admin/MyInbox/${sectionName}`);
        if (isMobile) setSidebarOpen(false);
    };

    return (
        <div className={`h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <div className={`lg:hidden fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-b p-4 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                    <button onClick={() => setSidebarOpen(true)} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                        <Menu className="w-6 h-6" />
                    </button>
                    <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}
                    </h1>
                </div>
                <button onClick={() => setMailListOpen(true)} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            <div className="w-full h-full">
                <LeftSideBar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    darkMode={darkMode}
                    onCompose={handleCompose}
                    currentSection={currentSection}
                    onSectionChange={handleSectionChange}
                />

                <div className="w-full h-full grid grid-cols-[30%_70%] mt-20">
                    <MailList
                        setSelectedMail={handleMailSelect}
                        selectedMail={selectedMail}
                        isOpen={mailListOpen || !isMobile}
                        onClose={() => setMailListOpen(false)}
                        darkMode={darkMode}
                        currentSection={currentSection}
                    />

                    {isComposing ? (
                        <ComposeMail darkMode={darkMode} onCancel={() => setIsComposing(false)} />
                    ) : (
                        <MailContent mail={selectedMail} darkMode={darkMode} currentSection={currentSection} />
                    )}
                </div>
            </div>

            {isMobile && selectedMail && !isComposing && (
                <button
                    onClick={() => setMailListOpen(true)}
                    className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-200"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
            )}
        </div>
    );
}

export default MyInbox;