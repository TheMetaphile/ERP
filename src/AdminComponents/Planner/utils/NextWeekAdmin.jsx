import React, { useEffect, useState, useContext } from 'react';
import { BASE_URL_Login } from './../../../Config';
import axios from 'axios';
import AuthContext from './../../../Context/AuthContext';
import Loading from './../../../LoadingScreen/Loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NextWeekAdminRow from './NextWeekAdminRow';
import { motion } from "framer-motion";

const NextWeekAdmin = ({ selectedTab, Class, section, subject }) => {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [remark, setRemark] = useState('');
    const [id, setId] = useState('');
    const [status, setStatus] = useState('');

    const getCurrentSession = () => {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();
        return currentMonth >= 3 ? `${currentYear}-${(currentYear + 1).toString().slice(-2)}` : `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
    };

    const defaultPlan = () => {
        return Array.from({ length: 6 }, (_, i) => {
            const date = new Date(nextWeekStart);
            date.setDate(nextWeekStart.getDate() + i);
            return { date: date.toISOString().split('T')[0], teachingAids: '', chapter: '', topic: '', Activity: '' };
        })
    }


    const session = getCurrentSession();
    const currentDate = new Date();
    const currentWeekStart = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 2));
    const nextWeekStart = new Date();
    nextWeekStart.setDate(currentWeekStart.getDate() + 7);


    const nextWeekFormattedDate = `${nextWeekStart.getFullYear()}-${ nextWeekStart.getMonth() <10 ? `0${nextWeekStart.getMonth()+1}` : nextWeekStart.getMonth()+1}-${nextWeekStart.getDate()}`;

    const [details, setDetails] = useState(defaultPlan());

    console.log(selectedTab)
    useEffect(() => {
        console.log(nextWeekFormattedDate)
        const fetchPlan = async () => {

            try {
                const response = await axios.get(`${BASE_URL_Login}/lessonPlan/fetch/admin?class=${Class}&section=${section}&subject=${subject}&session=${session}&startingDate=${nextWeekFormattedDate}`, {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                });
                console.log("API response:", response.data);
                if (response.data.plan && response.data.plan.length > 0) {
                    setDetails(response.data.plan);
                    setId(response.data._id);
                    setRemark(response.data.adminRemark);
                    setStatus(response.data.adminStatus);
                } else {
                    setDetails(defaultPlan());
                    setId('');
                }
                setLoading(false);
            } catch (err) {
                console.log(err.response.data.error);
                setDetails(defaultPlan());
                setError(err.response.data.error);
                setLoading(false);
            }
        };
        if (Class && section && subject) {
            setLoading(true);
            setDetails([]);
            fetchPlan();
        }
    }, [Class, section, subject, nextWeekFormattedDate]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!status) {
            alert('Please fill status');
        }
        const data = {
            accessToken: authState.accessToken,
            id: id,
            status: status,
            remark: remark,
        };
        console.log(data, id);

        try {
            const response = await axios.put(
                `${BASE_URL_Login}/lessonPlan/update/admin?id=${id}&status=${status}&remark=${remark}&session=${session}`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                }
            );
            console.log("API response:", response.data);
            toast.success('Plan Saved Successfully');
        } catch (err) {
            console.log(err.response.data.error);
            toast.error(err.response.data.error);

        }
    };


    return (
        <motion.div
            className="rounded-md overflow-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {loading ? (
                <Loading />
            ) : details.length === 0 && selectedTab === "Next Week" ? (
                <div className="text-purple-500 font-bold text-2xl">No Data Available</div>
            ) : (
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <motion.table
                        className="w-full rounded-md border border-purple-500"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <thead className="bg-purple-500 ">
                            <tr className="p-4 text-center">
                                <th className="border-y border-purple-500 py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal whitespace-nowrap font-semibold text-white">
                                    Date
                                </th>
                                <th className="border-y border-purple-500 py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal whitespace-nowrap font-semibold text-white">
                                    Chapter
                                </th>
                                <th className="border-y border-purple-500 py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal whitespace-nowrap font-semibold text-white">
                                    Topic
                                </th>
                                <th className="border-y border-purple-500 py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal whitespace-nowrap font-semibold text-white">
                                    Teaching Aids
                                </th>
                                <th className="border-y border-purple-500 py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal whitespace-nowrap font-semibold text-white">
                                    Activity (if any)
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-center whitespace-nowrap">
                            {details.map((data, index) => (
                              
                                    <NextWeekAdminRow
                                        details={data}
                                        index={index}
                                        setDetails={setDetails}
                                    />
                               
                            ))}
                        </tbody>
                    </motion.table>
                    <motion.div
                        className="flex justify-center items-center py-2 gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                    >
                        <textarea
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                            placeholder="Enter your remark"
                            className="w-full p-2 border border-purple-500 rounded-md mb-4 text-purple-500"
                        />
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="p-5 border border-purple-500 rounded-md mb-4 text-purple-500"
                        >
                            <option value="">Select status</option>
                            <option value="Accept">Accept</option>
                            <option value="Reject">Reject</option>
                        </select>
                    </motion.div>
                    <motion.div
                        className="flex justify-center items-center py-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                    >
                        <button
                            type="submit"
                            className="p-1 px-4 rounded-md bg-purple-500 font-semibold border-purple-500 border text-white hover:bg-white hover:text-purple-500 hover:border-purple-500 hover:border-2"
                        >
                            SAVE
                        </button>
                    </motion.div>
                </motion.form>
            )}
        </motion.div>
    );
};

export default NextWeekAdmin;
