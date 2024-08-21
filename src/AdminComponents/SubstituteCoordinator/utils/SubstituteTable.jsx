import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";
import { BASE_URL_Login } from "../../../Config";
import CoOrdinatorOnLeaveRow from "./CoOrdinatorOnLeaveRow";
import { motion } from 'framer-motion';

export default function SubstituteTable() {
    const { authState } = useContext(AuthContext);
    const [CoOrdinatorsOnLeave, SetCoOrdinatorsOnLeave] = useState([]);
    const date = new Date();
    var month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const formattedDate = `${date.getFullYear()}-${month}-${date.getDate()}`;
    const session = getCurrentSession();

    const fetchCoOrdinatorOnLeaveList = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BASE_URL_Login}/CoordinatorSubstitute/fetch/checkLeave?date=${formattedDate}&session=${session}`,
            headers: {
                'Authorization': `Bearer ${authState.accessToken}`
            }
        };

        await axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data), "ouicxgvichohg");
                if (!response.data.status) {
                    console.log("Here");
                    SetCoOrdinatorsOnLeave(response.data.coordinatorsOnLeave)
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }

    useEffect(() => {
        fetchCoOrdinatorOnLeaveList();
    }, [authState])

    return (
        <motion.div
            className="w-full overflow-x-auto rounded-lg pt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead>
                    <motion.tr
                        className="bg-purple-300 text-lg"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <th className="py-2 px-6 text-center rounded-t-r whitespace-nowrap">
                            Employee Id
                        </th>
                        <th className="py-2 px-6">Name</th>
                        <th className="py-2 px-6 text-center">Date</th>
                        <th className="py-2 px-6 text-center">Wing</th>
                        <th className="py-2 px-6 text-center">Substitute</th>
                        <th className="py-2 px-6 text-center">Actions</th>
                    </motion.tr>
                </thead>
                <tbody className="text-gray-600 text-md font-normal">
                    {CoOrdinatorsOnLeave.length === 0 ? (
                        <motion.tr
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <td colSpan={6} className="text-center text-purple-400 py-4 font-medium">
                                No Coordinator is on leave
                            </td>
                        </motion.tr>
                    ) : (
                        <>
                            {CoOrdinatorsOnLeave.map((teachers, index) => (
                                <motion.tr
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                >
                                    <CoOrdinatorOnLeaveRow
                                        Teacher={teachers}
                                        index={index}
                                        date={formattedDate}
                                        session={session}
                                    />
                                </motion.tr>
                            ))}
                        </>
                    )}
                </tbody>
            </table>
        </motion.div>
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