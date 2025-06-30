import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';
import LeftSideBar from './LeftSideBar/LeftSideBar';
import MailList from './MailList/MailList';
import MailContent from './MailContent/MailContent';
import ComposeMail from './ComposeMail/ComposeMail';
import { ChevronLeft, ChevronRight, Menu } from 'react-feather';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

function MyInbox() {
    const location = useLocation();
    const { id = 'inbox' } = useParams();
    const navigate = useNavigate();
    const { darkMode, toggleDarkMode } = useContext(AuthContext);
    const [selectedMail, setSelectedMail] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [mailListOpen, setMailListOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isComposing, setIsComposing] = useState(false);
    const [emails, setEmails] = useState([]);
    const [customFolders, setCustomFolders] = useState([]);


    const updateMailProperty = (mailId, updatedFields) => {
        console.log(emails, mailId, updatedFields)
        setEmails(prev =>
            prev.map(email =>
                email._id === mailId ? { ...email, ...updatedFields } : email
            )
        );
        setSelectedMail(prev =>
            prev && prev._id === mailId ? { ...prev, ...updatedFields } : prev
        );
    };

    const updateMailStatus = (mailId, updatedStatus) => {
        console.log(emails, mailId, updatedStatus)

        setEmails(prev =>
            prev.map(email => {
                if (email._id !== mailId) return email;

                return {
                    ...email,
                    status: { ...email.status, ...updatedStatus }
                };
            })
        );

        setSelectedMail(prev => {
            if (!prev || prev._id !== mailId) return prev;

            return {
                ...prev,
                status: { ...prev.status, ...updatedStatus }

            };
        });
    };


    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768); // Consider mobile for widths < 768px
            if (window.innerWidth >= 768) {
                setMailListOpen(true); // Open MailList by default on tablet and above
            }
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        setSelectedMail(null);
        setIsComposing(false);
    }, [id]);

    const handleMailSelect = (mail, folderId = 'inbox') => {
        setSelectedMail(mail);
        setIsComposing(false);
        const currentPath = location.pathname;

        let basePath = '/Sub-Admin';
        if (currentPath.includes('Teacher-Dashboard')) {
            basePath = '/Teacher-Dashboard';
        } else if (currentPath.includes('Student-Dashboard')) {
            basePath = '/Student-Dashboard';
        } else if (currentPath.includes('Admin-Dashboard')) {
            basePath = '/Admin-Dashboard';
        }

        // Default to 'inbox' if section is not defined

        const targetUrl = `${basePath}/MyInbox/${folderId}/${mail._id}`;
        console.log('target1', targetUrl)
        navigate(targetUrl);

        if (isMobile) setMailListOpen(false);
    };

    useEffect(() => {
        console.log('************')
        setSelectedMail(null);
    }, [id])

    const handleCompose = () => {
        setIsComposing(true);
        setSelectedMail(null);
        setMailListOpen(false);
    };

    console.log('selected', selectedMail, id, darkMode)

    useEffect(() => {
        if (selectedMail) {
            handleSectionChange(id);
        }
    }, [selectedMail])

    const handleSectionChange = (folderId = 'inbox') => {
        const currentPath = location.pathname;
        console.log(folderId, 'here for id')

        let basePath = '/Sub-Admin';

        if (currentPath.includes('Teacher-Dashboard')) {
            basePath = '/Teacher-Dashboard';
        } else if (currentPath.includes('Student-Dashboard')) {
            basePath = '/Student-Dashboard';
        } else if (currentPath.includes('Admin-Dashboard')) {
            basePath = '/Admin-Dashboard';
        }

        let targetUrl = `${basePath}/MyInbox/${folderId}`;
        if (selectedMail?._id) {
            targetUrl += `/${selectedMail._id}`;
        }

        console.log("Navigating to:", targetUrl);
        navigate(targetUrl);

        if (isMobile) setSidebarOpen(false);
    };

    return (
        <div className={` ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <ToastContainer />
            <div className={`lg:hidden fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-b p-4 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                    <button onClick={() => setSidebarOpen(true)} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100'}`}>
                        <Menu className="w-6 h-6" />
                    </button>
                    <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        <span>
                            {customFolders.find(folder => folder?._id === id)?.Name || id.toUpperCase()}
                        </span>
                    </h1>

                </div>
                {/* <button
                    onClick={toggleDarkMode}
                    className={`p-2 rounded-full ${darkMode
                        ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        } transition-colors`}
                >
                    {darkMode ? (
                        <MdOutlineLightMode size={18} />
                    ) : (
                        <MdOutlineDarkMode size={18} />
                    )}
                </button> */}
            </div>

            <div className="w-full h-full">
                <LeftSideBar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    darkMode={darkMode}
                    onCompose={handleCompose}
                    currentSection={id}
                    onSectionChange={handleSectionChange}
                    customFolders={customFolders}
                    setCustomFolders={setCustomFolders}
                />

                <div className={`w-full h-[calc(100vh-5rem)] ${isMobile ? 'flex flex-col' : 'grid grid-cols-[30%_70%]'} mt-18 overflow-hidden`}>
                    {(!isMobile || mailListOpen) && (
                        <div className="h-full overflow-y-auto no-scrollbar">
                            <MailList
                                emails={emails}
                                setEmails={setEmails}
                                setSelectedMail={handleMailSelect}
                                selectedMail={selectedMail}
                                isOpen={mailListOpen || !isMobile}
                                onClose={() => setMailListOpen(false)}
                                darkMode={darkMode}
                                currentSection={id}
                                folderName={customFolders.find(folder => folder?._id === id)?.Name || id}
                            />
                        </div>
                    )}

                    {(!isMobile || !mailListOpen) && (
                        <div className="h-full overflow-y-auto no-scrollbar">
                            {isComposing ? (
                                <ComposeMail darkMode={darkMode} onCancel={() => setIsComposing(false)} />
                            ) : (
                                <MailContent
                                    mail={selectedMail}
                                    darkMode={darkMode}
                                    currentSection={id}
                                    onUpdateMail={updateMailProperty}
                                    onStatusUpdateMail={updateMailStatus}
                                />
                            )}
                        </div>
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