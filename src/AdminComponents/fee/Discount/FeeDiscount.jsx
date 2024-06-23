import React, { useState, useContext, useEffect } from 'react';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../LoadingScreen/Loading';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import CreateDiscount from './CreateDiscount';

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

    useEffect(() => {
        if (selectedClass !== "") {
            fetchDiscount();
        }
    }, [selectedClass]);

    const fetchDiscount = async () => {
        console.log(selectedClass);
        setLoading(true);
        try {
            const response = await axios.get(`https://feeapi.onrender.com/fee/fetch/discount?end=20&start=0&class=${selectedClass}`, {
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

    const handleDelete = async (index,id) => {
        console.log(id)
        try {
            const response = await axios.delete(`https://feeapi.onrender.com/fee/delete/discount?id=${id}`,{
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
        <div className="flex flex-col px-3 mobile:max-tablet:px-0  overflow-y-auto items-start mt-2  mb-3 no-scrollbar">
            <ToastContainer />
            <div className='flex justify-between w-full items-center'>
                <h1 className="text-2xl p-2">Student Fee Discount</h1>
                <h1 
                    className="text-xl p-2 bg-purple-200 rounded-lg cursor-pointer" 
                    onClick={() => setShowDiscountStructure(!showDiscountStructure)}
                >
                    {showDiscountStructure ? 'Cancel' : 'Add'}
                </h1>
            </div>
            <div>
                <select
                    className="mx-4 border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
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
            </div>

            <div className='w-full'>
                {showDiscountStructure
                    ? <CreateDiscount />
                    : <div></div>
                }

                <div className='px-2 mt-4 w-full'>
                    <div className="flex justify-between w-full py-2 pl-2 bg-bg_blue h-fit rounded-t-lg border border-black">
                        <h1 className="w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            RollNo.
                        </h1>
                        <h1 className="w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Student Name
                        </h1>
                        <h1 className="w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Current Class
                        </h1>
                        <h1 className="w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Title
                        </h1>
                        <h1 className="w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Session
                        </h1>
                        <h1 className="w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Discount
                        </h1>
                        <h1 className="w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            By
                        </h1>
                        <h1 className="w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Employee ID
                        </h1>
                        <h1 className="w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Action
                        </h1>
                    </div>

                    {loading? (
                        <Loading />
                    ) : (
                        details.length > 0? (
                            <div>
                                {details.map((details, index) => (
                                    <div key={index} className='flex justify-between w-full py-2 pl-2 h-fit border '>
                                        <h1 className="w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.to.rollNumber}
                                        </h1>
                                        <h1 className="w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.to.name}
                                        </h1>
                                        <h1 className="w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.to.currentClass}
                                        </h1>
                                        <h1 className="w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.field}
                                        </h1>
                                        <h1 className="w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.session}
                                        </h1>
                                        <h1 className="w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.percentage}
                                        </h1>
                                        <h1 className="w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.by.name}
                                        </h1>
                                        <h1 className="w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.by.employeeId}
                                        </h1>
                                        <div className='w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap'>
                                            <button className='bg-red-400 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow-md' onClick={() => handleDelete(index,details._id)}>Delete</button>
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