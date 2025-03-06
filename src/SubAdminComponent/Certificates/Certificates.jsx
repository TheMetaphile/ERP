import { useState, useContext, useEffect, useRef, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';
import { BASE_URL } from '../../Config';
import { ToastContainer, toast } from 'react-toastify';
import { motion, AnimatePresence } from "framer-motion";
import {
    FiDownload, FiCheck, FiX, FiFilter,
    FiFile, FiFileText, FiAlertCircle, FiUsers,
    FiArrowDown, FiRefreshCw, FiCheckCircle, FiBook,
    FiGrid,
    FiSearch
} from "react-icons/fi";

const Certificates = () => {
    const [tcData, setTcData] = useState([]);
    const { authState, darkMode } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [downloadLoading, setDownloadLoading] = useState(false);
    const [Class, setClass] = useState('9th');
    const [selectedSection, setSelectedSection] = useState('');
    const [sectionsDetails, setSections] = useState([]);
    const [start, setStart] = useState(0);
    const end = 10;
    const [allDataFetched, setAllDataFetched] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState('2024-25');
    const [selectedStudents, setSelectedStudents] = useState([]);
    const sentinelRef = useRef(null);
    const [fetchedFields, setFetchedFields] = useState([]);
    const [selectedCCReference, setSelectedCCReference] = useState('');
    const [selectedTCReference, setSelectedTCReference] = useState('');
    const [customCCDialogOpen, setCustomCCDialogOpen] = useState(false);
    const [customTCDialogOpen, setCustomTCDialogOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [error, setError] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [searchString, setsearchString] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchedStudent, setSearchedStudent] = useState(null);

    const handleSuggestionClick = (suggestion) => {
        console.log("here", suggestion);
        setSearchedStudent(suggestion);
        setShowSuggestions(false);

    };

    const [formData, setFormData] = useState({
        name: "",
        motherName: "",
        fatherName: "",
        dob: "",
        nationality: "",
        category: "",
        firstAdmissionDate: "",
        lastClass: "",
        examResult: "",
        subjects: "",
        promotionStatus: "",
        paidTillMonth: "",
        workingDays: "",
        presentDays: "",
        activities: "",
        conduct: "",
        applicationDate: "",
        issueDate: "",
        reasonForLeaving: "",
        remark: "",
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (type, customTemplate = null) => {
        setDownloadLoading(true);

        try {

            let selectedTemplate;
            let endpoint;

            if (type === 'CC') {
                selectedTemplate = customTemplate || selectedCCReference;
                if (!selectedTemplate) {
                    toast.warn("Please select CC Template");
                    setDownloadLoading(false);
                    return;
                }
                endpoint = 'cc';
            } else if (type === 'TC') {
                selectedTemplate = customTemplate || selectedTCReference;
                if (!selectedTemplate) {
                    toast.warn("Please select TC Template");
                    setDownloadLoading(false);
                    return;
                }
                endpoint = 'tc';
            }

            const apiUrl = `${BASE_URL}/certificate/custom/${endpoint}/${selectedSession}/${selectedTemplate}`;

            const response = await axios.post(apiUrl, {
                formData: formData,
                templateReference: selectedTemplate
            }, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                },
                responseType: "blob"
            });

            const pdfBlob = new Blob([response.data], { type: "application/pdf" });
            const pdfUrl = URL.createObjectURL(pdfBlob);

            const link = document.createElement("a");
            link.href = pdfUrl;
            link.download = `${type === 'CC' ? 'Character_Certificate' : 'Transfer_Certificate'}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(pdfUrl);

            toast.success(`${type} downloaded successfully!`);

            // Close dialog if open
            if (type === 'CC' && customCCDialogOpen) setCustomCCDialogOpen(false);
            if (type === 'TC' && customTCDialogOpen) setCustomTCDialogOpen(false);

        } catch (error) {
            console.error(`Error downloading ${type}:`, error);
            const errorMessage = error.response?.data?.error || `Failed to download ${type}`;
            toast.error(errorMessage);
            setError(errorMessage);
        } finally {
            setDownloadLoading(false);
        }
    };

    // Theme-based style classes
    const themeClasses = {
        container: darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800",
        card: darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
        button: {
            primary: darkMode
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white",
            secondary: darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800",
            disabled: darkMode
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
        },
        input: darkMode
            ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
            : "bg-white border-blue-300 text-gray-800 focus:ring-blue-500 focus:border-blue-500",
        table: {
            header: darkMode ? "bg-gray-800 text-gray-200" : "bg-blue-100 text-gray-800",
            row: darkMode ? "border-gray-700 hover:bg-gray-700" : "border-gray-200 hover:bg-blue-50",
            altRow: darkMode ? "bg-gray-750" : "bg-blue-50"
        },
        dialog: {
            overlay: darkMode ? "bg-black bg-opacity-70" : "bg-black bg-opacity-50",
            container: darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
        },
        checkbox: darkMode
            ? "border-indigo-500 checked:bg-indigo-600"
            : "border-blue-500 checked:bg-blue-600",
        icon: darkMode ? "text-indigo-400" : "text-blue-500",
        loading: darkMode ? "text-indigo-400" : "text-blue-500",
        header: darkMode ? "border-gray-700" : "border-gray-300",
        error: darkMode ? "bg-red-900 border-red-700" : "bg-red-100 border-red-300"
    };

    // Animation variants
    const fadeInVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } }
    };

    const scaleVariants = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } }
    };

    const fetchFieldsForUserType = async () => {
        setError(null);
        try {
            const response = await axios.get(`${BASE_URL}/templates/fetch`, {
                headers: {
                    'Authorization': `Bearer ${authState.accessToken}`
                }
            });

            if (response.status === 200) {
                const filteredFields = response.data || [];
                setFetchedFields(filteredFields);

                // Auto-select first template if available
                const ccTemplates = filteredFields.filter(doc => doc.documentName === "CC");
                const tcTemplates = filteredFields.filter(doc => doc.documentName === "TC");

                if (ccTemplates.length > 0 && !selectedCCReference) {
                    setSelectedCCReference(ccTemplates[0].referenceNo + "." + ccTemplates[0].documentType);
                }

                if (tcTemplates.length > 0 && !selectedTCReference) {
                    setSelectedTCReference(tcTemplates[0].referenceNo + "." + tcTemplates[0].documentType);
                }

                toast.success(`Template fields loaded successfully`);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Failed to load templates';
            console.log(error);
            toast.error(errorMessage);
            setError(errorMessage);
            setFetchedFields([]);
        }
    };

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const newSessions = [];

        for (let i = 0; i < 5; i++) {
            const startYear = currentYear - i;
            const endYear = startYear + 1;
            newSessions.push(`${startYear}-${endYear.toString().slice(-2)}`);
        }

        setSessions(newSessions);
        fetchFieldsForUserType();
    }, []);

    const handleSessionChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedSession(selectedValue);
    };

    const handleSectionChange = (e) => {
        setSelectedSection(e.target.value);
    };

    useEffect(() => {
        if (selectedSession) {
            setStart(0);
            setTcData([]);
            setSelectedStudent([]);
            setAllDataFetched(false);
            setLoading(false);
        }
    }, [selectedSession, Class, selectedSection]);

    useEffect(() => {
        if (start === 0 && tcData.length === 0 && !allDataFetched && !loading) {
            fetchUserTc();
        }
    }, [start, tcData, allDataFetched, loading]);

    const handleViewMore = () => {
        if (!allDataFetched && !loading) {
            setStart((prevStart) => prevStart + end);
        }
    };

    useEffect(() => {
        if (start !== 0) {
            fetchUserTc();
        }
    }, [start]);

    const fetchUserTc = async () => {
        if (loading || allDataFetched) return;
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `${BASE_URL}/terminate/terminatedStudents?Class=${Class}&section=${selectedSection}&session=${selectedSession}&start=${start}&end=${end}`,
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                }
            );

            if (response.status === 200) {
                const tc = response.data.list.length;
                if (tc + tcData.length < end + start) {
                    toast.success('All data fetched');
                    setAllDataFetched(true);
                }
                setTcData(prevData => [...prevData, ...response.data.list]);
            }
        } catch (err) {
            console.log(err);
            const errorMessage = err.response?.data?.error || 'Failed to fetch students data';
            toast.error(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleClassChange = (event) => {
        setClass(event.target.value);
    };

    const fetchSections = async () => {
        setError(null);
        try {
            const response = await axios.get(
                `${BASE_URL}/terminate/sections/${Class}/${selectedSession}`,
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                }
            );

            const sectionsdetail = response.data.sections;
            setSections(sectionsdetail);
        } catch (error) {
            console.error("Error while fetching section:", error);
            const errorMessage = error.response?.data?.error || 'Failed to fetch sections';
            toast.error(errorMessage);
            setError(errorMessage);
        }
    };

    useEffect(() => {
        fetchSections();
    }, [Class, selectedSession]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !allDataFetched && !loading) {
                    handleViewMore();
                }
            },
            { root: null, rootMargin: '100px', threshold: 0.1 }
        );

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => {
            if (sentinelRef.current) {
                observer.unobserve(sentinelRef.current);
            }
        };
    }, [allDataFetched, loading]);

    const downloadCertificate = async (type, customStudent = null, customTemplate = null) => {
        setError(null);
        setDownloadLoading(true);

        try {
            const students = customStudent ? [customStudent] : selectedStudents;

            if (!students || students.length <= 0) {
                toast.warn("Please select student(s)");
                setDownloadLoading(false);
                return;
            }

            let selectedTemplate;
            let endpoint;

            if (type === 'CC') {
                selectedTemplate = customTemplate || selectedCCReference;
                if (!selectedTemplate) {
                    toast.warn("Please select CC Template");
                    setDownloadLoading(false);
                    return;
                }
                endpoint = 'cc';
            } else if (type === 'TC') {
                selectedTemplate = customTemplate || selectedTCReference;
                if (!selectedTemplate) {
                    toast.warn("Please select TC Template");
                    setDownloadLoading(false);
                    return;
                }
                endpoint = 'tc';
            }

            const apiUrl = `${BASE_URL}/certificate/${endpoint}/${selectedSession}/${selectedTemplate}`;

            const response = await axios.post(apiUrl, {
                students: students,
                templateReference: selectedTemplate
            }, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                },
                responseType: "blob"
            });

            const pdfBlob = new Blob([response.data], { type: "application/pdf" });
            const pdfUrl = URL.createObjectURL(pdfBlob);

            const link = document.createElement("a");
            link.href = pdfUrl;
            link.download = `${type === 'CC' ? 'Character_Certificate' : 'Transfer_Certificate'}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(pdfUrl);

            toast.success(`${type} downloaded successfully!`);

            // Close dialog if open
            if (type === 'CC' && customCCDialogOpen) setCustomCCDialogOpen(false);
            if (type === 'TC' && customTCDialogOpen) setCustomTCDialogOpen(false);

        } catch (error) {
            console.error(`Error downloading ${type}:`, error);
            const errorMessage = error.response?.data?.error || `Failed to download ${type}`;
            toast.error(errorMessage);
            setError(errorMessage);
        } finally {
            setDownloadLoading(false);
        }
    };

    const toggleRow = (id) => {
        setSelectedStudents((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    };

    const openCustomCCDialog = (student) => {
        setSelectedStudent(student);
        setCustomCCDialogOpen(true);
    };

    const openCustomTCDialog = (student) => {
        setSelectedStudent(student);
        setCustomTCDialogOpen(true);
    };

    const closeCustomDialog = () => {
        setCustomCCDialogOpen(false);
        setCustomTCDialogOpen(false);
        setSelectedStudent(null);
    };

    useEffect(() => {
        if (searchString) {
            const handler = setTimeout(() => {
                setShowSuggestions(true);
                const searchTeacher = async () => {
                    try {
                        const response = await axios.post(`${BASE_URL}/search/Exstudent`, {
                            accessToken: authState.accessToken,
                            session: selectedSession,
                            searchString: searchString,
                            start: 0,
                            end: 30
                        })
                        // console.log(response.data)
                        const teacherEmails = response.data.Teachers.map(teacher => ({
                            _id: teacher._id,
                            "currentClass": teacher.currentClass,
                            "fatherName": teacher.fatherName,
                            "rollNumber": teacher.rollNumber,
                            "section": teacher.section,
                            fatherPhoneNumber: teacher.fatherPhoneNumber,
                            email: teacher.email,
                            profileLink: teacher.profileLink,
                            name: teacher.name
                        }));
                        setSuggestions(teacherEmails);

                    }
                    catch (error) {
                        console.error("Error searching for teachers:", error);
                    }
                }
                searchTeacher();
            }, 500);

            return () => {
                clearTimeout(handler);
            }
        } else {
            setShowSuggestions(false);
        }
    }, [searchString]);

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            className={`min-h-screen p-4 transition-colors duration-300 ${themeClasses.container}`}
        >
            <motion.div
                className={`rounded-lg shadow-lg p-6 mb-6 transition-colors duration-300 ${themeClasses.card}`}
                variants={scaleVariants}
            >
                <div className="flex justify-between items-center mb-6 pb-4 border-b transition-colors duration-300 w-full">
                    <h1 className="text-2xl font-bold flex items-center">
                        <FiFileText className={`mr-2 ${themeClasses.icon}`} />
                        Certificates Management
                    </h1>
                </div>

                {error && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className={`mb-4 p-3 rounded-lg border flex items-center ${themeClasses.error}`}
                    >
                        <FiAlertCircle className="text-red-500 mr-2" />
                        <span>{error}</span>
                        <button
                            onClick={() => setError(null)}
                            className="ml-auto text-gray-500 hover:text-gray-700"
                        >
                            <FiX />
                        </button>
                    </motion.div>
                )}

                <div className="grid grid-cols-2 mobile:max-tablet::grid-cols-3 laptop:grid-cols-5 gap-4 mb-6">
                    <div className="relative">
                        <label className="block text-sm font-medium mb-1">Class</label>
                        <div className="relative">
                            <select
                                value={Class}
                                onChange={handleClassChange}
                                className={`w-full rounded-lg px-3 py-2 appearance-none border transition-colors duration-300 ${themeClasses.input}`}
                            >
                                <option value="Pre-Nursery">Pre-Nursery</option>
                                <option value="Nursery">Nursery</option>
                                <option value="L.K.G">L.K.G</option>
                                <option value="U.K.G">U.K.G</option>
                                <option value="1st">1st</option>
                                <option value="2nd">2nd</option>
                                <option value="3rd">3rd</option>
                                <option value="4th">4th</option>
                                <option value="5th">5th</option>
                                <option value="6th">6th</option>
                                <option value="7th">7th</option>
                                <option value="8th">8th</option>
                                <option value="9th">9th</option>
                                <option value="10th">10th</option>
                                <option value="11th">11th</option>
                                <option value="12th">12th</option>
                            </select>
                            <FiBook className="absolute right-3 top-1/2 transform -translate-y-1/2" />
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium mb-1">Session</label>
                        <div className="relative">
                            <select
                                value={selectedSession}
                                onChange={handleSessionChange}
                                className={`w-full rounded-lg px-3 py-2 appearance-none border transition-colors duration-300 ${themeClasses.input}`}
                            >
                                {sessions.map((session, index) => (
                                    <option key={index} value={session}>
                                        {session}
                                    </option>
                                ))}
                            </select>
                            <FiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2" />
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium mb-1">Section</label>
                        <div className="relative">
                            <select
                                value={selectedSection}
                                onChange={handleSectionChange}
                                className={`w-full rounded-lg px-3 py-2 appearance-none border transition-colors duration-300 ${themeClasses.input}`}
                            >
                                <option value="">All Sections</option>
                                {sectionsDetails.map((section, index) => (
                                    <option key={index} value={section}>
                                        {section}
                                    </option>
                                ))}
                            </select>
                            <FiGrid className="absolute right-3 top-1/2 transform -translate-y-1/2" />
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium mb-1">CC Template</label>
                        <div className="relative">
                            <select
                                value={selectedCCReference}
                                onChange={(e) => setSelectedCCReference(e.target.value)}
                                className={`w-full rounded-lg px-3 py-2 appearance-none border transition-colors duration-300 ${themeClasses.input}`}
                            >
                                <option value="">Select CC Template</option>
                                {fetchedFields
                                    .filter((doc) => doc.documentName === "CC")
                                    .map((reference, index) => (
                                        <option key={index} value={reference.referenceNo + "." + reference.documentType}>
                                            {reference.referenceNo + "." + reference.documentType}
                                        </option>
                                    ))
                                }
                            </select>
                            <FiFile className="absolute right-3 top-1/2 transform -translate-y-1/2" />
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium mb-1">TC Template</label>
                        <div className="relative">
                            <select
                                value={selectedTCReference}
                                onChange={(e) => setSelectedTCReference(e.target.value)}
                                className={`w-full rounded-lg px-3 py-2 appearance-none border transition-colors duration-300 ${themeClasses.input}`}
                            >
                                <option value="">Select TC Template</option>
                                {fetchedFields
                                    .filter((doc) => doc.documentName === "TC")
                                    .map((reference, index) => (
                                        <option key={index} value={reference.referenceNo + "." + reference.documentType}>
                                            {reference.referenceNo + "." + reference.documentType}
                                        </option>
                                    ))
                                }
                            </select>
                            <FiFile className="absolute right-3 top-1/2 transform -translate-y-1/2" />
                        </div>
                    </div>
                    <div className="relative">
                        <label className="block text-sm font-medium mb-1">Search</label>
                        <div className="relative">
                            <input type="text" value={searchString} onChange={(e) => { setsearchString(e.target.value) }} className={`w-full rounded-lg px-3 py-2 appearance-none border transition-colors duration-300 ${themeClasses.input}`} placeholder="Enter Email" required />
                            {showSuggestions && suggestions.length > 0 && (
                                <ul className="absolute z-10 w-72 bg-white border rounded-md mt-1 max-h-40 overflow-y-auto">
                                    {suggestions.map((suggestion, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                                            onClick={() => handleSuggestionClick(suggestion)}
                                        >
                                            <img src={suggestion.profileLink} alt="Profile" className='w-6 h-6 rounded-full mr-2' />
                                            {suggestion.email}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    <button
                        onClick={() => downloadCertificate('CC')}
                        disabled={selectedStudents.length === 0 || !selectedCCReference || downloadLoading}
                        className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${selectedStudents.length === 0 || !selectedCCReference || downloadLoading
                            ? themeClasses.button.disabled
                            : themeClasses.button.primary
                            }`}
                    >
                        {downloadLoading ? (
                            <FiRefreshCw className="animate-spin mr-2" />
                        ) : (
                            <FiDownload className="mr-2" />
                        )}
                        Download Character Certificate
                    </button>

                    <button
                        onClick={() => downloadCertificate('TC')}
                        disabled={selectedStudents.length === 0 || !selectedTCReference || downloadLoading}
                        className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${selectedStudents.length === 0 || !selectedTCReference || downloadLoading
                            ? themeClasses.button.disabled
                            : themeClasses.button.primary
                            }`}
                    >
                        {downloadLoading ? (
                            <FiRefreshCw className="animate-spin mr-2" />
                        ) : (
                            <FiDownload className="mr-2" />
                        )}
                        Download Transfer Certificate
                    </button>
                </div>
            </motion.div>

            <motion.div
                className={`rounded-lg shadow-lg overflow-hidden transition-colors duration-300 ${themeClasses.card}`}
                variants={scaleVariants}
            >
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 transition-colors duration-300">
                        <thead className={`transition-colors duration-300 ${themeClasses.table.header}`}>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Roll No.</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Admission No</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Class</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Section</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            onChange={(e) => {
                                                setSelectedStudents(e.target.checked ? tcData.map((row) => row._id) : []);
                                            }}
                                            className={`appearance-none w-5 h-5 border rounded cursor-pointer transition-all duration-200 ${themeClasses.checkbox}`}
                                        />
                                        <span className="ml-2">Select All</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y transition-colors duration-300">
                            {
                                searchedStudent && <><motion.tr
                                    key={searchedStudent._id}
                                    variants={fadeInVariants}
                                    initial="hidden"
                                    animate="visible"
                                    // className={`transition-colors duration-200 ${themeClasses.table.row} ${index % 2 ? themeClasses.table.altRow : ''}`}
                                    whileHover={{ backgroundColor: darkMode ? '#2d3748' : '#f8f5ff' }}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">{searchedStudent.rollNumber || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{searchedStudent.admissionNo || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                                        <Link to={`/Sub-Admin/Students/details/${searchedStudent.email}`} className="rounded-full text-center px-3 py-2 font-semibold bg-blue-100 text-blue-800">
                                            {searchedStudent.name}
                                        </Link>

                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{searchedStudent.currentClass}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{searchedStudent.section}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => openCustomCCDialog(searchedStudent._id)}
                                                className={`px-3 py-1 rounded-full text-xs flex items-center ${themeClasses.button.secondary}`}
                                            >
                                                <FiFile className="mr-1" />
                                                Custom CC
                                            </button>
                                            <button
                                                onClick={() => openCustomTCDialog(searchedStudent._id)}
                                                className={`px-3 py-1 rounded-full text-xs flex items-center ${themeClasses.button.secondary}`}
                                            >
                                                <FiFileText className="mr-1" />
                                                Custom TC
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="relative flex items-center justify-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedStudents.includes(searchedStudent._id)}
                                                onChange={() => toggleRow(searchedStudent._id)}
                                                className={`appearance-none w-5 h-5 border rounded cursor-pointer transition-all duration-200 ${themeClasses.checkbox}`}
                                            />
                                            {selectedStudents.includes(searchedStudent._id) && (
                                                <FiCheck className="absolute text-white pointer-events-none" />
                                            )}
                                        </div>
                                    </td>
                                </motion.tr>
                                </>
                            }
                            {loading && tcData.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-4 text-center">
                                        <div className="flex justify-center items-center">
                                            <FiRefreshCw className={`animate-spin mr-2 ${themeClasses.loading}`} />
                                            <span>Loading students...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : tcData.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-4 text-center">
                                        <div className="flex flex-col items-center justify-center py-6">
                                            <FiUsers className={`text-4xl mb-2 ${themeClasses.icon}`} />
                                            <p>No students found</p>
                                            <p className="text-sm opacity-75 mt-1">Try changing filters or session</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                tcData.map((item, index) => (
                                    <motion.tr
                                        key={item._id}
                                        variants={fadeInVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className={`transition-colors duration-200 ${themeClasses.table.row} ${index % 2 ? themeClasses.table.altRow : ''}`}
                                        whileHover={{ backgroundColor: darkMode ? '#2d3748' : '#f8f5ff' }}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">{item.rollNumber || '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.admissionNo || '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                                            <Link to={`/Sub-Admin/Students/details/${item.email}`} className="rounded-full text-center px-3 py-2 font-semibold bg-blue-100 text-blue-800">
                                                {item.name}
                                            </Link>

                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.currentClass}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.section}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => openCustomCCDialog(item._id)}
                                                    className={`px-3 py-1 rounded-full text-xs flex items-center ${themeClasses.button.secondary}`}
                                                >
                                                    <FiFile className="mr-1" />
                                                    Custom CC
                                                </button>
                                                <button
                                                    onClick={() => openCustomTCDialog(item._id)}
                                                    className={`px-3 py-1 rounded-full text-xs flex items-center ${themeClasses.button.secondary}`}
                                                >
                                                    <FiFileText className="mr-1" />
                                                    Custom TC
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="relative flex items-center justify-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedStudents.includes(item._id)}
                                                    onChange={() => toggleRow(item._id)}
                                                    className={`appearance-none w-5 h-5 border rounded cursor-pointer transition-all duration-200 ${themeClasses.checkbox}`}
                                                />
                                                {selectedStudents.includes(item._id) && (
                                                    <FiCheck className="absolute text-white pointer-events-none" />
                                                )}
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div ref={sentinelRef} className="py-4 text-center">
                    {loading && start > 0 && (
                        <div className="flex justify-center items-center py-4">
                            <FiRefreshCw className={`animate-spin mr-2 ${themeClasses.loading}`} />
                            <span>Loading more...</span>
                        </div>
                    )}
                    {!loading && !allDataFetched && tcData.length > 0 && (
                        <button
                            onClick={handleViewMore}
                            className={`inline-flex items-center px-4 py-2 rounded-lg ${themeClasses.button.secondary}`}
                        >
                            <FiArrowDown className="mr-2" />
                            Load More
                        </button>
                    )}
                    {allDataFetched && tcData.length > 0 && (
                        <div className="text-sm opacity-75 flex justify-center items-center">
                            <FiCheckCircle className={`mr-2 ${themeClasses.icon}`} />
                            All students loaded
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Custom CC Dialog */}
            <AnimatePresence>
                {customCCDialogOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center"
                    >
                        <div
                            className={`absolute inset-0 ${themeClasses.dialog.overlay}`}
                            onClick={closeCustomDialog}
                        ></div>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className={`relative rounded-lg shadow-xl p-6 w-full max-w-md transition-colors duration-300 ${themeClasses.dialog.container}`}
                        >
                            <div className="flex justify-between items-center mb-4 pb-2 border-b transition-colors duration-300">
                                <h3 className="text-lg font-semibold">Custom Character Certificate</h3>
                                <button
                                    onClick={closeCustomDialog}
                                    className="text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    <FiX size={20} />
                                </button>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Select CC Template</label>
                                <select
                                    className={`w-full rounded-lg px-3 py-2 appearance-none border transition-colors duration-300 ${themeClasses.input}`}
                                    value={selectedCCReference}
                                    onChange={(e) => setSelectedCCReference(e.target.value)}
                                >
                                    <option value="">Select CC Template</option>
                                    {fetchedFields
                                        .filter((doc) => doc.documentName === "CC")
                                        .map((reference, index) => (
                                            <option
                                                key={index}
                                                value={reference.referenceNo + "." + reference.documentType}
                                            >
                                                {reference.referenceNo + "." + reference.documentType}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            <div className="w-full mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {[
                                    { label: "Name of the Student", field: "name" },
                                    { label: "Father's Name/Guardian's Name", field: "fatherName" },
                                    { label: "Class in which the Student last studied", field: "lastClass" },
                                ].map(({ label, field }, index) => (
                                    <div key={index} className="mb-3">
                                        <label className="block text-sm font-medium mb-1">{label}</label>
                                        <input
                                            type="text"
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleInputChange}
                                            className={`w-full border px-3 py-2 rounded-lg transition-colors duration-300 ${themeClasses.input}`}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end space-x-3 mt-4">
                                <button
                                    onClick={closeCustomDialog}
                                    className={`px-4 py-2 rounded-lg ${themeClasses.button.secondary}`}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleSubmit('CC', selectedCCReference)}
                                    disabled={!selectedCCReference || downloadLoading}
                                    className={`flex items-center px-4 py-2 rounded-lg ${!selectedCCReference || downloadLoading
                                        ? themeClasses.button.disabled
                                        : themeClasses.button.primary
                                        }`}
                                >
                                    {downloadLoading ? (
                                        <FiRefreshCw className="animate-spin mr-2" />
                                    ) : (
                                        <FiDownload className="mr-2" />
                                    )}
                                    Download
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Custom TC Dialog */}
            <AnimatePresence>
                {customTCDialogOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div
                            className={`absolute inset-0 ${themeClasses.dialog.overlay}`}
                            onClick={closeCustomDialog}
                        ></div>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className={`relative rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-5xl transition-colors duration-300 max-h-[90vh] overflow-y-auto ${themeClasses.dialog.container}`}
                        >
                            <div className="flex justify-between items-center mb-4 pb-2 border-b transition-colors duration-300">
                                <h3 className="text-lg font-semibold text-blue-500">Custom Transfer Certificate</h3>
                                <button
                                    onClick={closeCustomDialog}
                                    className="text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    <FiX size={20} />
                                </button>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Select TC Template</label>
                                <select
                                    className={`w-full rounded-lg px-3 py-2 appearance-none border transition-colors duration-300 ${themeClasses.input}`}
                                    value={selectedTCReference}
                                    onChange={(e) => setSelectedTCReference(e.target.value)}
                                >
                                    <option value="">Select TC Template</option>
                                    {fetchedFields
                                        .filter((doc) => doc.documentName === "TC")
                                        .map((reference, index) => (
                                            <option
                                                key={index}
                                                value={reference.referenceNo + "." + reference.documentType}
                                            >
                                                {reference.referenceNo + "." + reference.documentType}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            <div className="w-full mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {[
                                    { label: "Name of the Student", field: "name" },
                                    { label: "Mother's Name", field: "motherName" },
                                    { label: "Father's Name/Guardian's Name", field: "fatherName" },
                                    { label: "Date of Birth", field: "dob" },
                                    { label: "Nationality", field: "nationality" },
                                    { label: "Category (SC, ST, OBC, GEN, EWS)", field: "category" },
                                    { label: "Date of first Admission", field: "firstAdmissionDate" },
                                    { label: "Class in which the Student last studied", field: "lastClass" },
                                    { label: "School/ Board Annual Examination last taken with results", field: "examResult" },
                                    { label: "Main Subjects", field: "subjects" },
                                    { label: "Whether qualified for promotion", field: "promotionStatus" },
                                    { label: "Last Fee Submitted Date", field: "paidTillMonth" },
                                    { label: "Total Working Days", field: "workingDays" },
                                    { label: "Total Days Present", field: "presentDays" },
                                    { label: "Extra Co-curricular Activities", field: "activities" },
                                    { label: "General Conduct", field: "conduct" },
                                    { label: "Date of Application", field: "applicationDate" },
                                    { label: "Date of Issue", field: "issueDate" },
                                    { label: "Reason for Leaving", field: "reasonForLeaving" },
                                    { label: "Remarks", field: "remark" },
                                ].map(({ label, field }, index) => (
                                    <div key={index} className="mb-3">
                                        <label className="block text-sm font-medium mb-1">{label}</label>
                                        <input
                                            type="text"
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleInputChange}
                                            className={`w-full border px-3 py-2 rounded-lg transition-colors duration-300 ${themeClasses.input}`}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    onClick={closeCustomDialog}
                                    className={`px-4 py-2 rounded-lg ${themeClasses.button.secondary}`}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleSubmit('TC', selectedTCReference)}
                                    disabled={!selectedTCReference || downloadLoading}
                                    className={`flex items-center px-4 py-2 rounded-lg ${!selectedTCReference || downloadLoading
                                        ? themeClasses.button.disabled
                                        : themeClasses.button.primary
                                        }`}
                                >
                                    {downloadLoading ? (
                                        <FiRefreshCw className="animate-spin mr-2" />
                                    ) : (
                                        <FiDownload className="mr-2" />
                                    )}
                                    Download
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toast Container for Notifications */}
            <ToastContainer
                position="bottom-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={darkMode ? "dark" : "light"}
            />
        </motion.div>
    );
};

export default Certificates;