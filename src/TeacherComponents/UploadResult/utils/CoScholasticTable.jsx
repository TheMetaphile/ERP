import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";
import { toast } from "react-toastify";
import { BASE_URL } from '../../../Config';
import { motion } from "framer-motion";
import { FaSave, FaGraduationCap, FaUserGraduate, FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BookOpen, Calendar, Info, User } from "react-feather";

export default function CoScholasticTable({
    students,
    subject,
    term,
    Class,
    section,
    darkMode
}) {
    const { authState } = useContext(AuthContext);
    const currentSubject = authState?.Co_scholastic.find(subj => subj.subject === subject);

    const [grades, setGrades] = useState(() => {
        const initialGrades = {};
        students.forEach(student => {
            initialGrades[student.email] = currentSubject ? '' : '-';
        });
        return initialGrades;
    });

    const [errors, setErrors] = useState({});
    const [clickedIndex, setClickedIndex] = useState(null);

    useEffect(() => {
        if (currentSubject) {
            fetchLastUpload();
        }
    }, [Class, section, term, currentSubject]);

    const fetchLastUpload = async () => {
        try {
            if (!Class || !section || !term || !currentSubject) {
                toast.warning("Please apply all filters!");
                return;
            }
            const response = await axios.get(
                `${BASE_URL}/result/fetch/Coscholastic/${Class}/${section}/${term}?subject=${subject}`,
                {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`
                    }
                }
            );

            const fetchedGrades = response.data;
            const updatedGrades = { ...grades };
            Object.keys(fetchedGrades).forEach(studentEmail => {
                if (fetchedGrades[studentEmail][subject]) {
                    updatedGrades[studentEmail] = fetchedGrades[studentEmail][subject];
                }
            });

            setGrades(updatedGrades);

        } catch (error) {
            toast.error('Error fetching last result data');
            console.error('Error fetching last result data:', error);
        }
    };

    const handleClick = (index) => {
        setClickedIndex(index);
    };

    const handleGradeChange = (studentEmail, value) => {
        setGrades(prevGrades => ({
            ...prevGrades,
            [studentEmail]: value,
        }));
        setErrors(prevErrors => ({
            ...prevErrors,
            [studentEmail]: '',
        }));
    };

    const handleSave = async (studentEmail) => {
        const grade = grades[studentEmail];
        console.log(grade, studentEmail)
        const errorsObj = {};

        if (!grade) {
            errorsObj[subject] = 'Grade is required';
        } else if (!/^[A-F]$/.test(grade)) {
            errorsObj[subject] = 'Invalid grade. Use A-F';
        }

        if (Object.keys(errorsObj).length > 0) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [studentEmail]: errorsObj,
            }));
            return;
        }

        await handleSubmit(grade, studentEmail);
    };

    const handleSubmit = async (grade, email) => {
        if (!email || !Class) return;
        const resultData = {
            email,
            class: Class,
            result: [{
                subject,
                grade
            }],
            term: `${term}_Co_scholastic`,
        };
        console.log(resultData)
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

    if (!currentSubject) {
        return (
            <div className=" mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-blue-100">
                <div className="p-5">
                    <div className="flex items-start mb-4">
                        <div className="bg-blue-100 rounded-full p-3 mr-4">
                            <BookOpen className="text-blue-600" size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-lg mb-1">No Co-Scholastic Subjects Assigned</h3>
                            <p className="text-gray-600">You currently do not have any co-scholastic subjects assigned to your teaching schedule.</p>
                        </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                        <div className="flex items-center text-blue-700 mb-2">
                            <Info size={16} className="mr-2" />
                            <span className="font-medium">What are co-scholastic subjects?</span>
                        </div>
                        <p className="text-sm text-gray-600">Co-scholastic subjects include areas like art, music, physical education, and other subjects that complement the main academic curriculum.</p>
                    </div>

                    <div className="space-y-3 mb-4">
                        <div className="flex items-center text-gray-700">
                            <Calendar className="mr-3 text-blue-600" size={18} />
                            <span>Please check back later for updates.</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <User className="mr-3 text-blue-600" size={18} />
                            <span>Contact the academic coordinator if you have any questions.</span>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

    return (
        <motion.div
            className={`w-full overflow-x-auto rounded-lg shadow-lg ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <table className={`min-w-full whitespace-nowrap border rounded-lg ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
                <thead>
                    <tr className={`${darkMode ? 'bg-gradient-to-r from-blue-900 to-blue-700' : 'bg-gradient-to-r from-blue-500 to-blue-500'} text-white text-lg leading-normal`}>
                        <th className={`py-3 px-6 text-center rounded-tl-lg`}>
                            <FaUserGraduate className="inline mr-2" />Roll No.
                        </th>
                        <th className="py-3 px-6 text-center">
                            <FaGraduationCap className="inline mr-2" />Name
                        </th>
                        <th className="py-3 px-6 text-center">
                            <FaBook className="inline mr-2" />{subject}
                        </th>
                        <th className="py-3 px-6 text-center rounded-tr-lg">Action</th>
                    </tr>
                </thead>
                <tbody className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-md font-normal`}>
                    {students.map((Student, index) => (
                        <motion.tr
                            key={index}
                            className={`border-b transition-colors duration-200 ${clickedIndex === index ? (darkMode ? 'bg-blue-900' : 'bg-blue-100') : ''}`}
                            onClick={() => handleClick(index)}
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <td className="py-3 px-6 text-center">{Student.rollNumber}</td>
                            <td className="py-3 px-6 text-center whitespace-nowrap gap-2">
                                <Link to={`/Teacher-Dashboard/uploadResult/details/${Student.email}`} className="flex items-center">
                                    <img
                                        src={Student.profileLink}
                                        alt=""
                                        className={`h-10 w-10 rounded-full border ${darkMode ? 'border-gray-600' : 'border-blue-200'}`}
                                    />
                                    {Student.name}
                                </Link>
                            </td>
                            <td className="py-3 px-6 text-center">
                                <motion.input
                                    type="text"
                                    value={grades[Student.email]}
                                    onChange={(e) => handleGradeChange(Student.email, e.target.value)}
                                    className={`border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300 bg-white'}`}
                                    placeholder="Grade"
                                    whileHover={{ scale: 1.05 }}
                                    whileFocus={{ scale: 1.05 }}
                                />
                                {errors[Student.email] && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors[Student.email]}
                                    </p>
                                )}
                            </td>
                            <td className="py-3 px-6 flex justify-center items-center">
                                <motion.button
                                    type="button"
                                    onClick={() => handleSave(Student.email)}
                                    className={`rounded-md px-4 py-2 flex items-center hover:opacity-90 transition-colors duration-200 ${darkMode ? 'bg-green-700 text-white' : 'bg-green-500 text-white'}`}
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
        </motion.div>
    );
}