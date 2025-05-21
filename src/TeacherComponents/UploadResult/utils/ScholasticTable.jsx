import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from '../../../Config';
import AuthContext from "../../../Context/AuthContext";
import { motion } from "framer-motion";
import { FaSave, FaUserGraduate, FaBook, FaPencilAlt, FaFlask, FaClipboardCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Briefcase, Calendar, Info, User } from 'react-feather';

export default function ScholasticTable({
    students,
    term,
    Class,
    subject,
    section,
    darkMode
}) {
    const { authState } = useContext(AuthContext);
    const [totalTheoryMarks, setTotalMarks] = useState({
        noteBook: "",
        subjectEnrichment: "",
        theory: ""
    });
    const [marks, setMarks] = useState(students.reduce((acc, student) => {
        acc[student.email] = {
            noteBook: '',
            subjectEnrichment: '',
            practical: '',
            lastNoteBookChecked: ''
        };
        return acc;
    }, {}));
    const [clickedIndex, setClickedIndex] = useState(null);

    const handleClick = (index) => {
        setClickedIndex(index);
    };

    useEffect(() => {
        if (subject && term) {
            fetchLastUpload();
        }
    }, [subject, term]);

    const fetchLastUpload = async () => {
        try {
            if (!subject || !Class || !section || !term) {
                toast.warning("Please apply all filters!");
                return;
            }

            const response = await axios.get(
                `${BASE_URL}/result/fetch/scholastic/${Class}/${section}/${subject}/${term}`,
                {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`
                    }
                }
            );

            const updatedMarks = { ...marks };

            Object.keys(response.data).forEach((email) => {
                const studentResult = response.data[email];

                if (updatedMarks[email]) {
                    updatedMarks[email] = {
                        ...updatedMarks[email],
                        noteBook: studentResult.obtainedNoteBookMarks || '',
                        subjectEnrichment: studentResult.obtainedSubjectEnrichmentMarks || '',
                        theory: studentResult.marksObtained || '',
                        lastNoteBookChecked: studentResult.totalNoteBookMarks || '',
                    };
                }
            });

            setMarks(updatedMarks);
        } catch (error) {
            toast.error('Error fetching last result data');
            console.error('Error fetching last result data:', error);
        }
    };

    const handleInputChange = (email, type, value) => {
        setMarks(prevMarks => ({
            ...prevMarks,
            [email]: {
                ...prevMarks[email],
                [type]: value
            }
        }));
    };

    const handletotalMarksChange = (type, value) => {
        setTotalMarks(prevMarks => ({
            ...prevMarks,
            [type]: value
        }));
    };

    const handleSave = async (email) => {
        if (!term || !Class || !subject) {
            toast.error("Term, Class, or Subject is not selected");
            return;
        }
        const studentMarks = marks[email];
        const validationErrors = [];

        const fieldsToValidate = term === 'halfYearly' || term === 'final'
            ? ['noteBook', 'theory', 'subjectEnrichment']
            : ['theory'];

        fieldsToValidate.forEach(field => {
            const obtainedMarks = Number(studentMarks[field]);
            const totalMarks = Number(totalTheoryMarks[field]);
            if (obtainedMarks < 0 || obtainedMarks > totalMarks) {
                validationErrors.push(`Obtained ${field} marks should be between 0 and ${totalMarks}`);
            }
        });

        if (validationErrors.length > 0) {
            validationErrors.forEach(error => toast.error(error));
            return;
        }
        const schedules = term === 'halfYearly' || term === 'final'
            ? [{
                subject,
                marksObtained: Number(studentMarks.theory),
                totalMarks: Number(totalTheoryMarks.theory),
                totalNoteBookMarks: Number(totalTheoryMarks.noteBook),
                obtainedNoteBookMarks: Number(studentMarks.noteBook),
                totalSubjectEnrichmentMarks: Number(totalTheoryMarks.subjectEnrichment),
                obtainedSubjectEnrichmentMarks: Number(studentMarks.subjectEnrichment),
            }]
            : [{
                subject,
                marksObtained: Number(studentMarks.theory),
                totalMarks: Number(totalTheoryMarks.theory)
            }];
        const resultData = {
            email,
            class: Class,
            result: schedules,
            term: term,
        };
        try {
            const response = await axios.post(`${BASE_URL}/result/create`,
                resultData,
                {
                    headers: {
                        Authorization: `bearer ${authState?.accessToken}`
                    }
                }
            );
            if (response.status === 200) {
                toast.success('Result saved successfully!');
            }
        } catch (error) {
            toast.error(error.response?.data?.error || 'Error saving result');
            console.error('Error saving result:', error.response?.data?.error);
        }
    };

    if (Class) {

        const uniqueClasses = Array.from(new Set(
            authState?.subject ? authState?.subject
                .filter(subj => subj.class === Class)
                .map(subj => subj.section) : []
        ));

        if (!uniqueClasses || uniqueClasses.length < 1) {

            return (
                <div className=" mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-amber-100">


                    <div className="p-5">
                        <div className="flex items-start mb-4">
                            <div className="bg-amber-100 rounded-full p-3 mr-4">
                                <Briefcase className="text-amber-600" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 text-lg mb-1">No Subjects Assigned</h3>
                                <p className="text-gray-600">You currently do not have any subjects assigned to your teaching schedule.</p>
                            </div>
                        </div>

                        <div className="bg-amber-50 rounded-lg p-4 mb-4">
                            <div className="flex items-center text-amber-700 mb-2">
                                <Info size={16} className="mr-2" />
                                <span className="font-medium">What this means</span>
                            </div>
                            <p className="text-sm text-gray-600">This could be due to ongoing schedule preparation, recent staff changes, or administrative updates. Your teaching load will be updated once assignments are finalized.</p>
                        </div>

                        <div className="space-y-3 mb-4">
                            <div className="flex items-center text-gray-700">
                                <Calendar className="mr-3 text-amber-600" size={18} />
                                <span>Please check the portal regularly for updates.</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                                <User className="mr-3 text-amber-600" size={18} />
                                <span>Contact the department head or academic coordinator for more information.</span>
                            </div>
                        </div>

                    </div>
                </div>
            );
        };
    }
    return (
        <motion.div
            className={`w-full overflow-x-auto rounded-lg shadow-lg ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className={`flex gap-3 ml-2 overflow-auto p-4 rounded-t-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                {['theory', ...(term === 'halfYearly' || term === 'final' ? ['noteBook', 'subjectEnrichment'] : [])]
                    .map((field) => (
                        <motion.div key={field} className="flex flex-col mb-4" whileHover={{ scale: 1.05 }}>
                            <label className={`mb-2 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Total {field.charAt(0).toUpperCase() + field.slice(1)} Marks
                            </label>
                            <motion.input
                                type="number"
                                value={totalTheoryMarks[field]}
                                onChange={(e) => handletotalMarksChange(field, e.target.value)}
                                className={`border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode
                                    ? 'bg-gray-700 text-white border-gray-600'
                                    : 'bg-white text-black border-gray-300'
                                    }`}
                                placeholder={`Enter total ${field} marks`}
                                whileFocus={{ scale: 1.05 }}
                            />
                        </motion.div>
                    ))}
            </div>
            <div className="overflow-auto">
                <table className={`min-w-full whitespace-nowrap border rounded-lg text-center ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
                    <thead>
                        <tr className={`${darkMode
                            ? 'bg-gradient-to-r from-blue-900 to-blue-700'
                            : 'bg-gradient-to-r from-blue-500 to-blue-500'
                            } text-white`}>
                            {[
                                { icon: FaUserGraduate, text: 'Roll No.' },
                                { icon: FaUserGraduate, text: 'Name' },
                                { icon: FaBook, text: 'Last Note Book Checked' },
                                ...(['theory', ...(term === 'halfYearly' || term === 'final'
                                    ? ['noteBook', 'subjectEnrichment'] : [])].map(field => (
                                        { icon: FaClipboardCheck, text: `${field.charAt(0).toUpperCase() + field.slice(1)} Marks` }
                                    ))),
                                { text: 'Action' }
                            ].map((header, index) => (
                                <th
                                    key={index}
                                    className={`py-3 px-2 text-center ${index === 0 ? 'rounded-tl-lg' :
                                        index === 5 ? 'rounded-tr-lg' : ''
                                        }`}
                                >
                                    {header.icon && <header.icon className="inline mr-2" />}
                                    {header.text}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-md font-normal`}>
                        {students.map((student, index) => (
                            <motion.tr
                                key={index}
                                className={`border-b transition-colors duration-200 ${darkMode
                                    ? 'border-gray-700 hover:bg-gray-700'
                                    : 'border-gray-200 hover:bg-gray-100'
                                    } ${clickedIndex === index ? (darkMode ? 'bg-blue-900' : 'bg-blue-100') : ''}`}
                                onClick={() => handleClick(index)}
                                whileHover={{ scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <td className="py-3 px-2 text-center">{student.rollNumber}</td>
                                <Link to={`/Teacher-Dashboard/uploadResult/details/${student.email}`}>
                                    <td className="py-3 px-2 text-center flex gap-2 items-center">
                                        <img
                                            src={student.profileLink}
                                            alt=""
                                            className={`h-10 w-10 rounded-full border ${darkMode ? 'border-gray-600' : 'border-blue-200'}`}
                                        />
                                        {student.name}
                                    </td>
                                </Link>
                                <td className="py-3 px-2 text-center">
                                    {marks[student.email]?.lastNoteBookChecked?.topic || 'No data'}
                                </td>
                                {['theory', ...(term === 'halfYearly' || term === 'final' ? ['noteBook', 'subjectEnrichment'] : [])]
                                    .map((field) => (
                                        <td key={field} className="py-3 px-2 text-center">
                                            <motion.input
                                                type="number"
                                                value={marks[student.email]?.[field] || ''}
                                                onChange={(e) => handleInputChange(student.email, field, e.target.value)}
                                                className={`border rounded-md py-2 px-4 w-28 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${darkMode
                                                    ? 'bg-gray-700 text-white border-gray-600'
                                                    : 'border-gray-300 bg-white'
                                                    }`}
                                                placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} Marks`}
                                                whileHover={{ scale: 1.05 }}
                                                whileFocus={{ scale: 1.05 }}
                                            />
                                        </td>
                                    ))}
                                <td className="py-3 px-2 text-center">
                                    <motion.button
                                        type="button"
                                        onClick={() => handleSave(student.email)}
                                        className={`rounded-md px-4 py-2 flex items-center justify-center hover:opacity-90 transition-colors duration-200 ${darkMode
                                            ? 'bg-green-700 text-white'
                                            : 'bg-green-500 text-white'
                                            }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <FaSave className="mr-2" />
                                        Save
                                    </motion.button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}