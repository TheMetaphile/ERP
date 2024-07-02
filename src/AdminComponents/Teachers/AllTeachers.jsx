import React, { useState, useEffect, useContext } from "react";
import TeacherStats from "./utils/TeacherStats";
import SearchBar from "./utils/SearchBar";
import TeacherCard from "./utils/TeacherCard";
import { chatLogo, profilelogo } from "./utils/images/index.js";
import axios from 'axios';
import AuthContext from "../../Context/AuthContext.jsx";
import Loading from "../../LoadingScreen/Loading.jsx"
import { BASE_URL_Login } from "../../Config.js";
import { Octokit } from "@octokit/rest";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const octokit = new Octokit({
    auth: ''
});

const owner = 'BhuvneshwarTyagi';
const repo = 'Face-Prediction';

export default function AllTeachers() {
    const [name, setName] = useState('');
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authState } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [kerasFile, setKerasFile] = useState(null);
    const [pklFile, setPklFile] = useState(null);

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
            try {
                const commitMessage = `Add ${kerasFile.name} and ${pklFile.name}`;
                await uploadFileToGitHub(kerasFile, commitMessage);
                await uploadFileToGitHub(pklFile, commitMessage);
                toast.success('Files committed and pushed to GitHub successfully!');
                handleCloseModal();
            } catch (error) {
                console.error('Error uploading files to GitHub:', error);
                toast.error('Failed to upload files to GitHub');
            }
        } else {
            toast.error('Please select both .keras and .pkl files.');
        }
    };


    const uploadFileToGitHub = async (file, commitMessage) => {
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
            reader.onload = async () => {
                try {
                    const base64String = reader.result.split(',')[1]; 
                    const path = file.name;

                    let sha = null;
                    try {
                        const existingFile = await octokit.repos.getContent({
                            owner,
                            repo,
                            path,
                        });
                        sha = existingFile.data.sha;
                    } catch (error) {
                        if (error.status !== 404) {
                            toast.error('Error checking file existence on GitHub:', error);
                            reject(new Error('Failed to upload file to GitHub'));
                            return;
                        }
                    }


                    const response = await octokit.repos.createOrUpdateFileContents({
                        owner,
                        repo,
                        path,
                        message: commitMessage,
                        content: base64String,
                        sha,
                    });

                    resolve(response);
                } catch (error) {
                    toast.error('Error uploading file to GitHub:', error);
                    reject(new Error('Failed to upload file to GitHub'));
                }
            };

            reader.onerror = (error) => {
                toast.error('FileReader error:', error);
                reject(new Error('Failed to read file'));
            };

            reader.readAsDataURL(file); 
        });
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
            <div className="mt-4 mobile:max-tablet:w-full mobile:max-tablet:mx-0 mobile:max-tablet:my-8">
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
                            <button className="bg-blue-600 text-white rounded-lg px-4 py-2" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
