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

export default function PerformanceProfile() {

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const { authState } = useContext(AuthContext);
  const [details, setDetails] = useState([]);
  const [profile, setProfile] = useState([]);
  const [profileLoading, setProfileLoading] = useState(true);

  const printDocument = () => {
    const input = document.getElementById('divToPrint');

    html2canvas(input, {
      scrollY: -window.scrollY,
      scale: 2,
      windowWidth: document.body.scrollWidth,
      windowHeight: document.body.scrollHeight,
    }).then((canvas) => {
      const imgWidth = 210; // A4 page width
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let totalPages = Math.ceil(canvas.height / imgHeight);
      let position = 0;

      const pdf = new jsPDF('p', 'mm', 'a4');

      for (let i = 0; i < totalPages; i++) {
        let pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = Math.min(imgHeight, canvas.height - position);

        let ctx = pageCanvas.getContext('2d');
        ctx.drawImage(canvas, 0, position, pageCanvas.width, pageCanvas.height, 0, 0, pageCanvas.width, pageCanvas.height);

        if (i > 0) {
          pdf.addPage();
        }

        pdf.addImage(pageCanvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
        position += imgHeight;
      }

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
    <div className="flex flex-col w-full h-screen overflow-y-auto items-start mt-2 px-2 no-scrollbar" id="divToPrint">
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
