import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL_Result } from '../../../Config';
import AuthContext from "../../../Context/AuthContext";
import { motion } from "framer-motion";
import { FaSave, FaUserGraduate, FaBook, FaPencilAlt, FaFlask, FaClipboardCheck } from "react-icons/fa";

export default function ScholasticTable({ students, term, Class, subject }) {
    const { authState } = useContext(AuthContext);
    const [totalTheoryMarks, setTotalMarks] = useState({
        noteBook: "",
        practical: "",
        subjectEnrichment: "",
        theory: ""
    });
    const [marks, setMarks] = useState(students.reduce((acc, student) => {
        acc[student.email] = {
            noteBook: '',
            subjectEnrichment: '',
            practical: '',
            theory: '',
            lastNoteBookChecked: ''
        };
        return acc;
    }, {}));
    const [clickedIndex, setClickedIndex] = useState(null);

    const handleClick = (index) => {
        setClickedIndex(index);
    };

    useEffect(() => {
        fetchLastNoteBookChecked();
    }, [subject]);

    const fetchLastNoteBookChecked = async () => {
        try {
            if (!subject) return;
            const responses = await Promise.all(
                students.map(student =>
                    axios.get(`${BASE_URL_Result}/notebook/fetch/student/last?subject=${subject}&email=${student.email}`, {
                        headers: {
                            Authorization: `bearer ${authState.accessToken}`
                        }
                    })
                )
            );
            const lastNoteBookCheckedData = responses.reduce((acc, response, index) => {
                acc[students[index].email] = response.data;
                return acc;
            }, {});
            setMarks(prevMarks => ({
                ...prevMarks,
                ...Object.keys(lastNoteBookCheckedData).reduce((acc, email) => {
                    acc[email] = {
                        ...prevMarks[email],
                        lastNoteBookChecked: lastNoteBookCheckedData[email].last ? lastNoteBookCheckedData[email].last[0] : ''
                    };
                    return acc;
                }, {})
            }));
        } catch (error) {
            toast.error('Error fetching last notebook checked data');
            console.error('Error fetching last notebook checked data:', error);
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
        ['noteBook', 'theory', 'practical', 'subjectEnrichment'].forEach(field => {
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
        const schedules = {
            subject,
            marksObtained: Number(studentMarks.theory),
            totalMarks: Number(totalTheoryMarks.theory),
            totalPracticalMarks: Number(totalTheoryMarks.practical),
            obtainedPracticalMarks: Number(studentMarks.practical),
            totalNoteBookMarks: Number(totalTheoryMarks.noteBook),
            obtainedNoteBookMarks: Number(studentMarks.noteBook),
            totalSubjectEnrichmentMarks: Number(totalTheoryMarks.subjectEnrichment),
            obtainedSubjectEnrichmentMarks: Number(studentMarks.subjectEnrichment),
        };
        const resultData = {
            email,
            class: Class,
            result: schedules,
            term: term,
        };
        try {
            const response = await axios.put(`${BASE_URL_Result}/result/update/addSubject`,
                resultData,
                {
                    headers: {
                        Authorization: `bearer ${authState.accessToken}`
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

    return (
        <motion.div
            className="w-full overflow-x-auto rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex gap-3 ml-2 overflow-auto p-4 bg-gray-100 rounded-t-lg">
                {['theory', 'subjectEnrichment', 'noteBook', 'practical'].map((field) => (
                    <motion.div key={field} className="flex flex-col mb-4" whileHover={{ scale: 1.05 }}>
                        <label className="mb-2 text-gray-700 font-semibold">
                            Total {field.charAt(0).toUpperCase() + field.slice(1)} Marks
                        </label>
                        <motion.input
                            type="number"
                            value={totalTheoryMarks[field]}
                            onChange={(e) => handletotalMarksChange(field, e.target.value)}
                            className="border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={`Enter total ${field} marks`}
                            whileFocus={{ scale: 1.05 }}
                        />
                    </motion.div>
                ))}
            </div>
            <div className="overflow-auto">
                <table className="min-w-full whitespace-nowrap bg-white border border-gray-300 rounded-lg text-center">
                    <thead>
                        <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white ">
                            <th className="py-3 px-2 text-center  rounded-tl-lg"><FaUserGraduate className="inline mr-2" />Roll No.</th>
                            <th className="py-3 px-2 text-center "><FaUserGraduate className="inline mr-2" />Name</th>
                            <th className="py-3 px-2 text-center "><FaBook className="inline mr-2" />Last Note Book Checked</th>
                            <th className="py-3 px-2 text-center "><FaBook className="inline mr-2" />Note Book</th>
                            <th className="py-3 px-2 text-center "><FaPencilAlt className="inline mr-2" />Subject Enrichment</th>
                            <th className="py-3 px-2 text-center "><FaFlask className="inline mr-2" />Practical Marks</th>
                            <th className="py-3 px-2 text-center "><FaClipboardCheck className="inline mr-2" />Theory Marks</th>
                            <th className="py-3 px-2 text-center  rounded-tr-lg">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-md font-normal ">
                        {students.map((student, index) => (
                            <motion.tr
                                key={index}
                                className={`border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200 ${clickedIndex === index ? 'bg-blue-100' : ''}`}
                                onClick={() => handleClick(index)}
                                whileHover={{ scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <td className="py-3 px-2 text-center ">

                                    {student.rollNumber}</td>
                                <td className="py-3 px-2 text-center flex gap-2 items-center">
                                    <img src={student.profileLink} alt="" className="h-10 w-10 rounded-full" />
                                    {student.name}</td>
                                <td className="py-3 px-2 text-center ">
                                    {marks[student.email]?.lastNoteBookChecked?.topic || 'No data'}
                                </td>
                                {['noteBook', 'subjectEnrichment', 'practical', 'theory'].map((field) => (
                                    <td key={field} className="py-3 px-2 text-center ">
                                        <motion.input
                                            type="number"
                                            value={marks[student.email]?.[field] || ''}
                                            onChange={(e) => handleInputChange(student.email, field, e.target.value)}
                                            className="border rounded-md py-2 px-4 w-28 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                            placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} Marks`}
                                            whileHover={{ scale: 1.05 }}
                                            whileFocus={{ scale: 1.05 }}
                                        />
                                    </td>
                                ))}
                                <td className="py-3 px-2 text-center ">
                                    <motion.button
                                        type="button"
                                        onClick={() => handleSave(student.email)}
                                        className="bg-green-500 text-white rounded-md px-4 py-2 flex items-center justify-center hover:bg-green-600 transition-colors duration-200"
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