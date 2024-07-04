import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import axios from 'axios';
import Loading from '../../../LoadingScreen/Loading';

function VideoStream({ onClose, onCapture }) {
  const webcamRef = useRef(null);
  const [facePosition, setFacePosition] = useState(null);
  const [loading, setLoading] = useState(false);

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

        const response = await axios.post('https://face-prediction.onrender.com/predict', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          console.log('API response:', response.data);
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

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">

      <div className="bg-gray-600 px-8 py-4 rounded-lg flex flex-col items-center">
        <span className="text-lg font-medium text-white">Face Detection</span>
        <span className="text-base font-normal text-white">Please sit in front of your webcam in a way such that your face is clearly visible.</span>
        <div className=" w-96 mt-4">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="rounded-lg w-full"
          />
        </div>

        <div className="flex gap-2 mt-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded" onClick={handleCapture}>
            {loading ? <Loading /> : 'Capture'}
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded" onClick={handleCancel}>
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
