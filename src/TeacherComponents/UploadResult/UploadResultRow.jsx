import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../../Context/AuthContext'
import Loading from '../../LoadingScreen/Loading'
import axios from 'axios'
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import { BASE_URL_Result } from '../../Config';
import AcademicTopTile from './utils/AcademicTopTile';
import AcademicMiddleTile from './utils/AcademicMiddleTile';
import AcademicBottonTile from './utils/AcademicBottomTile';
import { FaCloudUploadAlt } from "react-icons/fa";
import NewResult from './NewResult';

function UploadResultRow({ rollNumber, name, profileLink, email, Class, section }) {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [termOne, setTermOne] = useState([]);
    const [termTwo, setTermTwo] = useState([]);
    const [termFinal, setFinal] = useState([]);
    const [popUp, setPopUp] = useState(false);

    const handleClick = () => {
        setExpanded(!expanded);
    };

    const togglePopUp = () => {
        setPopUp(!popUp);
    };


    useEffect(() => {
        if (expanded) {
            setLoading(true);
            fetchResult();
        }
    }, [expanded]);


    const fetchResult = async () => {
       
        const date = new Date();
        var session = '';
        if(date.getMonth()+1<6){
            session = `${date.getFullYear()-1}-${date.getFullYear().toString().substring(2,4)}`
        }else{
            session = `${date.getFullYear()}-${`${date.getFullYear()+1}`.substring(2,4)}`
        }
        console.log(authState.ClassDetails.class, email, Class, session)
        try {
            const response = await axios.get(`${BASE_URL_Result}/result/fetch/teacher?email=${email}&class=${Class}&session=${session}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            if (response.status === 200) {
                console.log(response.data);
                setTermOne(response.data.term1 || []);
                setTermTwo(response.data.term2 || []);
                setFinal(response.data.termFinal || []);

            }
        } catch (error) {
            console.error("Error fetching result:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full'>
            <div
                className='flex justify-evenly border border-gray-300 shadow-md items-center py-2 pl-2 w-full cursor-pointer'
                onClick={handleClick}
            >
                <div className='w-40 text-center'>{rollNumber}</div>
                <div className='w-52 text-center flex items-center gap-1 overflow-ellipsis'>
                    <img src={profileLink} alt="img" className='w-8 h-8 rounded-full' />
                    <div className='w-52 text-center'>{name}</div>
                </div>
                {/* <div>{email}</div> */}
                <div className='w-40 text-center'>{Class}</div>


                <div className='w-40 text-center'>{section}</div>
                <div className='w-10'>
                {expanded ? <FaChevronUp /> : <FaChevronDown />}
                </div>
            </div>
            {expanded && (
                <>
                    {loading ? (
                        <Loading />
                    ) : termOne.length === 0 && termTwo.length === 0 ? (
                        <div className='flex items-center justify-between w-full tablet:px-2  py-1'>
                            <div>No result found</div>
                            <div className=''>
                                <button className='bg-red-400 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center' onClick={togglePopUp}><FaCloudUploadAlt /></button>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full tablet:px-2 ">
                            <div className="">
                                <div className='flex items-center justify-between '>
                                    <h1 className="text-xl font-medium mb-3">
                                        Term I
                                    </h1>
                                    <div className=''>
                                        <button className='bg-red-400 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center' onClick={togglePopUp}><FaCloudUploadAlt /></button>
                                    </div>
                                </div>
                                <div className="rounded-lg shadow-md  border-2 border-gray-400">
                                    <AcademicTopTile heading={["Subject", 'Obtained Practical Marks', 'Total Practical Marks', 'Obtained Marks', "Total Marks", "Action"]} />
                                    <AcademicMiddleTile details={termOne} email={email} term={1} />
                                    <AcademicBottonTile value={["", 'GPA', "8.2"]} />
                                </div>
                            </div>

                            {termTwo.length > 0 ? (
                                <div className="w-full tablet:px-2">
                                    <div className='flex items-center justify-between '>
                                        <h1 className="text-xl font-medium mb-3">
                                            Term II
                                        </h1>
                                        <div className=''>
                                            <button className='bg-red-400 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center' onClick={togglePopUp}><FaCloudUploadAlt /></button>
                                        </div>
                                    </div>
                                    <div className="rounded-lg shadow-md  border-2 border-gray-400">
                                        <AcademicTopTile heading={["Subject", 'Obtained Practical Marks', 'Total Practical Marks', 'Obtained Marks', "Total Marks","Action"]} />
                                        <AcademicMiddleTile details={termTwo} email={email} term={2} />
                                        <AcademicBottonTile value={["", 'GPA', "8.2"]} />
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}

                            {termFinal.length > 0 ? (
                                <div className="w-full tablet:mx-2">
                                    <div className='flex items-center justify-between '>
                                        <h1 className="text-xl font-medium mb-3">
                                            Final
                                        </h1>
                                        <div className=''>
                                            <button className='bg-red-400 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center' onClick={togglePopUp}><FaCloudUploadAlt /></button>
                                        </div>
                                    </div>
                                    <div className="rounded-lg shadow-md  border-2 border-gray-400">
                                        <AcademicTopTile heading={["Subject", 'Obtained Practical Marks', 'Total Practical Marks', 'Obtained Marks', "Total Marks"]} />
                                        <AcademicMiddleTile details={termFinal} email={email} />
                                        <AcademicBottonTile value={["", 'GPA', "8.2"]} />
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    )
                    }
                </>
            )}
            {
                popUp && (
                    <NewResult onClose={togglePopUp} email={email} name={name} />
                )
            }
        </div>
    )
}

export default UploadResultRow