import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import AuthContext from '../../../Context/AuthContext';
import Loading from '../../../LoadingScreen/Loading';
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever, MdSave } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AttendenceTable() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState('');
  const [error, setError] = useState('');
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const { authState } = useContext(AuthContext);


  const fetchUserData = async () => {
    try {
      const response = await axios.get(`https://studentleaveapi.onrender.com/leave/fetch/particularStudent?start=${0}&end=${20}`, {
        headers: {
          Authorization: `Bearer ${authState.accessToken}`
        }
      });
      console.log("API response:", response.data);
      setData(response.data.Leaves);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {

    if (authState.accessToken) {
      setLoading(true);
      fetchUserData();
    } else {
      setError('No access token available');
      setLoading(false);
    }
  }, [authState.accessToken]);

  const handleEditClick = (index) => {
    setEditRowIndex(index);
    setEditData(data[index]);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleUpdate = async (index) => {
    const updatedLeave = {
      ...editData,
      leaveId: data[index]._id
    };
    console.log(updatedLeave)
    try {

      const response = await axios.put('https://studentleaveapi.onrender.com/leave/update',
        {
          updatedLeave
        },
        {
          headers: {
            Authorization: `Bearer ${authState.accessToken}`,
          }
        },

      );
      const updatedData = [...data];
      updatedData[index] = editData;
      setData(updatedData);
      setEditRowIndex(null);
      if (response.status === 200) {
        toast.success('Leave Updated');
      }
    } catch (err) {
      setError(err.message);
      toast.error(err)
    }
  };



  // console.log(data[index]._id)

  const handleDelete = async (index) => {

    const id = (data[index]._id);
    console.log(id)
    console.log('stat', (data[index].status))
    if ((data[index].status) === "Pending") {
      try {
        const response = await axios.delete(
          `https://studentleaveapi.onrender.com/leave/delete?leaveId=${id}`,
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




  return (
    <div className='rounded-lg shadow-lg   w-full'>
      <ToastContainer />
      {loading ? (
        <Loading />
      ) : data === null ? (
        <div >No data available</div>
      ) : (
        <table className='mt-7 mb-3 w-full justify-evenly text-center outline outline-gray-400 rounded-lg'>
          <thead>
            <tr className='rounded-t-lg border-b-2 border-gray-400 mt-3 text-base font-medium'>
              <th>Leave Type</th>
              <th className='bg-blue-200'>Start Date</th>
              <th className='bg-green-200'>End Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((leave, index) => (
              <tr key={index}>
                <td className="font-normal">
                  {editRowIndex === index ? (
                    <input type="text" name="reason" value={editData.reason} onChange={handleInputChange} />
                  ) : (leave.reason)
                  }
                </td>

                <td className="font-normal bg-blue-200">
                  {editRowIndex === index ? (
                    <input
                      type="text" name='startDate' value={editData.startDate} onChange={handleInputChange} />
                  ) :
                    (leave.startDate)
                  }
                </td>

                <td className="font-normal bg-green-200">
                  {editRowIndex === index ?
                    (
                      <input type="text" name='endDate' value={editData.endDate} onChange={handleInputChange} />
                    ) :
                    (leave.endDate)
                  }
                </td>

                <td className={`${leave.status === "Pending" ? "text-orange-300" :
                  leave.status === "Rejected" ? "text-red-400" :
                    "text-green-400"
                  } font-medium`}>{leave.status}</td>
                <td className='flex justify-center items-center'>
                  {editRowIndex === index ? (
                    <MdSave className='text-green-500 cursor-pointer' onClick={() => handleUpdate(index)} />
                  ) : (
                    <CiEdit className='text-green-500 cursor-pointer' onClick={() => handleEditClick(index)} />
                  )}
                  &nbsp; / &nbsp;
                  <MdDeleteForever className='text-red-500 cursor-pointer' onClick={() => handleDelete(index)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}




    </div>


  )
}
