import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import AuthContext from '../../../Context/AuthContext';
import Loading from '../../../LoadingScreen/Loading';
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever, MdSave } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL_Student_Leave } from '../../../Config';

export default function AttendenceTable() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState('');
  const [error, setError] = useState('');
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const { authState } = useContext(AuthContext);


  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${BASE_URL_Student_Leave}/leave/fetch/particularStudent?start=${0}&end=${20}`, {
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

      const response = await axios.put(`${BASE_URL_Student_Leave}/leave/update`,
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




  return (
    <div className='rounded-lg shadow-md   border mt-1 border-gray-300 w-full'>
      <ToastContainer />
      {loading ? (
        <Loading />
      ) : data === null ? (
        <div className='text-center w-full'>No data available</div>
      ) : (
        <table className=' w-full justify-evenly text-center  rounded-lg border border-black '>
          <thead>
            <tr className='rounded-t-lg  mt-3 text-base font-medium'>
              <th>Leave Type</th>
              <th className='bg-blue-200'>Start Date</th>
              <th className='bg-green-200'>End Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((leave, index) => (
              <tr key={index} className='border-t border-gray-400 '>
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
                  } font-medium`}>{leave.status}
                  </td>
                <td className='flex justify-center items-center my-2 gap-1'>
                  {editRowIndex === index ? (
                    <button className='bg-green-400 hover:bg-green-700 text-white px-3 py-1 rounded-lg shadow-md' onClick={() => handleUpdate(index)}><MdSave /></button>
                  ) : (
                    <button className='bg-blue-400 hover:bg-blue-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center' onClick={() => handleEditClick(index)}> <CiEdit /></button>
                  )}
                  <button className='bg-red-400 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center' onClick={() => handleDelete(index)}><MdDeleteForever /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}




    </div>


  )
}
