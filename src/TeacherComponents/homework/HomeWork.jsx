import React, { useState, useEffect, useContext } from "react";
import HomeWorkTile from './HomeWorkTile';
import Upload from "../../assets/upload.png"
import NewUpload from './NewUpload';
import axios from 'axios';
import Loading from '../../LoadingScreen/Loading';
import AuthContext from '../../Context/AuthContext';
import { BASE_URL_Homework } from "../../Config";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HomeWork() {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");


    const handleOpen = () => {
        setIsDialogOpen(true);
    }
    const handleClose = () => {
        setIsDialogOpen(false);
    }

    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
    }
    const handleSectionChange = (event) => {
        setSelectedSection(event.target.value);
    }
    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value);
    }

    useEffect(() => {
        const fetchHomework = async () => {
            console.log(authState.ClassDetails.class, new Date().getMonth() + 1, authState.ClassDetails.section, selectedSubject);
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL_Homework}/homework/fetch/teacher?class=${selectedClass}&month=${new Date().getMonth() + 1}&year=2024&section=${selectedSection}&subject=${selectedSubject}`, {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
                    }
                });

                setDetails(response.data.homework);
                console.log('fetch', response.data)
            } catch (error) {
                console.error("Error fetching student homework:", error);
            }
            finally {
                setLoading(false)
            }
        };

        if (selectedSubject) {
            fetchHomework();
        }
    }, [authState.accessToken, selectedSubject, selectedSection, selectedClass]);

    const uniqueClasses = Array.from(new Set(authState.subject.map(subj => subj.class)));

    const uniqueSections = Array.from(new Set(authState.subject.map(subj => subj.section)));

    const uniqueSubjects = Array.from(new Set(authState.subject.map(subj => subj.subject)));

    return (

        <div className="w-full flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 mb-3 no-scrollbar">
            <ToastContainer />
            <div className='w-full flex items-center justify-between'>
                <h1 className='text-2xl'>All HomeWork</h1>
                <div className='flex items-center gap-2'>
                    <select id="class" className="w-full px-4 py-2 border rounded-md" onChange={handleClassChange} >
                        <option value="">Search by Class</option>
                        {uniqueClasses.map((classOption, index) => (
                            <option key={index} value={classOption}>{classOption}</option>
                        ))}
                    </select>



                    <select id="section" className="w-full px-4 py-2 border rounded-md" onChange={handleSectionChange}>
                        <option value="">Search by Section</option>
                        {uniqueSections.map((sectionOption, index) => (
                            <option key={index} value={sectionOption}>{sectionOption}</option>
                        ))}
                    </select>

                    <select id="subject" className="w-full px-4 py-2 border rounded-md" onChange={handleSubjectChange}>
                        <option value="">Search by Subject</option>
                        {uniqueSubjects.map((subjectOption, index) => (
                            <option key={index} value={subjectOption}>{subjectOption}</option>
                        ))}

                    </select>
                </div>

            </div>

            {loading ? (
                <Loading />
            ) : details.length === 0 ? (
                <div className="text-center w-full mt-6">No Homework found</div>
            ) : (
                <div className='w-full mt-4 rounded-lg mb'>
                    <HomeWorkTile details={details} Class={selectedClass} />
                </div>
            )}

            <div className='flex items-center cursor-pointer self-end'>
                <h1>(Upload)</h1>
                <img src={Upload} alt="Upload icon" className='cursor-pointer' onClick={handleOpen}></img>
            </div>
            {isDialogOpen && <NewUpload onClose={handleClose} />}
        </div>


    )
}

export default HomeWork