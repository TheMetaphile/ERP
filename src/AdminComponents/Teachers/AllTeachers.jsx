import React, { useState, useEffect, useContext } from "react";
import TeacherStats from "./utils/TeacherStats";
import SearchBar from "./utils/SearchBar";
import TeacherCard from "./utils/TeacherCard";
import { chatLogo, profilelogo } from "./utils/images/index.js";
import axios from 'axios';
import AuthContext from "../../Context/AuthContext.jsx";
import Loading from "../../LoadingScreen/Loading.jsx"
import { BASE_URL_Login, BASE_URL_Git } from "../../Config.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AllTeachers() {
    const [name, setName] = useState('');
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authState } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [kerasFile, setKerasFile] = useState(null);
    const [pklFile, setPklFile] = useState(null);
    const [fileLoading, setFileLoading] = useState(false);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleKerasChange = (e) => {
        const file = e.target.files[0];
        if (file && file.name.endsWith('.keras')) {
            setKerasFile(file);
        } else {
            alert("Please upload a .keras file.");
            e.target.value = null;
        }
    };

    const handlePylChange = (e) => {
        const file = e.target.files[0];
        if (file && file.name.endsWith('.pkl')) {
            setPklFile(file);
        } else {
            alert("Please upload a .pkl file.");
            e.target.value = null;
        }
    };

    const handleSubmit = async () => {
        if (kerasFile && pklFile) {
            setFileLoading(true);
            const formData = new FormData();
            formData.append('model', kerasFile);
            formData.append('label', pklFile);

            try {
                const response = await axios.post(`${BASE_URL_Git}/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    maxBodyLength: Infinity
                });
                toast.success('Files uploaded successfully!');
                console.log(response.data);
                setFileLoading(false);
                handleCloseModal();
            } catch (error) {
                console.error('Error uploading files:', error);
                setFileLoading(false);
                toast.error('Failed to upload files');
            }
        } else {
            toast.error('Please select both .keras and .pkl files.');
        }
    };


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.post(`${BASE_URL_Login}/fetchMultiple/teacher`, {
                    accessToken: authState.accessToken
                });
                console.log("API response:", response.data);

                if (Array.isArray(response.data.Teachers)) {
                    const users = response.data.Teachers.map(user => ({
                        ...user,
                        profileLogo: user.profileLink || profilelogo,
                        chatLogo: chatLogo,
                    }));
                    setUserData(users);
                } else {
                    setError('Unexpected response format');
                }

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        if (authState.accessToken) {
            fetchUserData();
        } else {
            setError('No access token available');
            setLoading(false);
        }
    }, [authState.accessToken]);

    const filteredTeachers = userData.filter(user => {
        const nameMatch = user.name.toLowerCase().includes(name.toLowerCase());
        return nameMatch;
    });

    return (
        <div className="flex flex-col mx-4">
            <ToastContainer />
            <div className="mt-4 mobile:max-tablet:w-full mobile:max-tablet:mx-0 mobile:max-tablet:my-8 mobile:max-tablet:mb-1">
                <TeacherStats />
            </div>
            <div className="flex items-center justify-between">
                <div className="mt-8 text-xl font-semibold">
                    All Teachers Data
                </div>
                <div className="mt-8 text-base font-normal text-white bg-purple-300 rounded-lg shadow-md p-2 cursor-pointer" onClick={handleModal}>
                    Add Model
                </div>
            </div>
            <div className="mt-4">
                <SearchBar handleNameChange={handleNameChange} name={name} />
            </div>
            <div className="mt-4">
                {loading ? (
                    <Loading />
                ) : error ? (
                    <div>Error: {error}</div>
                ) : Array.isArray(filteredTeachers) && filteredTeachers.length === 0 ? (
                    <TeacherCard userData={userData} />
                ) : Array.isArray(filteredTeachers) ? (
                    <TeacherCard userData={filteredTeachers} />
                ) : (
                    <div>Unexpected data format</div>
                )}
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-1/2">
                        <div className="flex mobile:max-tablet:w-full gap-2 items-center">
                            <label className="text-lg font-normal">Upload Keras :</label>
                            <input type="file" accept=".keras" className="" onChange={handleKerasChange} />
                        </div>
                        <div className="flex mobile:max-tablet:w-full gap-2 items-center mt-3">
                            <label className="text-lg font-normal">Upload Pkl :</label>
                            <input type="file" accept=".pkl" className="" onChange={handlePylChange} />
                        </div>
                        <div className="flex justify-end">
                            <button className="bg-gray-300 rounded-lg px-4 py-2 mr-2" onClick={handleCloseModal}>Cancel</button>
                            <button className="bg-blue-600 text-white rounded-lg px-4 py-2" onClick={handleSubmit}>{fileLoading ? <Loading /> : 'Submit'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
