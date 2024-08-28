import React, { useEffect, useState, useContext } from 'react';
import { BASE_URL_Login } from './../../../Config';
import axios from 'axios';
import AuthContext from './../../../Context/AuthContext';
import Loading from '../../../LoadingScreen/Loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CurrentWeekAdminRow from './CurrentWeekAdminRow';
import { motion } from "framer-motion";

const CurrentWeekAdmin = ({ selectedTab, Class, section, subject }) => {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const [error, setError] = useState(null);

    const getCurrentSession = () => {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();
        return currentMonth >= 3 ? `${currentYear}-${(currentYear + 1).toString().slice(-2)}` : `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
    };

    const session = getCurrentSession();
    const currentDate = new Date();
    const currentWeekStart = new Date(currentDate);  // Create a new Date object to avoid modifying the original
    currentWeekStart.setDate(currentDate.getDate() - currentDate.getDay() + 1);  // Adjust to Monday (start of the week)

    const currentWeekFormattedDate = `${currentWeekStart.getFullYear()}-${ currentWeekStart.getMonth() <10 ? `0${currentWeekStart.getMonth()+1}` : currentWeekStart.getMonth()+1}-${currentWeekStart.getDate()}`;


    
    console.log(selectedTab)
    useEffect(() => {
        console.log(currentWeekFormattedDate)
        const fetchPlan = async () => {

            try {
                const response = await axios.get(`${BASE_URL_Login}/lessonPlan/fetch/admin?class=${Class}&section=${section}&subject=${subject}&session=${session}&startingDate=${currentWeekFormattedDate}`, {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                });
                console.log("API response:", response.data);
                setDetails(response.data.plan);
                setLoading(false);
            } catch (err) {
                console.log(err.response.data.error);
                setError(err.response.data.error);
                setLoading(false);
            }
        };
        if (Class && section && subject) {
            setLoading(true);
            setDetails([]);
            fetchPlan();
        }
    }, [Class, section, subject, currentWeekFormattedDate]);




    return (

        <motion.div
            className="rounded-md overflow-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {loading ? (
                <Loading />
            ) : details.length === 0 && selectedTab === "Current Week" ? (
                <div className="text-purple-500 font-bold text-xl text-center mt-3">No Data Available</div>
            ) : (
                <motion.table
                    className="w-full rounded-md border border-purple-500"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <thead className="bg-purple-500 border-b border-purple-500">
                        <tr className="p-4 text-center">
                            <th className="border-y border-purple-500 py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal gap-2 font-semibold text-white">
                                Date
                            </th>
                            <th className="border-y border-purple-500 py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal gap-2 whitespace-nowrap font-semibold text-white">
                                Chapter
                            </th>
                            <th className="border-y border-purple-500 py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal gap-2 whitespace-nowrap font-semibold text-white">
                                Topic
                            </th>
                            <th className="border-y border-purple-500 py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal gap-2 whitespace-nowrap font-semibold text-white">
                                Teaching Aids
                            </th>
                            <th className="border-y border-purple-500 py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal gap-2 whitespace-nowrap font-semibold text-white">
                                Activity (if any)
                            </th>
                            <th className="border-y border-purple-500 py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal gap-2 whitespace-nowrap font-semibold text-white">
                                Progress
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {details.map((data, index) => (

                            <CurrentWeekAdminRow details={data} index={index} />

                        ))}
                    </tbody>
                </motion.table>
            )}
        </motion.div>
    );
};

export default CurrentWeekAdmin;
