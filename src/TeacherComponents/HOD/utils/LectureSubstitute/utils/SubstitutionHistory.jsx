import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../../../../Context/AuthContext";
import { BASE_URL_Login } from "../../../../../Config";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from 'framer-motion';

export default function ClassTeacherSubstitutionHistory() {
    const { authState } = useContext(AuthContext);
    const [PrevioursSubstitutions, SetPrevioursSubstitutions] = useState([]);
    const [start, setStart] = useState(0);
    const end = 4;
    const [allDataFetched, setAllDataFetched] = useState(false);

    const date = new Date();
    var month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const formattedDate = `${date.getFullYear()}-${month}-${date.getDate()}`;
    const session = getCurrentSession();
    const fetchTeacherOnLeaveList = async () => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BASE_URL_Login}/LectureSubstitute/fetch/completeHistory?date=${formattedDate}&start=${start}&end=${end}&session=${session}`,
            headers: {
                'Authorization': `Bearer ${authState.accessToken}`
            }
        };

        await axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data, "......................................"));

                const data = response.data.history.length;
                if (data < end) {
                    toast.success('All data fetched');
                    console.log('All data fetched')
                    setAllDataFetched(true);
                }
                SetPrevioursSubstitutions(prevData => [...prevData, ...response.data.history]);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    useEffect(() => {
        fetchTeacherOnLeaveList();
    }, [authState])

    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

    useEffect(() => {
        if (start !== 0) {
            fetchTeacherOnLeaveList();
        }
    }, [start]);

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
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
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
                className="min-w-fit bg-white border border-gray-300 rounded-lg"
                variants={tableVariants}
                initial="hidden"
                animate="visible"
            >
                <thead>
                    <tr className="bg-gradient-to-r from-blue-400 to-blue-200 text-lg">
                        <th className="py-2 px-6 text-center">Lecture</th>
                        <th className="py-2 px-6 text-center">Date</th>
                        <th className="py-2 px-6 text-center">Class</th>
                        <th className="py-2 px-6 text-center rounded-t-r whitespace-nowrap">Employee Id</th>
                        <th className="py-2 px-6 w-64">Name</th>
                        <th className="py-2 px-6 text-center">Section</th>
                        <th className="py-2 px-6 text-center">Subject</th>
                        <th className="py-2 px-6 text-center w-72">Substitute</th>
                    </tr>
                </thead>
                <AnimatePresence>
                    <motion.tbody className="text-gray-600 text-md font-normal min-h-10 max-h-screen overflow-x-auto overflow-y-auto">
                        {PrevioursSubstitutions.length === 0 ? (
                            <motion.tr variants={rowVariants}>
                                <td colSpan="8" className="text-center py-4">
                                    Teacher leave history not available
                                </td>
                            </motion.tr>
                        ) : (
                            <>
                                {PrevioursSubstitutions.map((teachers, index) => (
                                    <motion.tr
                                        key={index}
                                        className="border-b border-gray-200 last:border-none"
                                        variants={rowVariants}
                                    >
                                        <td className="py-3 px-6 text-center whitespace-nowrap">{teachers.Lecture}</td>
                                        <td className="py-3 px-6 text-center whitespace-nowrap">{teachers.date}</td>
                                        <td className="py-3 px-6 text-center whitespace-nowrap">{teachers.class}</td>
                                        <td className="py-3 px-6 text-center whitespace-nowrap">{teachers.classTeacherDetails.employeeId}</td>
                                        <td className="flex py-3 px-6 justify-start items-center gap-2 whitespace-nowrap w-64">
                                            <img src={teachers.classTeacherDetails.profileLink} alt="img" className="rounded-full h-12 w-12" />
                                            {teachers.classTeacherDetails.name}
                                        </td>
                                        <td className="py-3 px-6 text-center whitespace-nowrap">{teachers.section}</td>
                                        <td className="py-3 px-6 text-center whitespace-nowrap">{teachers.subject}</td>
                                        <td className="py-3 px-6">
                                            <div className="flex justify-start gap-2 items-center w-72">
                                                <img src={teachers.substituteTeacherDetails.profileLink} alt="img" className="rounded-full h-12 w-12" />
                                                <div className="text-start">
                                                    <p>{teachers.substituteTeacherDetails.name}</p>
                                                    {teachers.substituteTeacherDetails.employeeId}
                                                </div>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </>
                        )}
                    </motion.tbody>
                </AnimatePresence>
            </motion.table>
            {!allDataFetched && (
                <motion.h1
                    className='text-blue-500 hover:text-blue-800 mt-3 cursor-pointer text-center'
                    onClick={handleViewMore}

                >
                    View More
                </motion.h1>
            )}
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