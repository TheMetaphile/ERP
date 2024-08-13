// TimetableContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { BASE_URL_TimeTableStructure } from '../../../Config';
import AuthContext from '../../../Context/AuthContext';
import axios from 'axios';

const TimetableContext = createContext();

export const StructureProvider = ({ children }) => {
    const { authState } = useContext(AuthContext);
    const [structureDetails, setStructureDetails] = useState(null);
    const [selectClass, setClass] = useState('3rd');
    const [classRange, setClassRange] = useState('1st-12th'); // use state for classRange
    const [selectedSection, setSection] = useState('C');
    const [dayStudent, setDayStudent] = useState('tuesday');

    
    useEffect(() => {
        handleTimeFetch();
    }, [classRange]); // Update effect to depend on classRange



    const handleTimeFetch = async () => {
        console.log(authState.accessToken);
        console.log('classRange', classRange);
        try {
            const response = await axios.post(`${BASE_URL_TimeTableStructure}/timeTableStructure/fetch`, {
                accessToken: authState.accessToken,
                classRange: classRange,
            });
    
            if (response.status === 200) {
                console.log('response from fetch', response.data);
                if (response.data) {
                    const scheduleArray = [];
                    for (let i = 0; i < response.data.numberOfLecture; i++) {
                        scheduleArray.push({
                            subject: '',
                            teacher: ''
                        });
                    }
                    setStructureDetails(response.data);
                    console.log('response', response.data);
                }
            }
        } catch (err) {
            console.error(err);
        }
    };
    

    useEffect(() => {
        if (['Pre-Nursery', 'L.K.G', 'U.K.G', 'U.K.J'].includes(selectClass)) {
            if (classRange !== 'Pre-Nursery - U.K.J') {
                setClassRange('Pre-Nursery - U.K.J');
            }
        } else {
            if (classRange !== '1st-12th') {
                setClassRange('1st-12th');
            }
        }
    }, [selectClass, classRange]); // Update effect to depend on both selectClass and classRange

    return (
        <TimetableContext.Provider value={{ structureDetails, selectClass, setClass ,selectedSection, setSection, dayStudent, setDayStudent}}>
            {children}
        </TimetableContext.Provider>
    );
};

export const useTimetableContext = () => useContext(TimetableContext);
