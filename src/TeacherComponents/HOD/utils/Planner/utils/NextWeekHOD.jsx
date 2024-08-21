import React, { useEffect, useState, useContext } from 'react';
import { BASE_URL_Login } from '../../../../../Config';
import axios from 'axios';
import AuthContext from '../../../../../Context/AuthContext';
import Loading from '../../../../../LoadingScreen/Loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NextWeekHODRow from './NextWeekHODRow';
import { motion, AnimatePresence } from 'framer-motion';

const NextWeekHOD = ({ selectedTab, Class, section, subject }) => {
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


    const nextWeekFormattedDate = nextWeekStart.toISOString().split('T')[0];
    const [details, setDetails] = useState(defaultPlan());

    console.log(selectedTab)
    useEffect(() => {
        console.log(nextWeekFormattedDate)
        const fetchPlan = async () => {

            try {
                const response = await axios.get(`${BASE_URL_Login}/lessonPlan/fetch/coordinator?class=${Class}&section=${section}&subject=${subject}&session=${session}&startingDate=${nextWeekFormattedDate}`, {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                });
                console.log("API response:", response.data);
                if (response.data.plan && response.data.plan.length > 0) {
                    setDetails(response.data.plan);
                    setId(response.data._id);
                    setRemark(response.data.coordinatorRemark);
                    setStatus(response.data.coordinatorStatus);
                } else {
                    setDetails(defaultPlan());
                    setId('');
                }
                setLoading(false);
            } catch (err) {
                console.log(err);
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
                `${BASE_URL_Login}/lessonPlan/update/coordinator?id=${id}&status=${status}&remark=${remark}&session=${session}`,
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


    const inputVariants = {
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
        <div className='rounded-md overflow-auto'>
            {loading ? (
                <Loading />
            ) : details.length === 0 && selectedTab === 'Next Week' ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-4 text-blue-500"
                >
                    No Data Available
                </motion.div>
            ) : (
                <motion.form
                    onSubmit={handleSubmit}
                    initial="hidden"
                    animate="visible"
                    variants={tableVariants}
                >
                    <motion.table className='w-full rounded-md border border-black' variants={tableVariants}>
                        <thead className='bg-gradient-to-r from-blue-400  to-blue-200'>
                            <tr className='p-4 text-center'>
                                <th className=' py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal whitespace-nowrap font-semibold'>Date</th>
                                <th className=' py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal whitespace-nowrap font-semibold'>Chapter</th>
                                <th className=' py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal whitespace-nowrap font-semibold'>Topic</th>
                                <th className=' py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal whitespace-nowrap font-semibold'>Teaching Aids</th>
                                <th className=' py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal whitespace-nowrap font-semibold'>Activity (if any)</th>
                            </tr>
                        </thead>
                        <AnimatePresence>
                            <motion.tbody className='text-center whitespace-nowrap'>
                                {details.map((data, index) => (
                                    <NextWeekHODRow details={data} index={index} setDetails={setDetails} />
                                ))}
                            </motion.tbody>
                        </AnimatePresence>
                    </motion.table>

                    <motion.div className='flex justify-center items-center py-2 gap-2' variants={inputVariants}>
                        <motion.textarea
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                            placeholder='Enter your remark'
                            className='w-full p-2 border border-black rounded-md mb-4'
                            variants={inputVariants}
                        />
                        <motion.select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className='p-5 border border-black rounded-md mb-4'
                            variants={inputVariants}
                        >
                            <option value="">Select status</option>
                            <option value="Accept">Accept</option>
                            <option value="Reject">Reject</option>
                        </motion.select>
                    </motion.div>
                    <motion.div className='flex justify-center items-center py-4' variants={inputVariants}>
                        <motion.button
                            type="submit"
                            className='p-1 px-4 rounded-md bg-secondary font-semibold border-black border hover:bg-white hover:text-black hover:border-black hover:border-2'
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            SAVE
                        </motion.button>
                    </motion.div>
                </motion.form>
            )}
        </div>
    );
};

export default NextWeekHOD;
