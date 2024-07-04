import React, { useState, useRef } from "react";
import { userimg } from "./images/index.js";
import { IoCameraOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import JSZip from 'jszip';

export default function TeacherCard({ userData }) {
    const [isCapturing, setIsCapturing] = useState(false);
    const [capturedImages, setCapturedImages] = useState([]);
    const [mediaStream, setMediaStream] = useState(null);
    const [activeUser, setActiveUser] = useState(null);
    const videoRef = useRef(null);
    const [progress, setProgress] = useState(0);

    const handleChatClick = async (index) => {
        setActiveUser(index);
        setIsCapturing(true);
        setProgress(0);

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
        console.log('start')
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
        console.log('cancel')
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
        }
        setIsCapturing(false);
        setActiveUser(null);
        setCapturedImages([]);
        setProgress(0);
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

    return (
        <div className="mx-3">
            {userData.map((user, index) => (
                <div key={user._id || index} className="flex mobile:max-tablet:flex-col  items-center justify-between border rounded-lg p-4 mb-2 mobile:max-tablet:items-start">
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
                        <Link to={{
                            pathname: "/Admin-Dashboard/Teachers/profile",
                            search: `?employeeId=${user.employeeId}&name=${user.name}&profileLogo=${user.profileLogo}`,
                        }}>
                            <div className="flex gap-2 items-center bg-blue-300 mx-2 w-30 justify-evenly rounded-md px-4 ">
                                <button className="text-white p-1">Profile</button>
                            </div>
                        </Link>
                        <div className="flex gap-2 items-center bg-blue-300 mx-2 w-28 justify-evenly rounded-md px-2 cursor-pointer" onClick={() => handleChatClick(index)}>
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
                    <div className="bg-gray-600 px-8 py-4 rounded-lg flex flex-col items-center">
                        <span className="text-lg font-medium text-white">Face Detection</span>
                        <span className="text-base font-normal text-white">Please sit in front of your webcam in a way such that your face is clearly visible.</span>

                        <div className="relative w-96 mt-4">
                            <video ref={videoRef} className="rounded-lg w-full" autoPlay />
                            <div className="absolute top-0 left-0 h-full bg-secondarysecond bg-opacity-30" style={{ width: `${progress}%` }}></div>
                        </div>

                        <span className="text-gray-600 mt-2">{progress}% Captured</span>
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

        </div>
    );
}


