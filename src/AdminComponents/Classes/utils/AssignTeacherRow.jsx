import React, { useEffect, useState,useContext } from 'react';
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import TeacherRowContent from './TeacherRowContent';
import AuthContext from '../../../Context/AuthContext';
import Loading from './../../../LoadingScreen/Loading';
import axios from 'axios';
export default function AssignTeacherRow({ Class }) {
    const [expanded, setExpanded] = useState(false);
    const [sectionsDetails, setSections] = useState([]);
    const [newSection, setNewSection] = useState('');
    const [loading, setLoading] = useState(false);
    const { authState } = useContext(AuthContext);
    const handleClick = () => {
        setExpanded(!expanded);
    };
    useEffect(() => {
        if (expanded) {
            setLoading(true);
            fetchSections();
        }
    }, [expanded]);
    const fetchSections = async () => {
        try {
            const response = await axios.post('https://class-teacher.onrender.com/classTeacher/fetch/sections', {
                accessToken: authState.accessToken,
                class: Class,
            });
            const sectionsdetail = response.data.sections;
            console.log(Class);

            setSections(sectionsdetail);
        } catch (error) {
            console.error("Error searching for teachers:", error);
        }finally{
            setLoading(false);
        }

    };
    const handleAddSection = () => {
        if (newSection && !sectionsDetails.includes(newSection)) {
            setSections([...sectionsDetails, newSection]);
            setNewSection('');
        }
    };

    return (
        <div key={Class} className="w-full mb-4 rounded-md cursor-pointer">
            <div className="flex justify-between items-center bg-pink-400 p-2 " onClick={handleClick}>
                <div className="w-1/4 ">
                    <div className="px-4 py-2 border rounded-md">
                        {Class}
                    </div>
                </div>

                <div className="self-center cursor-pointer" onClick={handleClick}>
                    {expanded ? <FaChevronUp /> : <FaChevronDown />}
                </div>

            </div>

            {expanded && (
                <div>
                    <div className="flex justify-between w-full py-2 pl-2 bg-bg_blue h-fit rounded-t-lg border border-black ">
                        <h1 className=" w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Section
                        </h1>
                        <h1 className=" w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Class Teacher
                        </h1>
                    </div>
                    {
                        !loading ? 
                        sectionsDetails.map((details, index) => (
                            <div className={`flex justify-between w-full py-2 pl-2  bg-bg_blue h-fit border border-black ${index == sectionsDetails.length-1 ? "rounded-b-lg" : ""}`}>
                                <h1 key={index} className=" w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                                    {details.section}
                                </h1>
                                <h1 key={index} className=" w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                                    {details.name}
                                </h1>
                            </div>
                        ))
                        :
                        (<Loading />)
                    }
                </div>
            )}
        </div>
    );
}
