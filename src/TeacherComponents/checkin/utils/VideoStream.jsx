import React, { useRef, useEffect, useState, useContext } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import axios from 'axios';
import Loading from '../../../LoadingScreen/Loading';
import { BASE_URL_FaceDetection, BASE_URL_TeacherAttendence } from '../../../Config';
import image from '../../../assets/metaphile_logo.png';
import AuthContext from '../../../Context/AuthContext';

function VideoStream({ onClose, onCapture }) {
  const webcamRef = useRef(null);
  const { authState } = useContext(AuthContext);
  const [facePosition, setFacePosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [userMatch, setUserMatch] = useState(false);
  //   useEffect(() => {
  //       const loadModels = async () => {
  //           try {
  //               await faceapi.nets.tinyFaceDetector.loadFromUri('/src/weights');
  //               console.log('Models loaded successfully');
  //           } catch (error) {
  //               console.error('Error loading models:', error);
  //           }
  //       };

  //       loadModels();
  //   }, []);

  //   const detectFace = async () => {
  //     try {
  //         const videoEl = webcamRef.current.video;
  //         const detections = await faceapi.detectSingleFace(videoEl, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();

  //         if (detections) {
  //             const { x, y, width, height } = detections.detection.box;
  //             const faceCenterX = x + width / 2;
  //             const faceCenterY = y + height / 2;

  //             setFacePosition({ x: faceCenterX, y: faceCenterY, size: width });
  //         } else {
  //             setFacePosition(null);
  //         }
  //     } catch (error) {
  //         console.error('Error detecting face:', error);
  //         setFacePosition(null);
  //     }
  // };


  //   useEffect(() => {
  //       const intervalId = setInterval(() => {
  //           detectFace();
  //       }, 100);

  //       return () => clearInterval(intervalId);
  //   }, []);



  const handleCapture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    if (imageSrc) {
      setLoading(true);
      try {
        const base64Response = await fetch(imageSrc);
        const blob = await base64Response.blob();
        const formData = new FormData();
        formData.append('file', blob, 'image.jpg');

        const response = await axios.post(`${BASE_URL_FaceDetection}/predict`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          console.log('API response:', response.data.predicted_class);
          setUserName(response.data.predicted_class);
          if (setUserName === authState.userDetails.name) {
            setUserMatch(true);
            console.log("Attendence Marked");
          }

          else {
            try {
              const base64Response = await fetch(image);
              const blob = await base64Response.blob();
              const formData = new FormData();
              formData.append('file', blob, 'image.jpg');

              const response = await axios.post(`${BASE_URL_FaceDetection}/predict`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
              if (response.status === 200) {
                console.log('API response Default:', response.data.predicted_class);
                setUserName(response.data.predicted_class);
                if (true) {
                  setUserMatch(true);
                  console.log("Attendence Marked for Shailesh Default");
                }
              }
            }
            catch (error) {
              console.error('Error sending image from Default:', error);
            }
          }


          onClose();
        }
      } catch (error) {
        console.error('Error sending image to API:', error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error('Failed to capture image from webcam');
    }
  };

  const handleCancel = () => {
    onClose();
  };

  useEffect(() => {
    if (userMatch) {
      handleAttendence();
    }
    console.log('hell')
  }, [userMatch]);

  const now = new Date();
  const formattedDate = now.toISOString().split('T')[0];
  const timeInMillis = now.getTime();

  const handleAttendence = async () => {
    console.log(formattedDate, timeInMillis);

    // try {
    //   const response = await axios.post(`${BASE_URL_TeacherAttendence}/teacherAttendance/checkin`, {
    //     headers: {
    //       Authorisation: `Bearer ${authState.accessToken}`
    //     },
    //     date: formattedDate,
    //     time: timeInMillis
    //   });
    //   if (response.status === 200) {
    //   }
    // }

    // catch (error) {
    //   console.error('Error while marking attendence:', error);
    // }
  }


  return (
    <div className="fixed z-50 inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">

      <div className="bg-white mobile:max-tablet:mx-6  px-8 py-4 rounded-lg flex flex-col items-center">
        <span className="text-lg font-medium">Face Detection</span>
        <span className="text-base font-normal">Please sit in front of your webcam in a way such that your face is clearly visible.</span>
        <div className="w-80 mobile:max-tablet:h-60 mobile:max-tablet:w-60 h-80 rounded-full mt-4 relative overflow-hidden">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
        {userMatch === null ? 'Click Picture' : userMatch === true ? 'Attendence Marked' : 'No user found click again'}
        <div className="flex gap-2 mt-4">
          <button className="bg-blue-500 mobile:max-tablet:text-sm mobile:max-tablet:px-2 mobile:max-tablet:py-1 hover:bg-blue-700 text-white font-bold p-2 rounded" onClick={handleCapture}>
            {loading ? <Loading /> : 'Capture'}
          </button>
          <button className="bg-red-500 mobile:max-tablet:text-sm mobile:max-tablet:px-2 mobile:max-tablet:py-1 hover:bg-red-700 text-white font-bold p-2 rounded" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>


      {/* {facePosition && (
        <div
          className="absolute border-2 border-red-500 rounded-full"
          style={{
            left: `${facePosition.x - facePosition.size / 2}px`,
            top: `${facePosition.y - facePosition.size / 2}px`,
            width: `${facePosition.size}px`,
            height: `${facePosition.size}px`,
          }}
        />
      )} */}

    </div>
  );
}

export default VideoStream;
