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
import { motion } from 'framer-motion';
import { IoMdSchool, IoMdBookmark, IoMdSearch, IoMdCloudUpload, IoMdArrowDropdown } from 'react-icons/io';

function HomeWork() {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [additionalData, setAdditionalData] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(4);
    const [allDataFetched, setAllDataFetched] = useState(false);
    const [uniqueSections, setUniqueSections] = useState([]);
    const [uniqueSubjects, setUniqueSubjects] = useState([]);

    const uniqueClasses = Array.from(new Set(authState.subject ? authState.subject.map(subj => subj.class) : []));

    useEffect(() => {
        setUniqueSections(Array.from(new Set(
            authState.subject ? authState.subject
                .filter(subj => subj.class === selectedClass)
                .map(subj => subj.section) : []
        )));
    }, [selectedClass]);


    useEffect(() => {
        setUniqueSubjects(Array.from(new Set(
            authState.subject ? authState.subject
                .filter(subj => subj.section === selectedSection && subj.class === selectedClass)
                .map(subj => subj.subject) : []
        )));
    }, [selectedSection, selectedClass]);

    const handleOpen = () => {
        if(!authState.subject ) {toast.error("No subject is assigned. Please contanct Admin");return ;}
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

    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const fetchHomework = async () => {
        console.log(authState.ClassDetails.class, new Date().getMonth() + 1, authState.ClassDetails.section, selectedSubject);
        if(!selectedClass || !selectedSection || !selectedSubject ) return ;
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




    return (
<motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 mb-3 no-scrollbar mobile:max-laptop:mt-0"
    >
      <ToastContainer />
      <div className='w-full flex items-center justify-between tablet:max-laptop:flex-col tablet:max-laptop:items-start mobile:max-tablet:px-3'>
        <h1 className='text-2xl mobile:max-tablet:text-lg whitespace-nowrap'>All HomeWork</h1>
        <div className="block tablet:hidden w-full mobile:max-tablet:text-end">
          <button
            className="p-2 border rounded"
            onClick={() => setDropdownVisible(!isDropdownVisible)}
          >
            Filter
          </button>
          {isDropdownVisible && (
            <div className='flex absolute left-0 right-0 flex-col items-center gap-2 bg-white p-2'>
              <select id="class" className="w-full px-4 py-2 border rounded-md" onChange={handleClassChange} >
                <option value=""><IoMdSchool className="inline-block mr-2 text-indigo-600" /> Search by Class</option>
                {uniqueClasses.map((classOption, index) => (
                  <option key={index} value={classOption}>{classOption}</option>
                ))}
              </select>
              <select id="section" className="w-full px-4 py-2 border rounded-md" onChange={handleSectionChange}>
                <option value=""><IoMdSearch className="inline-block mr-2 text-indigo-600" /> Search by Section</option>
                {uniqueSections.map((sectionOption, index) => (
                  <option key={index} value={sectionOption}>{sectionOption}</option>
                ))}
              </select>
              <select id="subject" className="w-full px-4 py-2 border rounded-md" onChange={handleSubjectChange}>
                <option value=""><IoMdBookmark className="inline-block mr-2 text-indigo-600" /> Search by Subject</option>
                {uniqueSubjects.map((subjectOption, index) => (
                  <option key={index} value={subjectOption}>{subjectOption}</option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className=" flex">
          <div className='flex items-center gap-2 mobile:max-tablet:hidden '>
            <select id="class" className="w-full px-4 py-2 border rounded-md" onChange={handleClassChange} >
              <option value=""><IoMdSchool className="inline-block mr-2 text-indigo-600" /> Search by Class</option>
              {uniqueClasses.map((classOption, index) => (
                <option key={index} value={classOption}>{classOption}</option>
              ))}
            </select>
            <select id="section" className="w-full px-4 py-2 border rounded-md" onChange={handleSectionChange}>
              <option value=""><IoMdSearch className="inline-block mr-2 text-indigo-600" /> Search by Section</option>
              {uniqueSections.map((sectionOption, index) => (
                <option key={index} value={sectionOption}>{sectionOption}</option>
              ))}
            </select>
            <select id="subject" className="w-full px-4 py-2 border rounded-md" onChange={handleSubjectChange}>
              <option value=""><IoMdBookmark className="inline-block mr-2 text-indigo-600" /> Search by Subject</option>
              {uniqueSubjects.map((subjectOption, index) => (
                <option key={index} value={subjectOption}>{subjectOption}</option>
              ))}
            </select>
          </div>
          <div>
            <motion.h1 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-500 text-white px-4 py-2 ml-2 rounded-md cursor-pointer flex items-center"
              onClick={handleOpen}
            >
              <IoMdCloudUpload className="mr-2" /> Upload
            </motion.h1>
          </div>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : details.length === 0 ? (
        <div className="text-center w-full">No Homework found</div>
      ) : (
        <div className='w-full mt-2 rounded-lg mb'>
          <HomeWorkTile details={details} Class={selectedClass} additionalData={additionalData} selectedSubject={selectedSubject} />
          {!allDataFetched && (
            <motion.h1 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='text-indigo-600 hover:text-indigo-800 mt-3 cursor-pointer text-center flex items-center justify-center'
              onClick={handleViewMore}
            >
              <IoMdArrowDropdown className="mr-1" /> View More
            </motion.h1>
          )}
        </div>
      )}
      {isDialogOpen && <NewUpload onClose={handleClose} onNewWork={handleNewWork} />}
    </motion.div>


    )
}

export default HomeWork