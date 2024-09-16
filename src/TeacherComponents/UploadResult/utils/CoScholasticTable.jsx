import { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";
import { toast } from "react-toastify";
import { BASE_URL_Result } from '../../../Config';
import { motion } from "framer-motion";
import { FaSave, FaGraduationCap, FaUserGraduate, FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CoScholasticTable({ students, term, Class }) {
    const { authState } = useContext(AuthContext);
    const [Subjects] = useState(authState.Co_scholastic === undefined ? [] : authState.Co_scholastic);
    const [grades, setGrades] = useState(() => {
        const initialGrades = {};
        students.forEach(student => {
            initialGrades[student.email] = {};
            Subjects.forEach(subject => {
                initialGrades[student.email][subject.subject] = '';
            });
        });
        return initialGrades;
    });
    const [errors, setErrors] = useState({});
    const [clickedIndex, setClickedIndex] = useState(null);

    const handleClick = (index) => {
        setClickedIndex(index);
    };

    const handleGradeChange = (studentEmail, subject, value) => {
        setGrades(prevGrades => ({
            ...prevGrades,
            [studentEmail]: {
                ...prevGrades[studentEmail],
                [subject]: value,
            },
        }));
        setErrors(prevErrors => ({
            ...prevErrors,
            [studentEmail]: {
                ...prevErrors[studentEmail],
                [subject]: '',
            },
        }));
    };

    const handleSave = async (studentEmail) => {
        const studentGrades = grades[studentEmail];
        const newErrors = {};
        Subjects.forEach(subject => {
            const grade = studentGrades[subject.subject];
            if (!grade) {
                newErrors[subject.subject] = 'Grade is required';
            } else if (!/^[A-F]$/.test(grade)) {
                newErrors[subject.subject] = 'Invalid grade. Use A-F';
            }
        });
        if (Object.keys(newErrors).length > 0) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [studentEmail]: newErrors,
            }));
            return;
        }
        await handleSubmit(studentGrades, studentEmail);
    };

    const handleSubmit = async (studentGrades, email) => {
        const schedules = Object.keys(studentGrades).map(subject => ({
            subject,
            grade: studentGrades[subject]
        }));
        if (!email || !Class) return;
        const resultData = {
            email,
            class: Class,
            result: schedules,
            term: `${term}_Co_scholastic`,
        };
        try {
            const response = await axios.post(`${BASE_URL_Result}/result/create`,
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
            <table className="min-w-full whitespace-nowrap bg-white border border-gray-300 rounded-lg">
                <thead>
                    <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg leading-normal">
                        <th className="py-3 px-6 text-center rounded-tl-lg"><FaUserGraduate className="inline mr-2" />Roll No.</th>
                        <th className="py-3 px-6 text-center"><FaGraduationCap className="inline mr-2" />Name</th>
                        {Subjects.map((Subject, index) => (
                            <th key={index} className="py-3 px-6 text-center"><FaBook className="inline mr-2" />{Subject.subject}</th>
                        ))}
                        <th className="py-3 px-6 text-center rounded-tr-lg">Action</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-md font-normal">
                    {students.map((Student, index) => (
                        <motion.tr
                            key={index}
                            className={`border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200 ${clickedIndex === index ? 'bg-blue-100' : ''}`}
                            onClick={() => handleClick(index)}
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <td className="py-3 px-6 text-center">{Student.rollNumber}</td>
                            <Link to={`/Teacher-Dashboard/uploadResult/details/${Student.email}`}>
                                <td className="py-3 px-6 text-center whitespace-nowrap">{Student.name}</td>
                            </Link>
                            {Subjects.map((Subject, subIndex) => (
                                <td key={subIndex} className="py-3 px-6 text-center">
                                    <motion.input
                                        type="text"
                                        value={grades[Student.email][Subject.subject]}
                                        onChange={(e) => handleGradeChange(Student.email, Subject.subject, e.target.value)}
                                        className="border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                        placeholder="Grade"
                                        whileHover={{ scale: 1.05 }}
                                        whileFocus={{ scale: 1.05 }}
                                    />
                                    {errors[Student.email] && errors[Student.email][Subject.subject] && (
                                        <p className="text-red-500 text-sm mt-1">{errors[Student.email][Subject.subject]}</p>
                                    )}
                                </td>
                            ))}
                            <td className="py-3 px-6 flex justify-center items-center">
                                <motion.button
                                    type="button"
                                    onClick={() => handleSave(Student.email)}
                                    className="bg-green-500 text-white rounded-md px-4 py-2 flex items-center hover:bg-green-600 transition-colors duration-200"
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