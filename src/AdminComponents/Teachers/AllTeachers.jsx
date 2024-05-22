import React, { useState, useEffect, useContext } from "react";
import TeacherStats from "./utils/TeacherStats";
import SearchBar from "./utils/SearchBar";
import TeacherCard from "./utils/TeacherCard";
import { chatLogo, profilelogo } from "./utils/images/index.js";
import axios from 'axios';
import AuthContext from "../../Context/AuthContext.jsx";

export default function AllTeachers() {
    const [name, setName] = useState('');
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authState } = useContext(AuthContext);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.post('https://loginapi-y0aa.onrender.com/fetchMultiple/teacher', {
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
            <div className="mt-4 mobile:max-tablet:w-full mobile:max-tablet:mx-2 mobile:max-tablet:my-8">
                <TeacherStats />
            </div>
            <div className="mt-8 text-xl font-semibold">
                All Teachers Data
            </div>
            <div className="mt-4">
                <SearchBar handleNameChange={handleNameChange} name={name} />
            </div>
            <div className="mt-4">
                {loading ? (
                    <div>Loading...</div>
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
        </div>
    );
}
