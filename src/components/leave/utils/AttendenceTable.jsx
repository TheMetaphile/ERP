import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import AuthContext from '../../../Context/AuthContext';
import Loading from '../../../LoadingScreen/Loading';
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever, MdCheck, MdCancel } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL_Student_Leave } from '../../../Config';

export default function AttendenceTable({ additionalData, status }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const { authState } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(null);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(4);
  const [allDataFetched, setAllDataFetched] = useState(false);

  useEffect(() => {
    setStart(0);
    setData([])
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
  }, [start]);

  const fetchUserData = async () => {
    console.log('stat', status)
    try {
      const response = await axios.get(`${BASE_URL_Student_Leave}/leave/fetch/particularStudent?start=${start}&end=${end}&status=${status}`, {
        headers: {
          Authorization: `Bearer ${authState.accessToken}`
        }
      });
      const leaves = response.data.Leaves;
      console.log("API response:", response.data);
      if (leaves.length < end) {
        toast.success('All data fetched');
        console.log('All data fetched')
        setAllDataFetched(true);
      }
      setData(prevData => [...prevData, ...response.data.Leaves]);

      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleClick = (index) => {
    setExpanded(expanded === index ? null : index);
  }



  useEffect(() => {
    if (additionalData && status === 'Pending') {
      console.log('bef', data)
      setData(prevData => [...additionalData, ...prevData]);
      console.log('afte', data)

    }
  }, [additionalData]);

  const handleEditClick = (index, event) => {
    event.stopPropagation();
    setEditRowIndex(index);
    setEditData(data[index]);
    setOriginalData(data[index]);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleUpdate = async (index, event) => {
    event.stopPropagation();
    if (editData.status !== "Pending") {
      toast.error('Cannot update leave that is not pending');
      return;
    }

    const updatedFields = {};
    for (let key in editData) {
      if (editData[key] !== originalData[key]) {
        updatedFields[key] = editData[key];
      }
    }

    if (Object.keys(updatedFields).length === 0) {
      toast.info('No changes detected');
      return;
    }
    try {
      console.log({
        ...updatedFields,
        leaveId: data[index]._id
      });
      const response = await axios.put(`${BASE_URL_Student_Leave}/leave/update`, {
        ...updatedFields,
        leaveId: data[index]._id
      }, {
        headers: {
          Authorization: `Bearer ${authState.accessToken}`,
        }
      });

      if (response.status === 200) {
        const updatedData = [...data];
        updatedData[index] = { ...updatedData[index], ...updatedFields };
        setData(updatedData);
        setEditRowIndex(null);
        toast.success('Leave Updated');
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };



  // console.log(data[index]._id)

  const handleDelete = async (index, event) => {
    event.stopPropagation();
    const id = (data[index]._id);
    console.log(id)
    console.log('stat', (data[index].status))
    if ((data[index].status) === "Pending") {
      try {
        const response = await axios.delete(
          `${BASE_URL_Student_Leave}/leave/delete?leaveId=${id}`,
          {
            headers: {
              Authorization: `Bearer ${authState.accessToken}`
            }
          }
        );

        if (response.status === 200) {
          const updatedData = data.filter((_, i) => i !== index);
          setData(updatedData);
          console.log('succeess')
          toast.success('Leave Deleted');
        }
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      }
    } else {
      toast.error('Cannot delete leave that is not pending');
    }
  };

  const handleCancelEdit = () => {
    setEditRowIndex(null);
    setEditData({});
  };


  return (
    <div className='rounded-lg shadow-md   border mt-1 border-gray-300 w-full'>
      <ToastContainer />
      {loading ? (
        <Loading />
      ) : data.length === 0 ? (
        <div className='text-center w-full'>No data available</div>
      ) : (
        <div className='px-4'>
          {data.map((leave, index) => (
            <div key={index} className='border w-full flex mobile:max-tablet:justify-center border-gray-400 cursor-pointer rounded-lg shadow-md mt-2 mb-2' onClick={editRowIndex === index ? '' : () => handleClick(`${index}`)}>
              <div className="font-normal px-4 py-1 text-justify ">
                <div className='flex items-center justify-between py-2'>
                  <div className='flex items-center mobile:max-tablet:flex-col justify-evenly tablet:gap-10'>
                    <img src={authState.userDetails.profileLink} alt="" className='w-10 h-10 rounded-full'></img>
                    <span className='px-2 font-normal'>Leave request from</span>
                    <div className='flex '>
                      <div className="font-medium  ">
                        {editRowIndex === index ? (
                          <input
                            type="date" name='startDate' value={editData.startDate} onChange={handleInputChange} className='border' />
                        ) :
                          (leave.startDate)
                        }
                      </div>
                      <div className="font-medium">
                        <span className='font-norma'>&nbsp;To </span>{editRowIndex === index ?
                          (
                            <input type="date" name='endDate' value={editData.endDate} onChange={handleInputChange} className='border' />
                          ) :
                          (leave.endDate)
                        }
                      </div>
                    </div>
                    <div className={`${leave.status === "Pending" ? "text-orange-300" :
                      leave.status === "Rejected" ? "text-red-400" :
                        "text-green-400"
                      } font-medium `}>&nbsp; {leave.status}
                    </div>
                  </div>
                  <div>
                    {editRowIndex === index ? (
                      <div className='flex justify-center items-center my-2 gap-1'>
                        <button className='bg-green-400 hover:bg-green-700 text-white px-3 py-1 rounded-lg shadow-md' onClick={(event) => handleUpdate(index, event)}><MdCheck /></button>
                        <button className='bg-red-400 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow-md' onClick={handleCancelEdit}><MdCancel /></button>
                      </div>
                    ) : (
                      leave.status === 'Pending' ? (
                        <div className='flex justify-center items-center my-2 gap-1'>
                          <button className='bg-blue-400 hover:bg-blue-700 text-white px-3 py-1 rounded-lg shadow-md' onClick={(event) => handleEditClick(index, event)}><CiEdit /></button>
                          <button className='bg-red-400 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow-md' onClick={(event) => handleDelete(index, event)}><MdDeleteForever /></button>
                        </div>
                      ) : (
                        <div></div>
                      )
                    )}
                  </div>
                </div>
                {expanded === `${index}` && (
                  <div >
                    <span className='font-medium'>Reason</span>
                    <div >
                      {editRowIndex === index ? (
                        <input type="text" name="reason" value={editData.reason} onChange={handleInputChange} className='border' />
                      ) : (leave.reason)
                      }
                    </div>
                  </div>
                )}

              </div>

            </div>
          ))}
          {!allDataFetched && (
            <h1 className='text-blue-500 hover:text-blue-800 mt-3 cursor-pointer text-center' onClick={handleViewMore}>View More</h1>
          )}

        </div>
      )}
    </div>
  )
}
