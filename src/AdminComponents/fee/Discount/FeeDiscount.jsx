import React, { useState, useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../LoadingScreen/Loading';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import CreateDiscount from './CreateDiscount';
import { MdDeleteForever } from "react-icons/md";
import { BASE_URL_Fee } from '../../../Config';

function FeeDiscount() {
    const [selectedClass, setSelectedClass] = useState("9th");
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const { authState } = useContext(AuthContext);
    const [showDiscountStructure, setShowDiscountStructure] = useState(false);

    const handleClassChange = (e) => {
        setSelectedClass(e.target.value);
        setShowDiscountStructure(false);
    };
    const sessions = [
        '2020-21',
        '2021-22',
        '2022-23',
        '2023-24',
        '2024-25',
    ];

    // State to store the selected session
    const [selectedSession, setSelectedSession] = useState(sessions[3]);
    const handleChange = (event) => {
        setSelectedSession(event.target.value);
    };
    useEffect(() => {
        if (selectedClass !== "") {
            fetchDiscount();
        }
    }, [selectedClass]);

    const fetchDiscount = async () => {
        console.log(selectedClass);
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL_Fee}/fee/fetch/discount?end=20&start=0&class=${selectedClass}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            if (response.status === 200) {
                console.log("API response:", response.data);
                setDetails(response.data || []);
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    const handleDelete = async (index, id) => {
        console.log(id)
        try {
            const response = await axios.delete(`${BASE_URL_Fee}/fee/delete/discount?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            }
            );

            if (response.status === 200) {
                const updatedDiscount = details.filter((_, i) => i !== index);
                setDetails(updatedDiscount);
                toast.success('Discount Deleted Successfully');
            }
        } catch (error) {
            console.error("Error deleting Discount:", error);
            toast.error('Error deleting Discount');
        }
    };

    return (
        <div className="flex flex-col px-3 mobile:max-tablet:px-0  overflow-auto items-start mt-2  mb-3 ">
            <ToastContainer />
            <div className='flex justify-between w-full items-center px-2'>
                <h1 className="text-2xl p-2 whitespace-nowrap">Student Fee Discount</h1>
                <div className='flex w-full justify-end gap-1 items-center'>

                    <select
                        id="sessionSelector"
                        value={selectedSession}
                        onChange={handleChange}
                        className="mx-4 border rounded-md w-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                    >
                        {sessions.map((session, index) => (
                            <option key={index} value={session}>
                                {session}
                            </option>
                        ))}
                    </select>

                    <select
                        className="mx-4 border rounded-md w-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                        id="Class"
                        name="Class"
                        value={selectedClass}
                        onChange={handleClassChange}
                        required
                    >
                        <option value="" >Select Class</option>
                        <option value="Pre-Nursery">Pre-Nursery</option>
                        <option value="Nursery">Nursery</option>
                        <option value="L.K.J">L.K.J</option>
                        <option value="U.K.J">U.K.J</option>
                        <option value="1st">1st</option>
                        <option value="2nd">2nd</option>
                        <option value="3rd">3rd</option>
                        <option value="4th">4th</option>
                        <option value="5th">5th</option>
                        <option value="6th">6th</option>
                        <option value="7th">7th</option>
                        <option value="8th">8th</option>
                        <option value="9th">9th</option>
                        <option value="10th">10th</option>
                        <option value="11th">11th</option>
                        <option value="12th">12th</option>
                    </select>
                    <h1
                        className="text-lg h-fit py-1 px-2 text-center bg-purple-200 rounded-lg hover:cursor-pointer"
                        onClick={() => setShowDiscountStructure(!showDiscountStructure)}
                    >
                        {showDiscountStructure ? 'Cancel' : 'Add'}
                    </h1>
                </div>

            </div>


            <div className='w-full'>
                {showDiscountStructure
                    ? <CreateDiscount />
                    : <div></div>
                }

                <div className=' mt-4 w-full overflow-auto  border border-black rounded-lg'>
                    <div className="px-2 flex justify-between w-fit py-2 text-center  bg-bg_blue  rounded-t-lg border border-b-2  whitespace-nowrap ">
                        <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            RollNo.
                        </h1>
                        <h1 className="w-44 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Student Name
                        </h1>
                        <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Current Class
                        </h1>
                        <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Title
                        </h1>
                        <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Session
                        </h1>
                        <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Discount
                        </h1>
                        <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            By
                        </h1>
                        <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Employee ID
                        </h1>
                        <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Action
                        </h1>
                    </div>

                    {loading ? (
                        <Loading />
                    ) : (
                        details.length > 0 ? (
                            <div>
                                {details.map((details, index) => (
                                    <div key={index} className='flex w-fit text-center justify-between  py-2 pl-2 h-fit border '>
                                        <h1 className="w-36 text-lg  mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.to.rollNumber}
                                        </h1>
                                        <h1 className="w-44 text-lg  mobile:max-tablet:text-sm mobile:max-tablet:font-sm flex whitespace-nowrap">
                                            <img src={details.to.profileLink} alt="profileLink" className='h-10 w-10 rounded-full mr-3' />
                                            {details.to.name}
                                        </h1>
                                        <h1 className="w-36 text-lg  mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.to.currentClass}
                                        </h1>
                                        <h1 className="w-36 text-lg  mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.field}
                                        </h1>
                                        <h1 className="w-36 text-lg  mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.session}
                                        </h1>
                                        <h1 className="w-36 text-lg  mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.percentage}
                                        </h1>
                                        <h1 className="w-36 text-lg  mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.by.name}
                                        </h1>
                                        <h1 className="w-36 text-lg  mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.by.employeeId}
                                        </h1>
                                        <div className='w-36 text-lg flex items-center justify-center hover:cursor-pointer text-red-500 font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap'>
                                            <span>Delete</span>
                                            <MdDeleteForever
                                                className="text-red-500 hover:text-red-700 ml-2"
                                                onClick={() => handleDelete(index, details._id)}
                                            />
                                        </div>

                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='text-center mt-2'>No Fee Discount available</div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default FeeDiscount;