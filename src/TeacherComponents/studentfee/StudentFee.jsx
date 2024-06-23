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

    useEffect(() => {
        if (!loading) {
            // fetchDetails();
        }
    }, [details]);

    const fetchDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://feeapi.onrender.com/fee/fetch/classTeacher?&start=0&end2`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            if (response.status === 200) {
                console.log("API response:", response.data);
                setDetails(response.data.output || []);
            }

        } catch (err) {
            console.log(err);
            
        }
        finally{
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

            <h1 className="text-2xl font-medium mb-2">Student Fee</h1>

            <div className=' mt-4   w-full'>
                {/* <Selection setFilter={setFilter} /> */}
                <Selection />
            </div>

            <div className='  rounded-lg border shadow-md  w-full mb-2'>
                <Header headings={['Sr. No.','Roll No.','Name', 'Total Fee', 'Fine','Discount','Paid','Payable']} />
                {/* {filterDetails.map((detail, index) => (

                    <div key={index} className='border flex justify-between items-center py-2 pl-2  w-full font-normal text-base ' >
                        <div className=' w-40'>{detail.serial}</div>
                        <div className=' w-40'>{detail.name}</div>
                        <div className=' w-40'>{detail.record}</div>
                        <div className={`w-40 ${detail.status === 'Paid' ? 'text-green-400' : 'text-red-400'}`}>{detail.amount}</div>
                    </div>

                ))} */}
                {loading ? (
                    <Loading />
                ) : (
                    details.length > 0 ? (
                        <div>
                            {details.map((details, index) => (
                                <div key={index} className='flex justify-between w-full py-2 pl-2 h-fit border '>
                                      <h1 className="w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                        {index+1}
                                    </h1>
                                     <h1 className="w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                        {details.rollNumber}
                                    </h1>
                                    <h1 className="w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                        {details.name}
                                    </h1>
                                    <h1 className="w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                        {details.totalfee}
                                    </h1>
                                    <h1 className="w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                        {details.fine}
                                    </h1>
                                    <h1 className="w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                        {details.discountAmount}
                                    </h1>
                                    <h1 className="w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                        {details.paid}
                                    </h1>     
                                    <h1 className="w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                        {details.payableFee}
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
