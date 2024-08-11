import React, { useState, useContext, useEffect } from 'react';
import { Link, Outlet } from "react-router-dom";
import NewTile from './utils/NewTile';
import Loading from '../../LoadingScreen/Loading';
import axios from 'axios'
import AuthContext from '../../Context/AuthContext';
import { BASE_URL_Student_Leave } from '../../Config';
import { ToastContainer, toast } from 'react-toastify';

function StudentLeave() {
    const [selectedLink, setSelectedLink] = useState('/Teacher-Dashboard/studentleave/new');
    const [status, setStatus] = useState('Pending');
    const { authState } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(4);
    const [allDataFetched, setAllDataFetched] = useState(false);

    const handleLinkSelect = (link) => {
        setSelectedLink(link);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        setStart(0);
        setData([]);
        setAllDataFetched(false);
    };


    useEffect(() => {
        setLoading(true);
        fetchUserData();
    }, [authState.accessToken, status]);

    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

    useEffect(() => {
        if (start !== 0) {
            fetchUserData();
        }
    }, [start, status]);

    const fetchUserData = async () => {
        setLoading(true);
        console.log(status)
        try {
            const today = new Date();
            var month = today.getMonth()+1 < 10 ? `0${today.getMonth()+1}` : today.getMonth()+1; 
            const formattedDate = `${today.getFullYear()}-${month}-${today.getDate()}`;
            const response = await axios.get(`${BASE_URL_Student_Leave}/leave/fetch/classTeacher?start=${start}&end=${end}&status=${status}&date=${formattedDate}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            // console.log("API response:", response.data);
            // setData(response.data || []);

            const leaves = response.data.StudentsLeaves.length;
            console.log("API response:", response.data.StudentsLeaves, leaves);
            if (leaves < end) {
                toast.success('All data fetched');
                console.log('All data fetched');
                setAllDataFetched(true);
            }
            setData(prevData => [...prevData, ...response.data.StudentsLeaves]);
            console.log("API responserrrrrr:", data);

            // setData(response.data || []);

        } catch (err) {
            setError(err.message);

        }
        finally {
            setLoading(false);

        }
    };


    if (loading) {
        return <Loading />;
    }


    return (
        <div className=" w-full flex flex-col px-2 mobile:max-tablet:px-0 h-screen  items-start  mb-3">
            <ToastContainer />
            <div className='flex items-center justify-between w-full mobile:max-tablet:px-2 mt-3'>
                <h1 className='container mx-auto py-3  font-medium text-2xl mobile:max-tablet:text-lg'>Student Leave</h1>
                <select
                    value={status}
                    onChange={handleStatusChange}
                    className="border border-gray-300 rounded-lg shadow-md px-2 py-2 mb-2 mobile:max-tablet:text-sm"
                >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>
            {/* <div className=" flex  mr-3 items-center justify-between">
                <div className=" flex  gap-2 ">
                    <Link
                        to={'/Teacher-Dashboard/class_activity/studentleave/new'}
                        className={`text-xl font-medium px-2 rounded-lg border border-gray-300 py-1 ${selectedLink === '/Teacher-Dashboard/studentleave/new' ? 'bg-secondary ' : 'bg-gray-200'}`}
                        onClick={() => handleLinkSelect('/Teacher-Dashboard/studentleave/new')}
                    >
                        New Leave
                    </Link>
                    <Link
                        to={'/Teacher-Dashboard/class_activity/studentleave/approved'}
                        className={`text-xl font-medium px-2 rounded-lg border border-gray-300 py-1 ${selectedLink === '/Teacher-Dashboard/studentleave/approved' ? 'bg-secondary ' : 'bg-gray-200'}`}
                        onClick={() => handleLinkSelect('/Teacher-Dashboard/studentleave/approved')}
                    >
                        Approved Leave
                    </Link>
                    <Link
                        to={'/Teacher-Dashboard/class_activity/studentleave/rejected'}
                        className={`text-xl font-medium px-2 rounded-lg border border-gray-300 py-1 ${selectedLink === '/Teacher-Dashboard/studentleave/rejected' ? 'bg-secondary ' : 'bg-gray-200'}`}
                        onClick={() => handleLinkSelect('/Teacher-Dashboard/studentleave/rejected')}
                    >
                        Rejected Leave
                    </Link>
                </div>


            </div> */}
            <div className='w-full mr-3'>
                <NewTile data={data} />
                {!allDataFetched && (
                    <h1 className='text-blue-500 hover:text-blue-800 mt-3 cursor-pointer text-center' onClick={handleViewMore}>View More</h1>
                )}
            </div>
            {/* <hr className=' bg-gray-300 h-1 w-full rounded-full mt-2' />
            <Outlet /> */}

        </div>
    )
}

export default StudentLeave