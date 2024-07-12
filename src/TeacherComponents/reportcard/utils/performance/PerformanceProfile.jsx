import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from "react-router-dom";
import InfoCard from "../../../../components/Result/utils/InfoCard";
import Attendance from "./Attendence";
import AcademicMiddleTile from "./AcademicMiddleTile";
import axios from "axios";
import Loading from "../../../../LoadingScreen/Loading";
import AuthContext from "../../../../Context/AuthContext";
import { BASE_URL_Login, BASE_URL_Result } from "../../../../Config";
import logo from '../../../../assets/school logo.png';
import './Print.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PrintableComponent = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="your-component px-3">
      <h3 className="text-xl font-medium">Performance Profile</h3>
      <div className="w-full border border-gray-300 shadow-md rounded-lg p-4 mt-4">
        <div className="flex justify-center">
          <img src={logo} alt="img" className='mobile:max-tablet:w-20' />
          <div className='self-center ml-3'>
            <h1 className='tablet:text-3xl mobile:max-tablet:text-lg font-medium text-text_blue'>
              Metaphile Public School
            </h1>
            <h3 className='tablet:text-xl text-gray-400 mb-4'>
              'O' Block, Ganganagar, Meerut-250001
            </h3>
          </div>
        </div>
        <div className="border-t-2 border-text_blue my-2 tablet:mx-3 rounded-full"></div>
        <h1 className='tablet:text-3xl mobile:max-tablet:text-xl font-medium text-text_blue text-center'>Performance Profile</h1>
        <div className="border-t-2 border-text_blue my-3 tablet:mx-3 rounded-full"></div>
        <div className='flex w-full justify-evenly mobile:max-tablet:flex-col'>
          <div className='flex flex-col text-center items-center'>
            <img src={props.profile.profileLink} alt="img" className=' w-20 h-20 rounded-full' crossOrigin="anonymous" />
            <h1 className='mt-2 teblet:text-2xl mobile:max-tablet:text-xl font-medium '>{props.profile.name}</h1>
            <h3 className='text-lg font-medium text-gray-400'>Class {props.profile.currentClass} {props.profile.section}</h3>
          </div>
          <div className='flex'>
            <div className='text-lg font-medium tablet:w-60 mobile:max-tablet:w-48 my-2'>
              <h1>Roll Number</h1>
              <h1>Date of Birth</h1>
              <h1>Blood Group</h1>
              <h1>Contact No.</h1>
              <h1>Class</h1>
              <h1>Father's Name</h1>
              <h1>Mother's Name</h1>
            </div>
            <div className='text-lg w-60 text-gray-400 my-2'>
              <h1>{props.profile.rollNumber}</h1>
              <h1>{props.profile.DOB}</h1>
              <h1>{props.profile.bloodGroup}</h1>
              <h1>{props.profile.fatherPhoneNumber}</h1>
              <h1>{props.profile.currentClass} {props.profile.section}</h1>
              <h1>{props.profile.fatherName}</h1>
              <h1>{props.profile.motherName}</h1>
            </div>
          </div>
        </div>
      </div>
      <Attendance term={[{ total: "249", attendance: "235" }]} />
      <AcademicMiddleTile details={props.details} />
      <div className="page-break"></div>

    </div>
  );
});

const PerformanceProfile = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const { authState } = useContext(AuthContext);
  const [details, setDetails] = useState([]);
  const [profile, setProfile] = useState([]);
  const [profileLoading, setProfileLoading] = useState(true);
  const componentRef = useRef();

  useEffect(() => {
    const fetchProfile = async () => {
      setProfileLoading(true);
      try {
        const response = await axios.post(`${BASE_URL_Login}/fetchSingle/student`, {
          accessToken: authState.accessToken,
          email: id
        });
        if (response.status === 200) {
          fetchResult();
          setProfile(response.data.StudentDetails[0]);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
      setProfileLoading(false);
    };

    const fetchResult = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL_Result}/result/fetch/teacher?email=${id}`, {
          headers: {
            Authorization: `Bearer ${authState.accessToken}`,
          }
        });
        if (response.status === 200) {
          setDetails(response.data);
        }
      } catch (error) {
        console.error("Error fetching student result:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, authState.accessToken]);

  if (loading || profileLoading) {
    return <Loading />;
  }

  const handlePrint = async () => {
    const input = componentRef.current;
  
    const canvas = await html2canvas(input, {
      useCORS: true, // Enable cross-origin images
      logging: true,
      allowTaint: false,
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
    // Save the PDF with a specified name
    const pdfBlob = pdf.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.src = pdfUrl;
    document.body.appendChild(iframe);
  
    iframe.onload = () => {
      iframe.contentWindow.print();
    };
  

  };
  

  return (
    <div className="mt-4 w-full">
      <button
        className="text-xl font-medium bg-secondary text-black rounded-lg shadow-md py-1 px-3 hover:bg-blue-400 cursor-pointer hover:text-white"
        onClick={handlePrint}
      >
        Download
      </button>
      <PrintableComponent ref={componentRef} profile={profile} details={details} />
    </div>
  );
};

export default PerformanceProfile;
