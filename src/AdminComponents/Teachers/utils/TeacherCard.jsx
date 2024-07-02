import React, { useState, useRef } from "react";
import { userimg } from "./images/index.js"
import { IoCameraOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import JSZip from 'jszip';

export default function TeacherCard({ userData }) {
    const [isCapturing, setIsCapturing] = useState(false);
    const [capturedImages, setCapturedImages] = useState([]);
    const [mediaStream, setMediaStream] = useState(null);
    const [activeUser, setActiveUser] = useState(null);
    const videoRef = useRef(null);

    const handleChatClick = async (index) => {
        setActiveUser(index);
        try {
            setIsCapturing(true);
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setMediaStream(stream);

            const video = videoRef.current;
            video.srcObject = stream;
            await video.play();

            const pictures = [];
            const captureInterval = 250;
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
                        if (pictures.length === captureCount) {
                            setCapturedImages(pictures);
                            setIsCapturing(false);
                            setTimeout(() => {
                                stream.getTracks().forEach(track => track.stop());
                                setMediaStream(null);
                            }, 30000);
                        }
                    }, 'image/jpeg');
                }, captureInterval * i);
            }
        } catch (error) {
            console.error('Error accessing camera or capturing pictures:', error);
            setIsCapturing(false);
        }
    };

    const handleDownload = (name) => {
        const zip = new JSZip();
        capturedImages.forEach((image, index) => {
            if (index > 0) {
                const imageName = `image_${index + 1}.jpg`;
                zip.file(imageName, image);
            }
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
                <div key={user._id || index} className="flex mobile:max-tablet:flex-col mobile:max-tablet:gap-2 items-center justify-between border rounded-lg p-4 mb-2 mobile:max-tablet:items-start">
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
                    <div className="flex mt-4 gap-2 mb-4">
                        <Link to={{
                            pathname: "/Admin-Dashboard/Teachers/profile",
                            search: `?employeeId=${user.employeeId}&name=${user.name}&profileLogo=${user.profileLogo}`,
                        }}>
                            <div className="flex gap-2 items-center bg-blue-300 mx-2 w-30 justify-evenly rounded-md px-4 ">
                                <button className="text-white p-1">Profile</button>
                            </div>
                        </Link>
                        <div className="flex gap-2 items-center bg-blue-300 mx-2 w-28 justify-evenly rounded-md px-2 cursor-pointer" onClick={() => handleChatClick(index)}>
                            <IoCameraOutline className="text-white"/>
                            <button className="text-white">Camera</button>
                        </div>

                        {activeUser === index && capturedImages.length > 100 && (
                            <div className="">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 rounded" onClick={handleDownload(user.name)}>
                                    Download
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
            {isCapturing && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <video ref={videoRef} className="rounded-lg" autoPlay />
                </div>
            )}
        </div>
    )
}
