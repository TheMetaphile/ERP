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

const octokit = new Octokit({
    auth: ''
});

const owner = 'Shailesh12396'; 
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


    const handleSubmit = async () => {
        if (kerasFile && pklFile) {
            try {
                const commitMessage = `Add ${kerasFile.name} and ${pklFile.name}`;
                await uploadFileToGitHub(kerasFile, commitMessage);
                await uploadFileToGitHub(pklFile, commitMessage);
                alert('Files committed and pushed to GitHub successfully!');
                handleCloseModal();
            } catch (error) {
                console.error('Error uploading files to GitHub:', error);
                alert('Failed to upload files to GitHub');
            }
        } else {
            alert('Please select both .keras and .pkl files.');
        }
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

    const uploadFileToGitHub = async (file, commitMessage) => {
        const arrayBuffer = await file.arrayBuffer();
        const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
        const path = file.name;

        try {
            const response = await octokit.repos.createOrUpdateFileContents({
                owner,
                repo,
                path,
                message: commitMessage,
                content: base64String,
            });
            return response;
        } catch (error) {
            console.error('Error uploading file to GitHub:', error);
            throw error;
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
                            <label className="text-lg font-normal">Upload Pyl :</label>
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
