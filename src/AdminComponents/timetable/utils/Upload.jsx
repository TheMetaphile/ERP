import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateTimetableStrucutre from './createTimetableStructure';
import UploadTimetable from './UploadTimetable';
import Loading from './../../../LoadingScreen/Loading';

const Upload = () => {
    const { authState } = useContext(AuthContext);

    

    const [showTimetableStructure, setShowTimetableStructure] = useState(true);
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
            const structureResponse = await axios.post('https://timetablestructureapi.onrender.com/timeTableStructure/create', createStructureData);
           
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
                    setShowTimetableStructure(false);
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

            const response = await axios.post('https://timetablestructureapi.onrender.com/timeTableStructure/fetch', {
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


    return (

        <div className="flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar">
            <ToastContainer />

            <div className='w-full flex justify-between '>
                <h1 className='text-2xl'>Schedule Time Table</h1>
                <button className='px-3 py-2 bg-secondary rounded-lg' onClick={() => setShowTimetableStructure(true)}>Change Layout</button>
            </div>

            {/* <CheckStructure handleFetch={handleFetch} structureData={structureData} handleChange={handleChange}/> */}

            {
                loading ?
                    (<Loading />)
                    :

                    (<div className='w-full'>
                        {showTimetableStructure
                            ?
                            <CreateTimetableStrucutre handleChange={handleStructureChange} structureData={structureData} handleSubmit={handleSubmit} />
                            :
                            <div></div>}

                        {showTimetable
                            ?
                            <UploadTimetable fetchedTimeTableStructure={fetchedTimeTableStructure} uploadTimetableData={uploadTimetableData} handleChange={handleTimetableChange} />
                            :
                            <div></div>
                        }
                    </div>
                    )
            }
        </div>



    );
};

export default Upload;

