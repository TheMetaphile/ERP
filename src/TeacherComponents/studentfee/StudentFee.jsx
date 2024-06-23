import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../Context/AuthContext';
import Loading from '../../LoadingScreen/Loading';
import axios from 'axios'
import Selection from './utils/Selection';
import Header from '../../AdminComponents/Home/utils/TeachersDetails/LeftCard/Header'

function StudentFee() {
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([])
    const { authState } = useContext(AuthContext);
    const [filter, setFilter] = useState('')
    useEffect(() => {
        if (!loading && details.length < 1) {
            fetchDetails();
        }
    }, [authState.accessToken]);

    const fetchDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://feeapi.onrender.com/fee/fetch/classTeacher?&start=0&end=20`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            if (response.status === 200) {
                console.log("API response:", response.data);
                setDetails(response.data.output || []);
                console.log("here", response.data);
            }

        } catch (err) {
            console.log("r", err);

        }
        finally {
            setLoading(false);
        }
    }
    // const [filter,setFilter]=useState();
    // const details = [

    //     { serial: '01', name: 'Shailesh', record: 'Term 1,2', amount: 'Rs 4000', status: 'Paid' },
    //     { serial: '02', name: 'Abhishek', record: 'Term 1,2', amount: 'Rs 4000', status: 'Paid' },
    //     { serial: '03', name: 'Shailesh', record: 'Term 1,2', amount: 'Rs 4000', status: 'UnPaid' },
    //     { serial: '04', name: 'Shailesh', record: 'Term 1,2', amount: 'Rs 4000', status: 'Paid' },
    //     { serial: '05', name: 'Shailesh', record: 'Term 1,2', amount: 'Rs 4000', status: 'UnPaid' },
    //     { serial: '06', name: 'Shailesh', record: 'Term 1,2', amount: 'Rs 4000', status: 'Paid' },
    //     { serial: '07', name: 'Shailesh', record: 'Term 1,2', amount: 'Rs 4000', status: 'Paid' },
    //     { serial: '08', name: 'Shailesh', record: 'Term 1,2', amount: 'Rs 4000', status: 'Paid' },
    //     { serial: '09', name: 'Shailesh', record: 'Term 1,2', amount: 'Rs 4000', status: 'UnPaid' },
    //     { serial: '10', name: 'Shailesh', record: 'Term 1,2', amount: 'Rs 4000', status: 'Paid' },

    // ];

    // const filterDetails= filter ?details.filter(detail=>detail.status === filter): details;
    return (
        <div className="overflow-y-auto w-full items-start  px-2 no-scrollbar">
            <div className=' my-3 flex  w-full justify-between'>
                <h1 className="text-2xl font-medium mb-2">Student Fee</h1>

                <Selection setFilter={setFilter} />
            </div>

            <div className='  rounded-lg border shadow-md border-gray-300 w-full mb-2'>
                <Header headings={['Sr. No.', 'Roll No.', 'Name', 'Total Fee', 'Fine', 'Discount', 'Paid', 'Payable','Pending']} />
                
                {loading ? (
                    <Loading />
                ) : (
                    details.length > 0 ? (

                        <div>
                            {details.map((details, index) => (
                                filter === 'Paid'
                                    ?
                                    details.payableFee - details.paid == 0
                                        ?
                                        <div key={index} className='flex justify-between w-full py-2 pl-2 h-fit border '>
                                            <h1 className="w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                {index + 1}
                                            </h1>
                                            <h1 className="w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                {details.rollNumber}
                                            </h1>
                                            <h1 className="w-40 overflow-hidden text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                {details.name}
                                            </h1>
                                            <h1 className="w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                {details.totalfee}
                                            </h1>
                                            <h1 className="w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                {details.fine}
                                            </h1>
                                            <h1 className="w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                {details.discountAmount}
                                            </h1>
                                            <h1 className={`w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap`}>
                                                {details.paid}
                                            </h1>
                                            <h1 className="w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                {details.payableFee}
                                            </h1>
                                            <h1 className={`w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap ${(details.payableFee - details.paid) === 0 ? "text-green-500" : "text-red-500"}`}>
                                                {details.payableFee - details.paid}
                                            </h1>

                                        </div>
                                        :
                                        <div></div>
                                    :
                                    filter === 'Pending'
                                        ?
                                        details.payableFee - details.paid > 0
                                            ?
                                            <div key={index} className='flex justify-between w-full py-2 pl-2 h-fit border '>
                                                <h1 className="w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                    {index + 1}
                                                </h1>
                                                <h1 className="w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                    {details.rollNumber}
                                                </h1>
                                                <h1 className="w-40 overflow-hidden text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                    {details.name}
                                                </h1>
                                                <h1 className="w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                    {details.totalfee}
                                                </h1>
                                                <h1 className="w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                    {details.fine}
                                                </h1>
                                                <h1 className="w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                    {details.discountAmount}
                                                </h1>
                                                <h1 className={`w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap`}>
                                                    {details.paid}
                                                </h1>
                                                <h1 className="w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                    {details.payableFee}
                                                </h1>
                                                <h1 className={`w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap ${(details.payableFee - details.paid) === 0 ? "text-green-500" : "text-red-500"}`}>
                                                {details.payableFee - details.paid}
                                            </h1>
                                            </div>
                                            :
                                            <div></div>
                                        :
                                        <div key={index} className='flex justify-between w-full py-2 pl-2 h-fit border '>
                                            <h1 className="w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                {index + 1}
                                            </h1>
                                            <h1 className="w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                {details.rollNumber}
                                            </h1>
                                            <h1 className="w-40 overflow-hidden text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                {details.name}
                                            </h1>
                                            <h1 className="w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                {details.totalfee}
                                            </h1>
                                            <h1 className="w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                {details.fine}
                                            </h1>
                                            <h1 className="w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                {details.discountAmount}
                                            </h1>
                                            <h1 className={`w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap`}>
                                                {details.paid}
                                            </h1>
                                            <h1 className="w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                {details.payableFee}
                                            </h1>
                                            <h1 className={`w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap ${(details.payableFee - details.paid) === 0 ? "text-green-500" : "text-red-500"}`}>
                                                {details.payableFee - details.paid}
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
    )
}

export default StudentFee
