import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../Config';
import AuthContext from '../Context/AuthContext';
import {
    FaUser, FaEnvelope, FaBirthdayCake, FaIdCard,
    FaTransgender, FaMapMarkerAlt, FaGraduationCap,
    FaTag, FaCalendarAlt, FaFlag, FaUserFriends, FaUniversity,
    FaPhone
} from 'react-icons/fa';

export default function Detailscard() {
    const { email } = useParams();
    const { authState, darkMode } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        if (authState?.accessToken) {
            fetchUserData();
        }
    }, [authState?.accessToken, email]);

    const fetchUserData = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/fetchSingle/student`, {
                accessToken: authState?.accessToken,
                email: email
            });
            if (response.data.StudentDetails && response.data.StudentDetails.length > 0) {
                setUserData(response.data.StudentDetails[0]);
                setImageError(false);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleImageError = () => {
        setImageError(true);
    };

    const DetailCard = ({ icon: Icon, label, value }) => (
        <div className={`flex items-center p-4 rounded-lg shadow-md transition-all duration-300 
            ${darkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                : 'bg-white hover:bg-blue-50 text-gray-800'
            }`}>
            <div className={`mr-4 text-2xl ${darkMode ? 'text-blue-300' : 'text-blue-600'
                }`}>
                <Icon />
            </div>
            <div>
                <p className={`text-sm font-medium ${darkMode ? 'text-blue-300' : 'text-blue-700'
                    }`}>{label}</p>
                <p className="font-semibold">{value || 'N/A'}</p>
            </div>
        </div>
    );

    const ExtraFieldsSection = () => {
        if (!userData?.extra || userData.extra.length === 0) return null;

        return (
            <div className="mt-6">
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-blue-300' : 'text-blue-700'
                    }`}>
                    Additional Information
                </h2>
                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                    {userData.extra.map((field, index) => (
                        <DetailCard
                            key={field._id || index}
                            icon={FaTag}
                            label={field.label}
                            value={
                                typeof field.value === 'object' && field.value !== null
                                    ? JSON.stringify(field.value)
                                    : field.value || 'N/A'
                            }
                        />
                    ))}
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className={`flex justify-center items-center h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'
                }`}>
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }
    console.log(userData)
    return (
        <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'
            }`}>
            <div className={` mx-auto rounded-xl overflow-hidden shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                <div className={`p-6 flex items-center space-x-6 ${darkMode ? 'bg-gray-700' : 'bg-blue-500'
                    }`}>
                    <div className={`w-24 h-24 rounded-full overflow-hidden border-4 ${darkMode
                        ? 'border-gray-600 bg-gray-600'
                        : 'border-white bg-blue-300'
                        }`}>
                        {imageError || !userData?.profileLink ? (
                            <div className={`w-full h-full flex items-center justify-center text-4xl font-bold ${darkMode ? 'text-blue-300' : 'text-white'
                                }`}>
                                {userData?.name?.charAt(0)}
                            </div>
                        ) : (
                            <img
                                src={userData.profileLink}
                                alt={userData?.name}
                                className="w-full h-full object-cover"
                                onError={handleImageError}
                            />
                        )}
                    </div>
                    <div>
                        <h1 className={`text-3xl font-bold ${darkMode ? 'text-blue-300' : 'text-white'
                            }`}>{userData?.name}</h1>
                        <p className={`text-lg ${darkMode ? 'text-blue-200' : 'text-blue-100'
                            }`}>Roll No: {userData?.rollNumber}</p>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                        <DetailCard
                            icon={FaUser}
                            label="Full Name"
                            value={userData?.name}
                        />
                        <DetailCard
                            icon={FaEnvelope}
                            label="Email"
                            value={userData?.email}
                        />
                        <DetailCard
                            icon={FaBirthdayCake}
                            label="Date of Birth"
                            value={userData?.DOB}
                        />
                        <DetailCard
                            icon={FaIdCard}
                            label="Aadhar Number"
                            value={userData?.aadhaarNumber}
                        />
                         <DetailCard
                            icon={FaPhone}
                            label="Phone Number"
                            value={userData?.phoneNumber}
                        />
                        <DetailCard
                            icon={FaTransgender}
                            label="Gender"
                            value={userData?.gender}
                        />
                        <DetailCard
                            icon={FaMapMarkerAlt}
                            label="Branch"
                            value={userData?.branch}
                        />
                        <DetailCard
                            icon={FaGraduationCap}
                            label="Current Class"
                            value={`${userData?.currentClass} ${userData?.section}`}
                        />
                        <DetailCard
                            icon={FaGraduationCap}
                            label="Admission Class"
                            value={userData?.admissionClass}
                        />
                        <DetailCard
                            icon={FaUser}
                            label="Father's Name"
                            value={userData?.fatherName}
                        />
                        <DetailCard
                            icon={FaCalendarAlt}
                            label="Admission Date"
                            value={userData?.admissionDate}
                        />
                        <DetailCard
                            icon={FaUserFriends}
                            label="Guardian's Name"
                            value={userData?.guardiansName}
                        />
                        <DetailCard
                            icon={FaFlag}
                            label="Nationality"
                            value={userData?.nationality}
                        />
                        <DetailCard
                            icon={FaTag}
                            label="Category"
                            value={userData?.category}
                        />
                        <DetailCard
                            icon={FaUniversity}
                            label="Branch"
                            value={userData?.branch}
                        />
                    </div>

                    <ExtraFieldsSection />
                </div>
            </div>
        </div>
    );
}