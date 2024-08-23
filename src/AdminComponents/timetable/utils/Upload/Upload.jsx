import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '../../../../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateTimetableStrucutre from './createTimetableStructure';
import UploadTimetable from './UploadTimetable';
import Loading from './../../../../LoadingScreen/Loading';
import { BASE_URL_TimeTableStructure } from '../../../../Config';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaCog } from 'react-icons/fa';

const Upload = () => {
    const { authState } = useContext(AuthContext);
    const [showTimetableStructure, setShowTimetableStructure] = useState(false);
    const [showTimetable, setShowTimetable] = useState(true);
    const [loading, setLoading] = useState(true);
    const [ClassRange, setClassRange] = useState('1st-12th');

    useEffect(() => {
        setLoading(true);
        handleFetch();
    }, []);
    
    const [structureData, setStructureData] = useState(
        {
            Class: ClassRange,
            start: '',
            before: '',
            lecture: '',
            break: '',
            duration: ''
        },
    );
    const [uploadTimetableData, setUploadData] = useState(
        {
            Class: '',
            section: '',
            day: '',
            schedule: [
                {
                    subject: '',
                    teacher: ''
                }
            ]
        }
    );
    const [fetchedTimeTableStructure, setTimetableStructure] = useState(null);

    useEffect(() => {
        //setLoading(true);
        handleFetch();
    }, [ClassRange]);

    const handleStructureChange = (e) => {
        const { name, value } = e.target;

        setStructureData(prevState => ({
            ...prevState,
            [`${name}`]: value
        }))
    };
    const handleTimetableChange = (index = 0, e) => {
        const { name, value } = e.target;

        if (name === 'Class') {

            if (value === 'Pre-Nursery' || value === 'L.K.G' || value === 'U.K.G' || value === 'U.K.J') {
                if (ClassRange !== 'Pre-Nursery - U.K.J') {
                    setClassRange('Pre-Nursery - U.K.J');
                }
            } else {
                if (ClassRange !== '1st-12th') {
                    setClassRange('1st-12th');
                }
            }
            setUploadData(prevState => ({
                ...prevState,
                Class: value
            }));
        }
        else {
            if (name === 'schedule') {
                setUploadData(prevState => ({
                    ...prevState,
                    schedule: prevState.schedule.map((item, loopindex) => {
                        if (loopindex !== index) {
                            // This is not the item we're updating - return it unchanged
                            return item;
                        }

                        // Return an updated copy of the item
                        return value;
                    })
                }));
            } else {
                setUploadData(prevState => ({
                    ...prevState,
                    [name]: value
                }))
            }
        }

    }

    const convertTo12HourFormat = (time24) => {
        const [hour, minute] = time24.split(':');
        let period = 'am';
        let hour12 = parseInt(hour, 10);

        if (hour12 >= 12) {
            period = 'pm';
            if (hour12 > 12) hour12 -= 12;
        }
        if (hour12 === 0) hour12 = 12;

        return `${hour12}:${minute} ${period}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const createStructureData = {
            accessToken: authState.accessToken,
            classRange: structureData.Class,
            numberOfLecture: structureData.lecture,
            durationOfEachLeacture: structureData.duration,
            firstLectureTiming: convertTo12HourFormat(structureData.start),
            numberOfLeacturesBeforeLunch: structureData.before,
            durationOfLunch: structureData.break
        };
        console.log(createStructureData)
        try {
            const structureResponse = await axios.post(`${BASE_URL_TimeTableStructure}/timeTableStructure/create`, createStructureData);
           
            if (structureResponse.status === 200) {
                console.log(structureResponse, 'OK',structureData.Class)
                toast.success('Time table structure created successfully!');

                    const scheduleArray = [];
                    for (let i = 0; i < structureData.lecture; i++) {
                        scheduleArray.push({
                            subject: '',
                            teacher: ''
                        });
                    }

                    setUploadData(prevState => ({
                        ...prevState,
                        schedule: scheduleArray
                    }))
                    setTimetableStructure(createStructureData);
                    // setShowTimetableStructure(false);
                    setShowTimetable(true);
            }
        }
        catch (error) {
            console.error('Error creating time table structure:', error);
            toast.error('Failed to create time table structure!');
        }
    };

    const handleFetch = async (e) => {
        //e.preventDefault();
        console.log(authState.accessToken)
        console.log(ClassRange)
        try {

            const response = await axios.post(`${BASE_URL_TimeTableStructure}/timeTableStructure/fetch`, {
                accessToken: authState.accessToken,
                classRange: ClassRange,
            });

            if (response.status === 200) {
                
                console.log('response from fetch', response.data);
                if (response.data) {
                    console.log("here", response.data.numberOfLecture);
                    const scheduleArray = [];
                    for (let i = 0; i < response.data.numberOfLecture; i++) {
                        scheduleArray.push({
                            subject: '',
                            teacher: ''
                        });
                    }

                    setUploadData(prevState => ({
                        ...prevState,
                        schedule: scheduleArray
                    }))
                    setTimetableStructure(response.data);
                    setShowTimetableStructure(false);
                    setShowTimetable(true);


                } else {
                    setShowTimetable(false);
                    setShowTimetableStructure(true);
                }
            }
            
            if (loading) {
                setLoading(false);
                console.log("Fetch successful")
            }
        } catch (err) {
            console.error(err);

        }
    }


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, when: "beforeChildren", staggerChildren: 0.1 } }
      };
    
      const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
      };


    return (

     <motion.div 
      className="flex flex-col w-full mobile:max-tablet:px-4 h-screen overflow-y-auto items-start mt-4 mb-6 no-scrollbar border bg-purple-50 p-3 rounded-lg shadow-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      
      <motion.div className='w-full flex justify-between items-center mb-3 px-4' variants={itemVariants}>
        <motion.h1 className='text-3xl font-bold text-purple-800 flex items-center'>
          <FaCalendarAlt className="mr-2" />
          Schedule Time Table
        </motion.h1>
        <motion.button
          className='px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md flex items-center'
          onClick={() => setShowTimetableStructure(!showTimetableStructure)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaCog className="mr-2" />
          {showTimetableStructure ? 'Cancel' : 'Change Layout'}
        </motion.button>
      </motion.div>
      
      {loading ? (
        <motion.div variants={itemVariants}>
          <Loading />
        </motion.div>
      ) : (
        <motion.div className='w-full' variants={itemVariants}>
          <AnimatePresence>
            {showTimetableStructure && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CreateTimetableStrucutre 
                  handleChange={handleStructureChange} 
                  structureData={structureData} 
                  handleSubmit={handleSubmit} 
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {showTimetable && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <UploadTimetable 
                  fetchedTimeTableStructure={fetchedTimeTableStructure} 
                  uploadTimetableData={uploadTimetableData} 
                  handleChange={handleTimetableChange} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>



    );
};

export default Upload;



  
