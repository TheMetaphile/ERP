import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../Context/AuthContext';
import SelectClass from './utils/SelectClass';
import SelectSubject from './utils/SelectSubject';
import SelectTeacher from "./utils/SelectTeacher";
import MyDoubtTile from "./utils/MyDoubtTile";
import { IoCameraOutline } from "react-icons/io5";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { BASE_URL_AskDoubt } from '../../Config';
import Loading from '../../LoadingScreen/Loading';
import { Link } from 'react-router-dom';

export default function MyDoubts() {

    const { authState } = useContext(AuthContext);
    const [selectedSubject, setSelectedSubject] = useState('Subject');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [doubtDescription, setDoubtDescription] = useState('');
    const [modalSubject, setModalSubject] = useState(null);

    const handleSubjectSelect = (selectedSubject) => {
        setSelectedSubject(selectedSubject);
    };

    const handleAskDoubt = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleModalSubject = (event) => {
        setModalSubject(event.target.value);
    };

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const handleSubmitDoubt = async () => {
        if (!modalSubject || !doubtDescription) {
            toast.error('Please fill all fields');
            return;
        }
        setLoading(true)
        const datee = getCurrentDate();
        try {
            const response = await axios.post(`${BASE_URL_AskDoubt}/doubts/create`, {
                question: doubtDescription,
                date: datee,
                subject: modalSubject
            },
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
                    }
                }
            );
            if (response.status === 200) {
                console.log(response.data);
                if (modalSubject === selectedSubject || selectedSubject === 'Subject') {
                    console.log('before', data);
                    setData(prevData => [response.data, ...prevData]);
                    console.log('after', data);

                }
                toast.success('Doubt Send successfully!');
                setDoubtDescription('');
                setIsModalOpen(false);

            }
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false)
    };



    useEffect(() => {

        setIsLoading(true);
        fetchDoubt();

    }, [selectedSubject]);

    const fetchDoubt = async () => {
        try {
            var params = '';
            if(selectedSubject != 'Subject'){
                console.log('pp')
                params=`subject=${selectedSubject}`
            }
            const response = await axios.get(`${BASE_URL_AskDoubt}/doubts/fetch/student?${params}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            console.log("API response:", response.data);
            setData(response.data.doubts);
            console.log("API responserrrrrr:", data);

            setIsLoading(false);
        } catch (err) {
            toast.error(err.message);
        }
    };




    return (
        <div className="flex flex-col mobile:max-laptop:flex-col-reverse w-full">
            <ToastContainer />
            <div className='flex justify-between bg-v'>
                <Link
                    to={'/Student-Dashboard/askdoubt/mydoubts'}
                    className={`text-2xl font-medium w-fit rounded-lg `}
                    onClick={() => handleLinkSelect('/Student-Dashboard/askdoubt/mydoubts')}
                >
                    My Doubts
                </Link>
                <div className="flex md:order-2 md:w-full lg:w-fit md:ml-2 ">
                    <SelectSubject onSelect={handleSubjectSelect} />
                    <div className="ml-auto md:hidden">
                        <button className='bg-purple-400 rounded-lg shadow-md px-3 py-2 text-white' onClick={handleAskDoubt}>+ Ask A Doubt</button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col laptop:mr-3 mt-1 mb-3 no-scrollbar w-full">
                {isLoading ? (
                    <Loading />
                ) : data.length === 0 ? (
                    <div className='text-center w-full'>No doubts asked</div>
                ) : (
                    <MyDoubtTile data={data} />

                )}


            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-1/2">
                        <h2 className="text-base font-medium mb-4">To Ask a doubt please select class and subject and write your Question? You can also attached photos for references.</h2>

                        <div className="flex flex-col tablet:flex-row justify-between items-center gap-3 w-full ">
                            <div className="flex-1 mobile:max-tablet:w-full">
                                <select
                                    className=" shadow-md border border-grey-300 rounded-lg p-2 w-full ml-2 mr-2  mb-2"
                                    onChange={handleModalSubject}
                                >
                                    {['Hindi', 'Maths', 'English', 'Computer', 'Science', 'Chemistry', 'Physics', 'Sanskrit'].map(
                                        (subject, index) => (
                                            <option key={index} value={subject}>
                                                {subject}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                        </div>

                        <h1 className=" mb-2 mt-2">Your Question</h1>

                        <textarea className="w-full px-3 py-2 mb-4 border rounded-lg" placeholder="Write here.." rows={2} value={doubtDescription}
                            onChange={(e) => setDoubtDescription(e.target.value)}></textarea>

                        <IoCameraOutline className='w-6 h-6 ' />
                        <div className="flex justify-end">
                            <button className="bg-gray-300 rounded-lg px-4 py-2 mr-2" onClick={handleCloseModal}>Cancel</button>
                            <button className="bg-blue-600 text-white rounded-lg px-4 py-2" onClick={handleSubmitDoubt}>{loading ? <Loading /> : 'Submit'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
