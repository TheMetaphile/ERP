import { useState, useContext, useEffect } from "react";
import axios from 'axios';
import AuthContext from "../../../Context/AuthContext";
import Loading from "../../../LoadingScreen/Loading";
import { BASE_URL_Login } from "../../../Config";
import { toast } from "react-toastify";
import AdmissionInputs from './AdmissionInputs';
import { motion } from "framer-motion";
import { FaUserGraduate, FaStream, FaSave, FaTimes } from "react-icons/fa";

const ReadmissionDialog = ({ isOpen, onClose, onSave, user }) => {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [subject, Setselectedsubject] = useState([])
    const [stream, Setselectedstream] = useState('')

    useEffect(() => {
        console.log("here")
        switch (stream) {
            case "PCM":
                Setselectedsubject(['Physics', 'Chemistry', 'Mathematics', "English"]);
                break;
            case "PCB":
                Setselectedsubject(['Physics', 'Chemistry', 'Biology', "English"]);
                break;
            case "PCMB":
                Setselectedsubject(['Physics', 'Chemistry', 'Mathematics', "English", 'Biology']);
                break;
            case "Commerce":
                Setselectedsubject(['Accountancy', 'Business Studies', 'Economics', "English"]);
                break;
            case "Arts":
                Setselectedsubject(['History', 'Political Science', "English"]);
                break;
            default:
                Setselectedsubject([]);
        }
    }, [stream]);

    function getSession() {
        const currentYear = new Date().getFullYear();
        const nextYear = currentYear + 1;
        const session = `${currentYear}-${nextYear.toString().slice(-2)}`;
        return session;
    }

    const session = getSession();
    console.log(session);

    console.log(user);
    if (!isOpen) return null;


    // const getSelectedSubjects = () => {
    //     return Object.entries(formData)
    //         .filter(([key, value]) =>
    //             ['physics', 'chemistry', 'maths', 'biology', 'accountancy', 'businessStudies', 'economics', 'history', 'politicalScience', 'geography', 'english', 'optionalSubject'].includes(key) && value !== ''
    //         )
    //         .map(([key, value]) => (value));
    // };


    const handleSave = async (email) => {
        // const selectedSubjects = getSelectedSubjects();

        setLoading(true);

        if (!stream || subject.length < 1) {
            toast.error("Select stream and subject first");
            return;
        }
        console.log(email, session);
        try {
            const response = await axios.put(`${BASE_URL_Login}/promote/readmit`,
                {
                    email: email,
                    subjects: subject,
                    stream: stream,
                    session: session
                },
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                }
            );
            console.log(response.data);
            toast.success("Student readmitted successfully");
            onSave();
            onClose();

        } catch (error) {
            console.error("There was an error readmitted the student!", error);
            toast.error("Failed to readmitted the student");
        }
        finally {
            setLoading(false);
        }


    };

    // const handleChange = (e) => {
    //     const { name, value, files } = e.target;
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         [name]: name === 'photo' ? files[0] : value,
    //     }));
    // };

    // const [formData, setFormData] = useState(
    //     {
    //         stream: '',
    //         physics: '',
    //         chemistry: '',
    //         maths: '',
    //         biology: '',
    //         accountancy: '',
    //         businessStudies: '',
    //         economics: '',
    //         history: '',
    //         politicalScience: '',
    //         geography: '',
    //         english: '',
    //         optionalSubject: '',
    //     }
    // );

    const handleSubject = (event) => {
        Setselectedstream(event.target.value)
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.3 } },
    };
    return (
        <motion.div
            className="fixed inset-0 mt-10 flex items-center justify-center bg-black bg-opacity-50"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
        >
            <motion.div
                className="flex flex-col rounded-lg bg-white shadow-lg tablet:w-1/2 tablet:px-8 mobile:w-full mobile:px-4 mobile:max-tablet:mt-10 justify-center mobile:max-tablet:mx-4"
                variants={contentVariants}
            >
                <motion.div className="p-6 rounded w-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                    <h3 className="text-2xl font-bold mb-4 text-purple-700 flex items-center">
                        <FaUserGraduate className="mr-2" />
                        Readmission
                    </h3>
                    <div className="text-lg font-semibold text-gray-700 mb-4">{user.name}</div>
                    <div className="w-full rounded-md mobile:max-tablet:w-auto mb-4">
                        <label className="block mobile:max-tablet:text-start mt-4 mx-2 text-lg mobile:max-laptop:text-sm font-medium text-gray-700" htmlFor="stream">
                            <FaStream className="inline mr-2 text-purple-600" />
                            Select Stream
                        </label>
                        <select
                            className="border rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2"
                            id="stream"
                            name="stream"
                            value={stream}
                            onChange={handleSubject}
                            required
                        >
                            <option value="">Select Stream</option>
                            <option value="PCM">PCM</option>
                            <option value="PCB">PCB</option>
                            <option value="PCMB">PCMB</option>
                            <option value="Commerce">Commerce</option>
                            <option value="Arts">Arts</option>
                        </select>
                    </div>
                    <motion.div
                        className="mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <AdmissionInputs stream={stream} setSubject={Setselectedsubject} subjects={subject} />
                    </motion.div>
                </motion.div>

                <motion.div
                    className="flex justify-end p-4 border-t border-gray-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <motion.button
                        onClick={() => handleSave(user.email)}
                        className="bg-purple-600 text-white px-4 py-2 rounded-md mr-3 flex items-center hover:bg-purple-700 transition duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaSave className="mr-2" />
                        Save
                    </motion.button>
                    <motion.button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-gray-600 transition duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaTimes className="mr-2" />
                        Cancel
                    </motion.button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default ReadmissionDialog;
