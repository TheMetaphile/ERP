import React, { useState, useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../LoadingScreen/Loading'
import axios from 'axios'
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL_Fee } from '../../../Config';
import useRazorpay from "react-razorpay";

function FeeDetailsSubAdmin() {
    const [selectedClass, setSelectedClass] = useState("9th");
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([])
    const { authState } = useContext(AuthContext);
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(sessions[1]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(5);
    const [allDataFetched, setAllDataFetched] = useState(false);
    const [mode, setMode] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [title, setTitle] = useState('');
    const [Razorpay] = useRazorpay();
    const [clickedIndex, setClickedIndex] = useState(null);

    const handleClick = (index) => {
        setClickedIndex(index);
    };

    const handleClassChange = (e) => {
        setDetails([]);
        setAllDataFetched(false);
        setSelectedClass(e.target.value);
        setStart(0);
    };

    const handleModeChange = (e, student) => {
        setMode(e.target.value);
        setSelectedStudent(student);
        setIsModalOpen(true);
    };
    const handleChange = (event) => {
        setSelectedSession(event.target.value);
    };

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const newSessions = [];

        for (let i = 0; i < 5; i++) {
            const startYear = currentYear - i;
            const endYear = startYear + 1;
            newSessions.push(`${startYear}-${endYear.toString().slice(-2)}`);
        }

        setSessions(newSessions);
    }, []);

    useEffect(() => {
        if (selectedClass !== "") {
            fetchDetails();
        }
    }, [selectedClass]);

    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

    useEffect(() => {
        if (start !== 0) {
            fetchDetails();
        }
    }, [start]);

    const fetchDetails = async () => {
        console.log(selectedClass)
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL_Fee}/fee/fetch/admin?class=${selectedClass}&start=${start}&end=${end}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            if (response.status === 200) {
                console.log(response.data);
                const list = response.data.output.length;
                if (list < end) {
                    toast.success('All data fetched');
                    console.log('All data fetched')
                    setAllDataFetched(true);
                }
                setDetails(prevUsers => [...prevUsers, ...response.data.output]);
                setLoading(false);

            }

        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    const handleConfirm = () => {
        console.log(`Mode: ${mode}, Title: ${title}, Student:`, selectedStudent);
        setIsModalOpen(false);

        // const options = {
        //     'key': 'rzp_live_GFqD7mHBThythU',
        //     'amount': selectedStudent.payableFee * 100,
        //     'name': 'METAPHILE',
        //     'description': title,
        //     'retry': { 'enabled': true, 'max_count': 1 },
        //     'send_sms_hash': true,
        //     'prefill': {
        //         'contact': '8979020025',
        //         'email': 'bhanu68tyagi@gmail.com'
        //     },
        //     handler: function (response) {
        //         const datee = new Date().toISOString().split('T')[0];
        //         const email = authState.userDetails.email;
        //         const installmentId = `${datee}-${email}`;
        //         console.log(response, 'resssssssss', datee, email, installmentId)

        //         postPaymentDetails({
        //             email: email, // or the user's email
        //             amount: selectedStudent.payableFee,
        //             date: datee,
        //             status: "Success",
        //             doc_id: params.deadline,
        //             installment_id: installmentId, // or a relevant installment id
        //             order_id: "NA",
        //             payment_id: response.razorpay_payment_id,
        //             signature: "Online"
        //         });

        //     },

        // };

        // const rzp1 = new Razorpay(options);

        // rzp1.on("payment.failed", function (response) {
        //     const datee = new Date().toISOString().split('T')[0];
        //     const email = authState.userDetails.email;
        //     const installmentId = `${datee}-${email}`;
        //     console.log(response, 'fffffffffff', datee, email, installmentId);

        //     postPaymentDetails({
        //         email: email, // or the user's email
        //         amount: params.amount,
        //         date: datee,
        //         status: "Failed",
        //         doc_id: params.deadline,
        //         installment_id: installmentId, // or a relevant installment id
        //         order_id: "NA",
        //         payment_id: response.error.metadata.payment_id,
        //         signature: "Online" // no signature in case of failure
        //     });
        // });

        // rzp1.open();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className=" flex flex-col px-3  mobile:max-tablet:px-0   items-start mt-2  mb-3 ">
            <ToastContainer />

            <div className='flex w-full justify-between whitespace-nowrap mobile:max-tablet:flex-col'>
                <h1 className="text-2xl p-2">Student Fee Details</h1>

                <div className='flex justify-end gap-2'>
                    <select
                        id="sessionSelector"
                        value={selectedSession}
                        onChange={handleChange}
                        className="mobile:max-tablet:mx-4 border rounded-md w-fit mobile:max-tablet:px-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                    >
                        {sessions.map((session, index) => (
                            <option key={index} value={session}>
                                {session}
                            </option>
                        ))}
                    </select>
                    <select
                        className="mobile:max-tablet:mx-4 border rounded-md w-fit  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
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
            </div>

            <div className='overflow-auto w-full'>
                <div className=' mt-2  border border-black rounded-lg'>
                    <div className="flex justify-between  py-2  bg-bg_blue  rounded-t-lg border border-b-2  whitespace-nowrap">
                        <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Roll No.
                        </h1>
                        <h1 className="w-44 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Name
                        </h1>
                        <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Section
                        </h1>
                        <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Session
                        </h1>
                        <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Total Fee
                        </h1>
                        <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Discount
                        </h1>
                        <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Fine
                        </h1>
                        <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Paid
                        </h1>
                        <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Payable
                        </h1>
                        <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Mode
                        </h1>
                    </div>
                    {loading ? (
                        <Loading />
                    ) : (
                        details.length > 0 ? (
                            <div>
                                {details.map((details, index) => (
                                    <div key={index} className={`px-1 flex justify-between w-full py-2 pl-2 h-fit border gap-x-4 items-center ${clickedIndex === index ? 'bg-secondary' : ''}`} onClick={() => handleClick(index)}>
                                        <h1 className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.rollNumber}
                                        </h1>
                                        <h1 className="w-44 text-lg flex items-center text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            <span className='mr-2'>
                                                <img src={details.profileLink} alt="profile pic" className='w-10 h-10 rounded-full ' />
                                            </span>
                                            {details.name}
                                        </h1>
                                        <h1 className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.section}
                                        </h1>
                                        <h1 className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.session}
                                        </h1>
                                        <h1 className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.totalfee}
                                        </h1>
                                        <h1 className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.discountAmount}
                                        </h1>
                                        <h1 className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.fine}
                                        </h1>
                                        <h1 className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.paid}
                                        </h1>
                                        <h1 className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.payableFee}
                                        </h1>
                                        <select
                                            className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm rounded-full bg-secondary py-2"
                                            value={mode}
                                            onChange={(e) => handleModeChange(e, details)}
                                        >
                                            <option value="none">None</option>
                                            <option value="Cash">Cash</option>
                                            <option value="Online">Online</option>
                                            <option value="RTGS">RTGS</option>
                                            <option value="Cheque">Cheque</option>
                                            <option value="Demand Draft">Demand Draft</option>
                                        </select>
                                    </div>
                                ))}
                                {!allDataFetched && (
                                    <div colSpan="4" className="text-center">
                                        <h1 className='text-blue-500 hover:text-blue-800 mt-3 cursor-pointer' onClick={handleViewMore}>View More</h1>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className='text-center mt-2'>No Fee Details available</div>
                        )
                    )}
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-4 rounded-lg z-10 w-2/5">
                        <h2 className="text-xl mb-4">Confirm Payment</h2>
                        {selectedStudent && (
                            <div className='flex gap-20 items-center'>
                                <div>
                                    <p><strong>Roll No:</strong> {selectedStudent.rollNumber}</p>
                                    <p><strong>Name:</strong> {selectedStudent.name}</p>
                                    <p><strong>Class:</strong> {selectedClass}</p>
                                    <p><strong>Section:</strong> {selectedStudent.section}</p>
                                    <p><strong>Session:</strong> {selectedStudent.session}</p>
                                    <p><strong>Total Fee:</strong> {selectedStudent.totalfee}</p>
                                </div>
                                <div>
                                    <p><strong>Discount:</strong> {selectedStudent.discountAmount}</p>
                                    <p><strong>Fine:</strong> {selectedStudent.fine}</p>
                                    <p><strong>Paid:</strong> {selectedStudent.paid}</p>
                                    <p><strong>Payable:</strong> {selectedStudent.payableFee}</p>
                                    <p><strong>Mode:</strong> {mode}</p>
                                </div>
                            </div>
                        )}
                        <input
                            type="text"
                            placeholder="Enter Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border rounded p-2 w-full mb-4"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded"
                                onClick={handleConfirm}
                            >
                                Confirm
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FeeDetailsSubAdmin;

