import { useState, useContext } from "react";
import axios from 'axios';
import AuthContext from "../../../Context/AuthContext";
import Loading from "../../../LoadingScreen/Loading";
import { BASE_URL_Login } from "../../../Config";
import { toast } from "react-toastify";
import AdmissionInputs from './AdmissionInputs';

const ReadmissionDialog = ({ isOpen, onClose, onSave, user }) => {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

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


    const getSelectedSubjects = () => {
        return Object.entries(formData)
            .filter(([key, value]) =>
                ['physics', 'chemistry', 'maths', 'biology', 'accountancy', 'businessStudies', 'economics', 'history', 'politicalScience', 'geography', 'english', 'optionalSubject'].includes(key) && value !== ''
            )
            .map(([key, value]) => (value));
    };


    const handleSave = async (email) => {
        const selectedSubjects = getSelectedSubjects();

        console.log(authState.accessToken, email, formData.stream, selectedSubjects, session)
        setLoading(true);

        if (formData.stream || selectedSubjects.length < 1) {
            toast.error("Select stream and subject first");
            return;
        }

        try {
            const response = await axios.put(`${BASE_URL_Login}/promote/readmit`,
                {
                    email: email,
                    subjects: selectedSubjects,
                    stream: formData.stream,
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

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'photo' ? files[0] : value,
        }));
    };

    const [formData, setFormData] = useState(
        {
            stream: '',
            physics: '',
            chemistry: '',
            maths: '',
            biology: '',
            accountancy: '',
            businessStudies: '',
            economics: '',
            history: '',
            politicalScience: '',
            geography: '',
            english: '',
            optionalSubject: '',
        }
    );

    const handleSubject = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <div className="fixed inset-0 mt-10 flex items-center justify-center bg-black bg-opacity-5 ">
            <div className="flex flex-col rounded bg-white tablet:w-fit tablet:px-5 mobile:w-full mobile:px- mobile:max-tablet:mt-10 justify-center mobile:max-tablet:mx-1">
                <div className=" p-4 rounded w-auto">
                    <h3 className="text-lg font-bold mb-2">Readmission</h3>
                    <div>
                        {user.name}
                    </div>
                    <div className="w-full rounded-md mobile:max-tablet:w-auto mb-2">
                        <label className="block mobile:max-tablet:text-start mt-4 mx-2 text-lg mobile:max-laptop:text-sm" htmlFor="stream">
                            Select Stream
                        </label>
                        <select
                            className="border rounded-md w-full py-2 px-3 text-gray-500  focus:outline-none focus:shadow-outline mt-2"
                            id="stream"
                            type="text"
                            name="stream"
                            value={formData.stream}
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
                    <div className="">
                        <AdmissionInputs stream={formData.stream} formData={formData} handleChange={handleChange} />
                    </div>

                </div>

                <div className="flex justify-end p-2">
                    <button
                        onClick={() => handleSave()}
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                        Save
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-3 py-1 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReadmissionDialog;
