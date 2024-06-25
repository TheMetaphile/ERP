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

export default function MyDoubts() {

    const { authState } = useContext(AuthContext);

    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [date, setDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    const [doubtDescription, setDoubtDescription] = useState('');



    const handleSubjectSelect = (selectedSubject) => {
        setSelectedSubject(selectedSubject);
    };
    const handleSubjectTeacher = (selectedTeacher) => {
        setSelectedTeacher(selectedTeacher);
    };

    const handleAskDoubt = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (authState.accessToken) {
            setIsLoading(true);
            fetchDoubt();
        } else {
            toast.error('No access token available');
            setIsLoading(false);
        }
    }, [authState.accessToken]);

    const fetchDoubt = async () => {
        try {
            const response = await axios.get(`${BASE_URL_AskDoubt}/doubts/fetch/student`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            console.log("API response:", response.data);
            setData(response.data.doubts);
            setIsLoading(false);
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleSubmitDoubt = async () => {
        if (!date || !selectedSubject || !doubtDescription) {
            toast.error('Please fill all fields');
            return;
        }
        setIsLoading(true)
        try {
            const response = await axios.post(`${BASE_URL_AskDoubt}/doubts/create`, {
                question: doubtDescription,
                date: date,
                subject: selectedSubject
            },
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
                    }
                }
            );
            if (response.status === 200) {
                console.log(response.data);
                toast.success('Doubt Send successfully!');
                setDoubtDescription('');
                setIsModalOpen(false);
            }
        } catch (error) {
            toast.error(error.message);
        }
        setIsLoading(false)
    };

    return (
        <div className="flex flex-row mobile:max-laptop:flex-col-reverse w-full">
            <ToastContainer />
            <div className="flex flex-col laptop:mr-3 mt-2 mb-3 no-scrollbar w-full">
                {isLoading ? (
                    <Loading />
                ): data === null ? (
                    <div className='text-center w-full'>No data available</div>
                ):  (
                    <MyDoubtTile data={data} selectedSubject={selectedSubject} selectedTeacher={selectedTeacher} />

                  )}
                
                <div className="mt-3 ml-auto md:hidden">
                    <button className='bg-purple-400 rounded-lg shadow-md px-3 py-1 text-white' onClick={handleAskDoubt}>+ Ask A Doubt</button>
                </div>
            </div>
            <div className="md:order-2 md:w-full lg:w-fit md:ml-2 mt-5">
                <SelectSubject onSelect={handleSubjectSelect} />
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-1/2">
                        <h2 className="text-base font-medium mb-4">To Ask a doubt please select class and subject and write your Question? You can also attached photos for references.</h2>

                        <div className="flex flex-col tablet:flex-row items-center gap-3 w-full py-2 ">
                            <div className="flex-1 mobile:max-tablet:w-full">
                                <label className="text-lg font-normal">Date</label>
                                <input type="date" className="mt-2 border border-black rounded-lg w-full md:w-auto" value={date} onChange={((e) => setDate(e.target.value))} />

                            </div>
                            <div className="flex-1 mobile:max-tablet:w-full">
                                <SelectSubject onSelect={handleSubjectSelect} />
                            </div>
                        </div>

                        <h1 className=" mb-2 mt-2">Your Question</h1>

                        <textarea className="w-full px-3 py-2 mb-4 border rounded-lg" placeholder="Write here.." rows={2} value={doubtDescription}
                            onChange={(e) => setDoubtDescription(e.target.value)}></textarea>

                        <IoCameraOutline className='w-6 h-6 ' />
                        <div className="flex justify-end">
                            <button className="bg-gray-300 rounded-lg px-4 py-2 mr-2" onClick={handleCloseModal}>Cancel</button>
                            <button className="bg-blue-600 text-white rounded-lg px-4 py-2" onClick={handleSubmitDoubt}>{isLoading ? <Loading /> : 'Submit'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
