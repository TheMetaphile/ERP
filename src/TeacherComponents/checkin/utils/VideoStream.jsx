import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';


function VideoStream({ onClose }) {
  const webcamRef = useRef(null);
  const [facePosition, setFacePosition] = useState(null);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromWeightMap('src/weights/tiny_face_detector_model-shard1'); // Path to models folder
      // await faceapi.nets.faceLandmark68Net.loadFromUri('./../../../weights');
      // await faceapi.nets.faceRecognitionNet.loadFromUri('./../../../weights');
    };

    loadModels();
  }, []);

  const detectFace = async () => {
    const videoEl = webcamRef.current.video;
    const detections = await faceapi.detectSingleFace(videoEl, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();

    if (detections) {
      const { x, y, width, height } = detections.detection.box;
      const faceCenterX = x + width / 2;
      const faceCenterY = y + height / 2;

      setFacePosition({ x: faceCenterX, y: faceCenterY, size: width });
    } else {
      setFacePosition(null);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      detectFace();
    }, 100); // Adjust interval for face detection frequency

    return () => clearInterval(intervalId);
  }, []);
  console.log(facePosition);
  return (
    <div className="fixed inset-0 flex justify-center self-center bg-gray-900 bg-opacity-50 h-full w-full">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className=" m-4 rounded-full"
      />
      {facePosition && (
        <div
          className="absolute border-2 border-red-500 rounded-full"
          style={{
            left: `${facePosition.x - facePosition.size / 2}px`,
            top: `${facePosition.y - facePosition.size / 2}px`,
            width: `${facePosition.size}px`,
            height: `${facePosition.size}px`,
          }}
        />
      )}
    </div>
  );
}

export default VideoStream;
