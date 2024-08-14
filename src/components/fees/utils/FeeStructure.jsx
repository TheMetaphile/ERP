import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../../Context/AuthContext.jsx";
import axios from 'axios'
import Loading from "../../../LoadingScreen/Loading.jsx";
import Header from './feestructureheader.jsx';
import FeeStructureField from './feeStructureField.jsx';
import FeeStructureFooter from './feeStructureFooter';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL_Fee } from "../../../Config.js";
import { usePaymentContext } from "./PaymentContext.jsx";

export default function FeeStructure({ selectedOption }) {
  const { authState } = useContext(AuthContext);
  const [fees, setFees] = useState({});
  const [loading, setLoading] = useState(true);
  const { statsDetails, setStatsDetails } = usePaymentContext();


  useEffect(() => {
    setLoading(true);
    fetchFees();
  }, [authState.accessToken]);

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
    console.log(authState.userDetails.currentClass, 'Class')
    try {
      const response = await axios.get(`${BASE_URL_Fee}/fee/fetch/student?session=${session}`, {
        headers: {
          'Authorization': `Bearer ${authState.accessToken}`
        }
      });
      console.log("API response fees:", response.data);
      setFees(response.data);
      updateContext(response.data.quarterlyStatus);

    }
    catch (error) {
      const errorMessage = error.response?.data?.error || 'An error occurred';
      toast.error(errorMessage);
    }
    finally {
      setLoading(false)
    }
  }

  const updateContext = (newRow) => {
    setStatsDetails(newRow);
  };

  return (
    <div className="w-full h-fit mb-4  rounded-lg shadow-md overflow-auto border border-gray-300">
      <table className=" w-full">
        {loading ? (
          <Loading />
        ) : fees === null ? (
          <div>No data available</div>
        ) : (
          <div className="">
            <FeeStructureField fees={fees} selectedOption={selectedOption} setFees={setFees} />

            {/* <FeeStructureFooter /> */}
          </div>
        )}
      </table>
    </div>
  );
}
