import React, { useState, useEffect, useContext } from "react";
import HomeWorkTile from './HomeWorkTile';
import Upload from "../../assets/upload.png"
import NewUpload from './NewUpload';
import axios from 'axios';
import Loading from '../../LoadingScreen/Loading';
import AuthContext from '../../Context/AuthContext';
import { BASE_URL_Homework } from "../../Config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HomeWork() {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState("9th");
    const [selectedSection, setSelectedSection] = useState("A");
    const [selectedSubject, setSelectedSubject] = useState("Maths");
    const [additionalData, setAdditionalData] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(4);
    const [allDataFetched, setAllDataFetched] = useState(false);

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

    const handleNewWork = (newWork) => {
        console.log('homework.jsx')
        setAdditionalData([newWork]);
    };

    useEffect(() => {
        if (selectedSubject) {
            setStart(0);
            setDetails([]);
            setAllDataFetched(false);
            fetchHomework();

        }
    }, [authState.accessToken, selectedSubject, selectedSection, selectedClass]);

    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

    useEffect(() => {
        if (start !== 0) {
            fetchHomework();
        }
    }, [start, selectedSubject, selectedSection, selectedClass]);


    const fetchHomework = async () => {
        console.log(authState.ClassDetails.class, new Date().getMonth() + 1, authState.ClassDetails.section, selectedSubject);
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL_Homework}/homework/fetch/teacher?class=${selectedClass}&month=${new Date().getMonth() + 1}&year=${new Date().getFullYear()}&section=${selectedSection}&subject=${selectedSubject}&start=${start}&end=${end}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`,
                }
            });
            const work = response.data.homework.length;
            console.log("API response:", response.data.homework);
            if (work < end) {
                toast.success('All data fetched');
                console.log('All data fetched')
                setAllDataFetched(true);
            }
            setDetails(prevData => [...prevData, ...response.data.homework]);
            console.log('fetch', response.data)
        } catch (error) {
            console.error("Error fetching student homework:", error);
        }
        finally {
            setLoading(false)
        }
    };


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
                    <div>
                        <h1 className="bg-purple-300 px-4 py-2 rounded-md cursor-pointer" onClick={handleOpen}>Upload</h1>
                    </div>
                </div>

            </div>

            {loading ? (
                <Loading />
            ) : details.length === 0 ? (
                <div className="text-center w-full mt-6">No Homework found</div>
            ) : (
                <div className='w-full mt-4 rounded-lg mb'>
                    <HomeWorkTile details={details} Class={selectedClass} additionalData={additionalData} />
                    {!allDataFetched && (
                        <h1 className='text-blue-500 hover:text-blue-800 mt-3 cursor-pointer text-center' onClick={handleViewMore}>View More</h1>
                    )}
                </div>
            )}


            {isDialogOpen && <NewUpload onClose={handleClose} onNewWork={handleNewWork} />}
        </div>


    )
}

export default HomeWork