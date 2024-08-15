import { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";
import { toast } from "react-toastify";
import { BASE_URL_Result } from '../../../Config';

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
        console.log(`${term}_Co_scholastic`);
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

        // Validation rules
        Subjects.forEach(subject => {
            const grade = studentGrades[subject.subject];
            if (!grade) {
                newErrors[subject.subject] = 'Grade is required';
            } else if (!/^[A-F]$/.test(grade)) { // Example pattern: only letters A-F are valid grades
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

        console.log('Submitted grades for student:', studentEmail, studentGrades);
        await handleSubmit(studentGrades, studentEmail);
    };

    const handleSubmit = async (studentGrades, email) => {
        const schedules = Object.keys(studentGrades).map(subject => ({
            subject,
            grade: studentGrades[subject]
        }));

        if(!email || !Class  ) return;
        const resultData = {
            email,
            class: Class,
            result: schedules,
            term: `${term}_Co_scholastic`,
        };
        console.log(resultData, authState);

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
        <div className="w-full overflow-x-auto rounded-lg">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead>
                    <tr className="bg-secondary text-gray-600 text-lg leading-normal">
                        <th className="py-2 px-6 text-center rounded-t-r whitespace-nowrap">Roll No.</th>
                        <th className="py-2 px-6 text-center">Name</th>
                        {Subjects.map((Subject, index) => (
                            <th key={index} className="py-2 px-6 text-center">{Subject.subject}</th>
                        ))}
                        <th className="py-2 px-6 text-center rounded-t-l">Action</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-md font-normal">
                    {students.map((Student, index) => (
                        <tr key={index} className={`border-b border-gray-200 last:border-none ${clickedIndex === index ? 'bg-secondary' : ''}`} onClick={() => handleClick(index)}>
                            <td className="py-2 px-6 text-center rounded-t-r">{Student.rollNumber}</td>
                            <td className="py-2 px-6 text-center whitespace-nowrap">{Student.name}</td>
                            {Subjects.map((Subject, subIndex) => (
                                <td key={subIndex} className="py-2 px-6 text-center">
                                    <input
                                        type="text"
                                        value={grades[Student.email][Subject.subject]}
                                        onChange={(e) => handleGradeChange(Student.email, Subject.subject, e.target.value)}
                                        className="border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Grade"
                                    />
                                    {errors[Student.email] && errors[Student.email][Subject.subject] && (
                                        <p className="text-red-500 text-sm">{errors[Student.email][Subject.subject]}</p>
                                    )}
                                </td>
                            ))}
                            <td className="py-2 px-6 flex justify-center items-center">
                                <button
                                    type="button"
                                    onClick={() => handleSave(Student.email)}
                                    className="text-green-600 rounded-md border border-green-500 w-fit px-4 hover:bg-green-500 hover:text-white hover:cursor-pointer hover:shadow-md hover:border-black"
                                >
                                    Save
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
