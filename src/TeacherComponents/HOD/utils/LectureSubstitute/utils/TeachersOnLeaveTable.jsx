import { useContext, useEffect, useState } from "react";
import ClassTeacherOnLeaveRow from "./TeachersOnLeaveRow";
import axios from "axios";
import AuthContext from "../../../../../Context/AuthContext";
import { BASE_URL } from "../../../../../Config";
import { motion } from 'framer-motion';

export default function ClassTeacherOnLeaveTable() {
    const { authState, darkMode } = useContext(AuthContext);
    const [TeachersOnLeave, SetTeachersOnLeave] = useState([]);
    const date = new Date();
    var month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const formattedDate = `${date.getFullYear()}-${month}-${date.getDate()}`;
    const session = getCurrentSession();
    const fetchTeacherOnLeaveList = async () => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BASE_URL}/LectureSubstitute/fetch/checkLeave?date=${formattedDate}&session=${session}`,
            headers: {
                'Authorization': `Bearer ${authState?.accessToken}`
            }
        };

        await axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data.Teachers));
                if (!response.data.status) {
                    SetTeachersOnLeave(response.data.Teachers)
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }

    useEffect(() => {
        fetchTeacherOnLeaveList();
    }, [authState])

    const tableVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const rowVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12
            }
        }
    };

    return (
        <div className="rounded-lg overflow-auto pt-3">
            <motion.table
                className={`w-full border border-gray-300 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-600'}`}
                variants={tableVariants}
                initial="hidden"
                animate="visible"
            >
                <thead>
                    <tr className={`${darkMode ? 'bg-blue-900' : 'bg-gradient-to-r from-blue-400 to-blue-200'} text-lg`}>
                        <th className={`py-2 px-6 text-center ${darkMode ? 'text-white' : 'text-black'}`}>Lecture</th>
                        <th className={`py-2 px-6 text-center ${darkMode ? 'text-white' : 'text-black'}`}>Date</th>
                        <th className={`py-2 px-6 text-center ${darkMode ? 'text-white' : 'text-black'}`}>Class</th>
                        <th className={`py-2 px-6 text-center rounded-t w-60 ${darkMode ? 'text-white' : 'text-black'}`}>Name</th>
                        <th className={`py-2 px-6 text-center ${darkMode ? 'text-white' : 'text-black'}`}>Section</th>
                        <th className={`py-2 px-6 text-center ${darkMode ? 'text-white' : 'text-black'}`}>Subject</th>
                        <th className={`py-2 px-6 text-center w-60 ${darkMode ? 'text-white' : 'text-black'}`}>Substitute</th>
                        <th className={`py-2 px-6 text-center w-60 ${darkMode ? 'text-white' : 'text-black'}`}>Remark</th>
                        <th className={`py-2 px-6 text-center ${darkMode ? 'text-white' : 'text-black'}`}>Actions</th>
                    </tr>
                </thead>
                <motion.tbody className={`text-md font-normal min-h-10 max-h-screen overflow-x-auto overflow-y-auto ${darkMode ? 'bg-gray-700' : ''}`}>
                    {TeachersOnLeave.length === 0 ? (
                        <motion.tr variants={rowVariants}>
                            <td
                                colSpan="9"
                                className={`text-center py-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                            >
                                No Teacher is on leave today
                            </td>
                        </motion.tr>
                    ) : (
                        TeachersOnLeave.map((teachers, index) => (
                            <ClassTeacherOnLeaveRow
                                key={index}
                                Teacher={teachers}
                                date={formattedDate}
                                session={session}
                            />
                        ))
                    )}
                </motion.tbody>
            </motion.table>
        </div>
    )
}

function getCurrentSession() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    if (currentMonth >= 3) {
        return `${currentYear}-${(currentYear + 1).toString().slice(-2)}`;
    } else {
        return `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
    }
}