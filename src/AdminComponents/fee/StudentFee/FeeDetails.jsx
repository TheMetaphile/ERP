import React, { useState,useContext,useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../LoadingScreen/Loading'
import axios from 'axios'
import AuthContext from '../../../Context/AuthContext';

function FeeDetails() {
    const [selectedClass, setSelectedClass] = useState("9th");
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([])
    const { authState } = useContext(AuthContext);

    const handleClassChange = (e) => {
        setSelectedClass(e.target.value);
    };

    useEffect(() => {
        if (selectedClass !== "") {
            fetchDetails();
        }
    }, [selectedClass]);

    const fetchDetails=async()=>{
        console.log(selectedClass)
        setLoading(true);
        try {
            const response = await axios.get(`https://feeapi.onrender.com/fee/fetch/admin?class=${selectedClass}&start=0&end20`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            if (response.status === 200) {
                console.log("API response:", response.data);
                setDetails(response.data.output || []);
                setLoading(false);
            }

        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    return (
        <div className=" flex flex-col px-3 mobile:max-tablet:px-0 overflow-auto  items-start mt-2  mb-3 ">
            <ToastContainer />
            <h1 className="text-2xl p-2">Student Fee Details</h1>
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

            <div className=' mt-2 w-fit overflow-x-auto no-scrollbar border border-black rounded-lg'>
                <div className="flex justify-between  py-2  bg-bg_blue  rounded-t-lg border border-b-2  whitespace-nowrap">
                <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                        Roll No.
                    </h1>
                    <h1 className="w-40 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                        Name
                    </h1>
                    <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                        Section
                    </h1>
                    <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                        Session
                    </h1>
                    <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                        Total Fee
                    </h1>
                    <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                        Discount
                    </h1>
                    <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                        Fine
                    </h1>
                    <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                        Paid
                    </h1>
                    <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                        Payable
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
                                <div key={index} className='flex justify-between w-full py-2 pl-2 h-fit border gap-x-4'>
                                    <h1 className="w-36 text-lg  mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                        {details.rollNumber}
                                    </h1>
                                    <h1 className="w-40 text-lg  mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                        {details.name}
                                    </h1>
                                    <h1 className="w-36 text-lg  mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                        {details.section}
                                    </h1>
                                    <h1 className="w-36 text-lg  mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                        {details.session}
                                    </h1>
                                    <h1 className="w-36 text-lg  mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                        {details.totalfee}
                                    </h1>
                                    <h1 className="w-36 text-lg  mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                        {details.discountAmount}
                                    </h1>
                                    <h1 className="w-36 text-lg  mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                        {details.fine}
                                    </h1>
                                    <h1 className="w-36 text-lg  mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                        {details.paid}
                                    </h1>
                                    <h1 className="w-36 text-lg  mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                        {details.payableFee}
                                    </h1>
                                    <h1 className="w-36 text-lg  mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                        Pay
                                    </h1>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='text-center mt-2'>No Fee Details available</div>
                    )
                )}
            </div>
        </div>
    );
}

export default FeeDetails;

