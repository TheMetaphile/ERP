import React, { useState, useContext, useEffect, useRef } from 'react';
import AuthContext from '../../Context/AuthContext';
import Loading from '../../LoadingScreen/Loading';
import axios from 'axios'
import Selection from './utils/Selection';
import Header from '../../AdminComponents/Home/utils/TeachersDetails/LeftCard/Header'
import { BASE_URL_Fee } from '../../Config';

function StudentFee() {
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const { authState } = useContext(AuthContext);
    const [filter, setFilter] = useState('');
    const containerRef = useRef(null);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(14);
    const [loadMore, setLoadMore] = useState(false);

    useEffect(() => {
        fetchDetails();
    }, [start]);

    const fetchDetails = async () => {
        setLoading(true);
        try {
            console.log(start, "-", end);
            const response = await axios.get(`${BASE_URL_Fee}/fee/fetch/classTeacher?&start=${start}&end=${end}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            if (response.status === 200) {
                console.log("API response:", response.data);

                setDetails(prevStudents => [...prevStudents, ...response.data.output]);
            }

        } catch (err) {
            console.log("r", err);

        }
        finally {
            setLoading(false);
        }
    }

    const handleScroll = () => {
        const container = containerRef.current;
        if (container && container.scrollHeight - container.scrollTop <= container.clientHeight + 50) {
            console.log("fetching");
            if (start + end === details.length) {
                setLoadMore(true);
                setStart(prevStart => prevStart + end);
                setEnd(5);
            }

        }
        console.log('iiiiii')
    };

    return (
        <div className=" w-full items-start  px-2 ">
            <div className=' my-3 flex  w-full justify-between'>
                <h1 className="text-2xl font-medium mb-2">Student Fee</h1>

                <Selection setFilter={setFilter} />
            </div>

            <div className='  rounded-lg border shadow-md border-gray-300 h-screen  w-full  overflow-auto' ref={containerRef} onScroll={handleScroll} >
                <Header headings={['Roll No.', 'Name', 'Total Fee', 'Fine', 'Discount', 'Paid', 'Payable', 'Pending']} />

                {loading && details.length == 0 ? (
                    <Loading />
                ) : (
                    details.length > 0 ? (

                        <div className=' ' >
                            {details.map((details, index) => (
                                filter === 'Paid'
                                    ?
                                    details.payableFee - details.paid == 0
                                        ?
                                        <div key={index} className='flex justify-between w-full py-2 pl-2 h-fit border '>

                                            <h1 className="w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                {details.rollNumber}
                                            </h1>
                                            <div className="w-52 overflow-hidden text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap flex items-center gap-1">
                                                <img src={details.profileLink} alt="img" className='w-8 h-8 rounded-full'></img>
                                                <h1 >
                                                    {details.name}
                                                </h1>
                                            </div>
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
                                                    {details.rollNumber}
                                                </h1>
                                                <div className="w-52 overflow-hidden text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap flex items-center gap-1">
                                                    <img src={details.profileLink} alt="img" className='w-8 h-8 rounded-full'></img>
                                                    <h1 >
                                                        {details.name}
                                                    </h1>
                                                </div>
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
                                        <div key={index} className='flex justify-evenly  py-2 pl-2 t border '>

                                            <h1 className="w-40 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                {details.rollNumber}
                                            </h1>
                                            <div className="w-52 overflow-hidden text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap flex items-center gap-1">
                                                <img src={details.profileLink} alt="img" className='w-8 h-8 rounded-full'></img>
                                                <h1 >
                                                    {details.name}
                                                </h1>
                                            </div>
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
