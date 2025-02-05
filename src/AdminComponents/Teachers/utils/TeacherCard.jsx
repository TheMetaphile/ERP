import React, { useState, useRef, useContext } from "react";
import { userimg } from "./images/index.js";
import { IoCameraOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import JSZip from 'jszip';
import { BASE_URL_Login } from "../../../Config.js";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext.jsx";
import { toast } from "react-toastify";
import { MdOutlineSecurity } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { RxCrossCircled } from "react-icons/rx";
export default function TeacherCard({ userData }) {
    const { authState } = useContext(AuthContext);
    const [isCapturing, setIsCapturing] = useState(false);
    const [capturedImages, setCapturedImages] = useState([]);
    const [mediaStream, setMediaStream] = useState(null);
    const [activeUser, setActiveUser] = useState(null);
    const videoRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [showPercentage, setShowPercentage] = useState(false);
    const [permission, setPermission] = useState(false);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const availablePermissions = ["Exam", "Attendance", "Homework", "Fee Management", "Student Details"];

    const handleChatClick = async (index) => {
        setActiveUser(index);
        setIsCapturing(true);
        setProgress(0);
        setCapturedImages([]);
        setShowPercentage(false);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setMediaStream(stream);

            const video = videoRef.current;
            video.srcObject = stream;
            await video.play();
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const handleCapture = () => {
        setShowPercentage(true);
        const video = videoRef.current;
        const pictures = [];
        const captureInterval = 150;
        const captureCount = 101;

        for (let i = 0; i < captureCount; i++) {
            setTimeout(() => {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                const context = canvas.getContext('2d');
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                canvas.toBlob((blob) => {
                    pictures.push(blob);
                    setProgress(((pictures.length / captureCount) * 100).toFixed(2));
                    if (pictures.length === captureCount) {
                        setCapturedImages(pictures);
                        setShowPercentage(false);
                        setIsCapturing(false);
                        if (mediaStream) {
                            mediaStream.getTracks().forEach(track => track.stop());
                        }
                        setMediaStream(null);
                    }
                }, 'image/jpeg');
            }, captureInterval * i);
        }
    };

    const handleCancel = () => {
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
        }
        setIsCapturing(false);
        setActiveUser(null);
        setCapturedImages([]);
        setProgress(0);
        setShowPercentage(false);
    };

    const handleDownload = (name) => {
        const zip = new JSZip();
        capturedImages.forEach((image, index) => {
            const imageName = `image_${index + 1}.jpg`;
            zip.file(imageName, image);
        });

        zip.generateAsync({ type: 'blob' }).then((content) => {
            const url = URL.createObjectURL(content);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${name}.zip`;
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        });
    };

    const handlePermission = async (userId) => {
        setSelectedUserId(userId);

        try {
            const response = await axios.get(`${BASE_URL_Login}/permission/fetch/${userId}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });

            if (response.status === 200) {
                const extractedPermissions = response.data.permissions.map(p => p.permission);
                setSelectedPermissions(extractedPermissions);
            }
        } catch (error) {
            toast.error(error?.response?.data?.error || "Error while getting Permission")
            console.error("Error fetching permissions:", error);
        }
        setPermission(true);

    };

    const handlePermissionChange = (perm) => {
        setSelectedPermissions((prevPermissions) =>
            prevPermissions.includes(perm)
                ? prevPermissions.filter((p) => p !== perm)
                : [...prevPermissions, perm]
        );
    };

    const handleSave = async () => {
        try {
            const formattedPermissions = selectedPermissions.map(perm => ({ permission: perm }));
            const response = await axios.post(`${BASE_URL_Login}/permission/update/${selectedUserId}`,
                { permissions: formattedPermissions },
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                }
            );

            if (response.status === 200) {
                toast.success('Permissions updated successfully!');
                setPermission(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.error || "Failed to update Permission")
            console.error("Error updating permissions:", error);
        }
    };

    const handleCancelPermission = () => {
        setPermission(false);
    };

    return (
        <div className="mx-3">
            {userData.map((user, index) => (
                <div key={user._id || index} className="flex mobile:max-tablet:flex-col items-center justify-between border rounded-lg p-4 mb-2 mobile:max-tablet:items-start">
                    <div className="flex w-72 mobile:max-tablet:w-auto">
                        <img src={user.profileLogo || userimg} alt="" className="h-16 w-16 mr-3 rounded-full " />
                        <div className="mt-2 flex flex-col items-start">
                            <h1 className="text-xl font-semibold">{user.name}</h1>
                            <p className="text-gray-400">{user.employeeId}</p>
                        </div>
                    </div>
                    <div className="flex gap-4 mt-2">
                        {(user.subjects || []).map((subject, i) => (
                            <h1 key={i} className="bg-green-200 rounded-md px-2">{subject.subject}</h1>
                        ))}
                    </div>
                    <div className="flex mt-4 gap-2 mb-4 mobile:max-tablet:mb-0">

                        <div className="flex gap-2 items-center bg-blue-300 mx-2 justify-evenly rounded-md px-2 cursor-pointer"
                            onClick={() => handlePermission(user._id)}>
                            <MdOutlineSecurity className="text-white" />
                            <button className="text-white">Permissions</button>
                        </div>

                        <Link to={{
                            pathname: "/Admin-Dashboard/Teachers/profile",
                            search: `?employeeId=${user.employeeId}&name=${user.name}&profileLogo=${user.profileLogo}`,
                        }}>
                            <div className="flex gap-2 items-center bg-blue-300 mx-2 justify-evenly rounded-md px-2 cursor-pointer">
                                <CgProfile className="text-white" />
                                <button className="text-white p-1">Profile</button>
                            </div>
                        </Link>
                        <div className="flex gap-2 items-center bg-blue-300 mx-2 justify-evenly rounded-md px-2 cursor-pointer" onClick={() => handleChatClick(index)}>
                            <IoCameraOutline className="text-white" />
                            <button className="text-white">Camera</button>
                        </div>

                        {activeUser === index && capturedImages.length >= 100 && (
                            <div className="">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 rounded" onClick={() => handleDownload(user.name)}>
                                    Download
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
            {isCapturing && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white px-8 py-4 rounded-lg flex flex-col items-center">
                        <span className="text-lg font-medium ">Face Detection</span>
                        <span className="text-base font-normal">Please sit in front of your webcam in a way such that your face is clearly visible.</span>

                        <div className="w-80 h-80 rounded-full mt-4 relative overflow-hidden flex items-center justify-center">
                            <video ref={videoRef} className="absolute top-0 left-0 w-full h-full object-cover" autoPlay />
                            {showPercentage ?
                                <><span className="text-aquamarine mt-2 z-10">{progress}%</span>
                                    <div className="absolute top-0 left-0 h-full bg-secondarysecond bg-opacity-30" style={{ width: `${progress}%` }}></div>
                                </> : ''}
                        </div>
                        {showPercentage ? <span className="text-base font-medium text-secondarysecond">Please wait we are capturing</span> : ''}

                        <div className="flex gap-2 mt-4">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded" onClick={handleCapture}>
                                Capture
                            </button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {permission && (
                <div className="mt-2 fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all">
                        <div className="border-b p-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-purple-600">Manage Permissions</h2>
                            </div>
                            <p className=" mt-2">Select the permissions you want to enable</p>
                        </div>

                        <div className="p-6">
                            <div className="space-y-4">
                                {availablePermissions.map((perm) => (
                                    <label
                                        key={perm}
                                        className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                                    >
                                        <div className="relative flex items-center justify-center">
                                            <input
                                                type="checkbox"
                                                value={perm}
                                                checked={selectedPermissions.includes(perm)}
                                                onChange={() => handlePermissionChange(perm)}
                                                className="appearance-none w-6 h-6 border-2 rounded-md border-gray-300 checked:border-purple-500 checked:bg-purple-500 transition-all duration-200"
                                            />
                                            <span className="absolute text-white font-bold pointer-events-none opacity-0 transform scale-0 transition-all duration-200 checked:opacity-100 checked:scale-100">
                                                ✓
                                            </span>
                                        </div>
                                        <span className="ml-3 text-gray-700 font-medium group-hover:text-gray-900">
                                            {perm}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="border-t p-6 bg-gray-50 rounded-b-xl">
                            <div className="flex gap-4 justify-end">
                                <button
                                    onClick={handleCancelPermission}
                                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors font-medium"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
}
