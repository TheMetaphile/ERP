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

export default function FeeStructure() {
  const { authState } = useContext(AuthContext);
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    if (authState.accessToken) {
      setLoading(true);
      fetchFees();
    } else {
      toast.error('No access token available');
    }
  }, [authState.accessToken]);

  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];

  const fetchFees = async () => {
    console.log(authState.userDetails.currentClass, 'Class')
    try {
      const response = await axios.get(`${BASE_URL_Fee}/fee/fetch/student?date=${formattedDate}`, {
        headers: {
          'Authorization': `Bearer ${authState.accessToken}`
        }
      });
      const total = response.data.feeStructure.reduce((acc, fee) => acc + parseFloat(fee.payableAmount), 0);
      console.log(total)
      setTotalAmount(total)
      console.log("API response fees:", response.data);
      setFees(response.data.feeStructure);

    }
    catch (error) {
      const errorMessage = error.response?.data?.error || 'An error occurred';
      toast.error(errorMessage);
    }
    finally {
      setLoading(false)
    }
  }

  const handleViewMore = () => {
    setVisibleCount(prevCount => prevCount + 10);
  };

  return (
    <div className="w-full h-fit mb-4  rounded-lg shadow-md overflow-auto border border-gray-300">
      <table className=" w-full">
        <Header />
        {loading ? (
          <Loading />
        ) : fees === null ? (
          <div>No data available</div>
        ) : (
          <div className="">
            <FeeStructureField fees={fees.slice(0, visibleCount)} />
            {visibleCount < fees.length && (
              <button onClick={handleViewMore} className="w-full text-blue-500 text-center py-2">View More</button>
            )}
            <FeeStructureFooter totalAmount={totalAmount} />
          </div>
        )}
      </table>
    </div>
  );
}
