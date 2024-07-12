import React, { useState, useEffect, useContext } from 'react'
import { useParams } from "react-router-dom";
import InfoCard from "../../../../components/Result/utils/InfoCard";
import Attendance from "./Attendence";
import AcademicMiddleTile from "./AcademicMiddleTile";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import Loading from "../../../../LoadingScreen/Loading";
import AuthContext from "../../../../Context/AuthContext";
import { BASE_URL_Login, BASE_URL_Result } from "../../../../Config";
import logo from '../../../../assets/school logo.png';


export default function PerformanceProfile() {

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const { authState } = useContext(AuthContext);
  const [details, setDetails] = useState([]);
  const [profile, setProfile] = useState([]);
  const [profileLoading, setProfileLoading] = useState(true);

  const printDocument = () => {
    const input = document.getElementById('divToPrint');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      pdf.save('download.pdf');
    });
  };


  useEffect(() => {
    const fetchProfile = async () => {
      console.log({ id });
      setProfileLoading(true);
      try {
        const response = await axios.post(`${BASE_URL_Login}/fetchSingle/student`, {
          accessToken: authState.accessToken,
          email: id
        });
        if (response.status === 200) {
          fetchResult();
          console.log('fetch single', response.data.StudentDetails[0]);
          setProfile(response.data.StudentDetails[0]);

        }
      } catch (error) {
        console.error("Error fetching student single:", error);
      } finally {
        setProfileLoading(false);
      }
    };
    fetchProfile();
  }, [authState.accessToken, id]);




  const fetchResult = async () => {
    console.log(profile.name)
    console.log({ id });
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL_Result}/result/fetch/teacher?email=${id}`, {
        headers: {
          Authorization: `Bearer ${authState.accessToken}`,
        }
      });
      if (response.status === 200) {
        console.log(response.data);
        setDetails(response.data);
      }
    } catch (error) {
      console.error("Error fetching student result:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen overflow-y-auto items-start mt-2 px-2 no-scrollbar" id="divToPrint"  style={{
      backgroundColor: '#f5f5f5',
      width: '210mm',
      minHeight: '297mm',
      marginLeft: 'auto',
      marginRight: 'auto'
    }}>
      {loading || profileLoading ? (
        <Loading />
      ) : details === null ? (
        <>
          <h3 className="text-xl font-medium">Performance Profile</h3>
          <InfoCard
            class={profile.currentClass}
            name={profile.name}
            profileImg={profile.profileLink}
            section={profile.section}
            rollnumber={profile.rollNumber}
            dob={profile.DOB}
            bloodgroup={profile.bloodGroup}
            contactno={profile.fatherPhoneNumber}
            father={profile.fatherName}
            mother={profile.motherName}
          />
          <Attendance term={[{ total: "249", attendance: "235" }]} />
          <div className='text-center text-lg text-red-500 font-medium w-full mt-2'>No Result available</div>
        </>
      ) : (
        <>
          <h3 className="text-xl font-medium">Performance Profile</h3>
          {/* <InfoCard
            class={profile.currentClass}
            name={profile.name}
            profileImg={profile.profileLink}
            section={profile.section}
            rollnumber={profile.rollNumber}
            dob={profile.DOB}
            bloodgroup={profile.bloodGroup}
            contactno={profile.fatherPhoneNumber}
            father={profile.fatherName}
            mother={profile.motherName}
          /> */}
          <div className="w-full border border-gray-300 shadow-md rounded-lg p-4 mt-4 " >
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
            <div className="border-t-2 border-text_blue my-2 tablet:mx-3 rounded-full "></div>
            <h1 className='tablet:text-3xl mobile:max-tablet:text-xl font-medium text-text_blue text-center'>Performance Profile</h1>
            <div className="border-t-2 border-text_blue my-3 tablet:mx-3 rounded-full "></div>
            <div className='flex w-full justify-evenly mobile:max-tablet:flex-col' >
              <div className='flex flex-col text-center items-center'>
                <img src={profile.profileLink} alt="img" className=' w-20 h-20 rounded-full' />
                <h1 className='mt-2 teblet:text-2xl mobile:max-tablet:text-xl font-medium '>{profile.name}</h1>
                <h3 className='text-lg font-medium text-gray-400'>Class {profile.currentClass} {profile.section}</h3>
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
                  <h1>{profile.rollNumber}</h1>
                  <h1>{profile.DOB}</h1>
                  <h1>{profile.bloodGroup}</h1>
                  <h1>{profile.fatherPhoneNumber}</h1>
                  <h1>{profile.currentClass} {profile.section}</h1>
                  <h1>{profile.fatherName}</h1>
                  <h1>{profile.motherName}</h1>
                </div>
              </div>
            </div>
          </div>
          <Attendance term={[{ total: "249", attendance: "235" }]} />
          {/* <Academic /> */}
          <AcademicMiddleTile details={details} />
          <div className="text-xl font-medium my-3 bg-secondary text-black self-center rounded-lg shadow-md py-1 px-3 mt-3 hover:bg-blue-400 cursor-pointer hover:text-white" onClick={printDocument}>
            Download
          </div>
        </>
      )

      }
    </div>
  );
}
