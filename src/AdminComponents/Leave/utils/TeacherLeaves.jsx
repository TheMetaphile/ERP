import React, { useState, useEffect, useContext } from "react";
import { userimg } from "../../Teachers/utils/images/index.js";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext.jsx";
import Loading from "../../../LoadingScreen/Loading.jsx";
import { BASE_URL_TeacherLeave } from "../../../Config.js";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TeacherLeavesTile from "./TeacherLeavesTile.jsx";

export default function TeacherLeaves() {
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    if (authState.accessToken) {
      setLoading(true);
      fetchTeacherData();
    } else {
      setError('No access token available');
      setLoading(false);
    }
  }, [authState.accessToken]);

  function getCurrentSession() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    if (currentMonth >= 3) {
      return `${currentYear}-${(currentYear + 1).toString().slice(-2)}`;
    } else {
      return `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
    }
  }

  const fetchTeacherData = async () => {
    const session = getCurrentSession();

    try {
      const response = await axios.get(`${BASE_URL_TeacherLeave}/teacherleave/fetch/admin?start=${0}&end=${10}&session=${session}`, {
        headers: {
          Authorization: `Bearer ${authState.accessToken}`
        }
      }
      );
      console.log("API response teacher:", response.data.Leaves);
      setData(response.data.Leaves);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAction = async (actionType) => {
    const id = selectedLeave._id;
    const session = getCurrentSession();
    try {
      const response = await axios.put(
        `${BASE_URL_TeacherLeave}/leave/update?leaveId=${id}&session=${session}`,
        { status: actionType },
        {
          headers: {
            Authorization: `Bearer ${authState.accessToken}`
          }
        }
      );

      if (response.status === 200) {
        const updatedLeaves = data.map((leave) =>
          leave._id === id ? { ...leave, status: actionType } : leave
        );
        setData(updatedLeaves);
        setSelectedLeave(null);
        toast.success(`Leave ${actionType === 'Approved' ? 'approved' : 'rejected'}`);
        console.log(`Leave ${actionType === 'Approved' ? 'approved' : 'rejected'}`);
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (err) {
      console.error('Error updating leave:', err.message);
    }
  };


 

  return (
    <div className="flex flex-col space-y-4 mb-4">
      {loading ? (
        <Loading />
      ) : data === null ? (
        <div>No data available</div>
      ) : (
      <TeacherLeavesTile data={data}/>
    )}
    </div>
  );
}