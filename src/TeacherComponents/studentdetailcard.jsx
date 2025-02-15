import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL_Login } from '../Config';
import AuthContext from '../Context/AuthContext';

export default function Studentdetailscard() {
    const { email } = useParams();
    const [selectedTab, setSelectedTab] = useState('personal');
    const { authState } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        if (authState.accessToken) {
            fetchUserData();
        }
    }, [authState.accessToken, email]);

    const fetchUserData = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL_Login}/fetchSingle/student`, {
                accessToken: authState.accessToken,
                email: email
            });
            if (response.data.StudentDetails && response.data.StudentDetails.length > 0) {
                setUserData(response.data.StudentDetails[0]);
                setImageError(false);
            }
            console.log(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    const handleImageError = () => {
        setImageError(true);
    };

    const InfoItem = ({ label, value }) => (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg transition-all duration-300 ease-in-out hover:shadow-md hover:bg-blue-100">
            <span className="font-semibold text-blue-700">{label}:</span>
            <span className="ml-2 text-gray-800">{value || 'N/A'}</span>
        </div>
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="pt-1 w-full mobile:max-sm:p-2">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl">
                <div className="bg-blue-100 text-white p-6 mobile:max-sm:p-1">
                    <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-blue-300 text-blue-600 text-2xl font-bold">
                            {imageError || !userData?.profileLink ? (
                                <span>{userData?.name?.charAt(0)}</span>
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
                            <h2 className="text-2xl font-bold text-blue-700">{userData?.name}</h2>
                            <p className="text-blue-700">Roll No: {userData?.rollNumber}</p>
                        </div>
                    </div>
                </div>
                <div className="p-6 mobile:max-sm:p-2">
                    <div className="flex mb-6">
                        {['personal', 'parent'].map((tab) => (
                            <button
                                key={tab}
                                className={`flex-1 py-2 px-4 transition-all duration-300 ease-in-out ${selectedTab === tab
                                    ? 'bg-blue-400 text-white shadow-md'
                                    : 'bg-gray-200 hover:bg-blue-100'
                                    }`}
                                onClick={() => setSelectedTab(tab)}
                            >
                                {tab === 'personal' ? 'Personal Information' : 'Parent Details'}
                            </button>
                        ))}
                    </div>
                    <div className="transition-opacity duration-300 ease-in-out"
                        style={{ opacity: loading ? 0 : 1 }}>
                        {selectedTab === 'personal' && (
                            <div className="grid grid-cols-2 gap-4 mobile:max-sm:grid-cols-1">
                                <InfoItem label="Class & Section" value={`${userData?.currentClass} ${userData?.section}`} />
                                <InfoItem label="Date of Birth" value={userData?.DOB} />
                                <InfoItem label="Gender" value={userData?.gender} />
                                <InfoItem label="Admission Date" value={userData?.admissionDate} />
                                <InfoItem label="Address" value={userData?.permanentAddress} />
                                <InfoItem label="Academic Year" value={userData?.academicYear} />
                                <InfoItem label="Aadhar Number" value={userData?.aadhaarNumber} />
                                <InfoItem label="Email" value={userData?.email} />
                                <InfoItem label="Emergency Contact" value={userData?.guardiansPhoneNumber} />
                            </div>
                        )}
                        {selectedTab === 'parent' && (
                            <div className="grid grid-cols-2 gap-4 mobile:max-sm:grid-cols-1">
                                <InfoItem label="Father's Name" value={userData?.fatherName} />
                                <InfoItem label="Mother's Name" value={userData?.motherName} />
                                <InfoItem label="Father's Phone" value={userData?.fatherPhoneNumber} />
                                <InfoItem label="Mother's Phone" value={userData?.motherPhoneNumber} />
                                <InfoItem label="Parent Email" value={userData?.parentEmail} />
                                <InfoItem label="Father's Occupation" value={userData?.fathersOccupation} />
                                <InfoItem label="Mother's Occupation" value={userData?.motherOccupation} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}





