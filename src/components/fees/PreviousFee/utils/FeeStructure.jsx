import React, { useEffect, useState, useContext } from "react";
import AuthContext from '../../../../Context/AuthContext.jsx';
import axios from 'axios'
import Loading from '../../../../LoadingScreen/Loading.jsx';
import FeeStructureField from './feeStructureField.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../../../../Config.js";
import { refreshAccessToken } from "../../../../RefreshTokenHelper.js";


export default function FeeStructure() {
  const { authState, updateAccessToken, logout } = useContext(AuthContext);
  const [fees, setFees] = useState({});
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    setLoading(true);
    fetchFees();
  }, [authState?.accessToken]);

  const today = new Date();
  // const formattedDate = today.toISOString().split('T')[0];
  const getCurrentSession = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    return currentMonth >= 3 ? `${currentYear}-${(currentYear + 1).toString().slice(-2)}` : `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
  };

  const session = getCurrentSession();

  const fetchFees = async () => {
    console.log(authState?.userDetails?.currentClass, 'Class')
    try {
      const response = await axios.get(`${BASE_URL}/fee/fetch/pendingFee?email=${authState?.userDetails?.email}`, {
        headers: {
          'Authorization': `Bearer ${authState?.accessToken}`
        }
      });
      console.log("API response fees:", response.data);
      setFees(response.data.PendingFee);

    }
    catch (error) {
      const errorMessage = error.response?.data?.error;
      toast.error(errorMessage);
      if (
        error.response &&
        error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
      ) {
        toast.warn('Access denied. Attempting to refresh token...');
        try {
          const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
          await fetchFees();
        } catch (refreshError) {
        }
      } else {
        toast.error(error.response?.data?.error || "An error occurred");
      }
    }
    finally {
      setLoading(false)
    }
  }



  return (
    <div className="w-full h-fit mb-4  rounded-lg shadow-md overflow-auto border border-gray-300">
      <table className=" w-full">
        {loading ? (
          <Loading />
        ) : fees === null ? (
          <div>No data available</div>
        ) : (
          <div className="">
            <FeeStructureField fees={fees} />
          </div>
        )}
      </table>
    </div>
  );
}
