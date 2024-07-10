import React, { useState, useContext, useEffect } from 'react';
import { Link, Outlet } from "react-router-dom";
import NewTile from './utils/NewTile';
import Loading from '../../LoadingScreen/Loading';
import axios from 'axios'
import AuthContext from '../../Context/AuthContext';
import { BASE_URL_Student_Leave } from '../../Config';

function StudentLeave() {
    const [selectedLink, setSelectedLink] = useState('/Teacher-Dashboard/studentleave/new');
    const [status, setStatus] = useState('Pending');
    const { authState } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const handleLinkSelect = (link) => {
        setSelectedLink(link);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };



    const fetchUserData = async () => {
        setLoading(true);
        console.log(status)
        try {
            const response = await axios.get(`${BASE_URL_Student_Leave}/leave/fetch/classTeacher?start=${0}&end=${20}&status=${status}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            console.log("API response:", response.data);
            setData(response.data || []);

        } catch (err) {
            setError(err.message);

        }
        finally {
            setLoading(false);

        }
    };
    useEffect(() => {

        if (authState.accessToken) {
            fetchUserData();
        } else {
            setError('No access token available');
            setLoading(false);
        }
    }, [authState.accessToken,status]);

    if (loading) {
        return <Loading />;
    }


    return (
        <div className=" w-full flex flex-col px-2 mobile:max-tablet:px-0 h-screen  items-start  mb-3">
            <div className='flex items-center justify-between w-full'>
                <h1 className='container mx-auto py-3  font-medium text-2xl'>Student Leave</h1>
                <select
                    value={status}
                    onChange={handleStatusChange}
                    className="border border-gray-300 rounded-lg shadow-md px-2 py-2 mb-2"
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
            </div>
            {/* <hr className=' bg-gray-300 h-1 w-full rounded-full mt-2' />
            <Outlet /> */}

        </div>
    )
}

export default StudentLeave