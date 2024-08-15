import React, { useEffect, useState, useContext } from "react";
import { useLocation, useParams } from 'react-router-dom';
import AuthContext from "../../../../Context/AuthContext";
import axios from 'axios'
import Loading from "../../../../LoadingScreen/Loading.jsx";
import Header from './feestructureheader.jsx';
import FeeStructureField from './feeStructureField.jsx';
import FeeStructureFooter from './feeStructureFooter';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL_Fee } from "../../../../Config";

function StudentDetails({ selectedOption }) {
  const { id } = useParams();
  const location = useLocation();
  const { authState } = useContext(AuthContext);
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(false)

  const useQuery = () => {
    return new URLSearchParams(location.search);
  }

  const query = useQuery();
  const session = query.get('session');


  useEffect(() => {
    if (authState.accessToken) {
      setLoading(true);
      fetchFees();
    } else {
      toast.error('No access token available');
    }
  }, [authState.accessToken]);

  const today = new Date();


  const fetchFees = async () => {

    try {
      const response = await axios.get(`${BASE_URL_Fee}/fee/fetch/student/detailedFee?email=${id}&session=${session}`, {
        headers: {
          'Authorization': `Bearer ${authState.accessToken}`
        }
      });

      console.log("API response fees:", response.data);
      setFees(response.data);

    }
    catch (error) {
      const errorMessage = error.response?.data?.error || 'An error occurred';
      console.log(error)
      toast.error(errorMessage);
    }
    finally {
      setLoading(false)
    }
  }




  return (
    <div className="w-full h-fit mb-4 mt-3 rounded-lg shadow-md overflow-auto border border-gray-300">
      <table className=" w-full">
        {loading ? (
          <Loading />
        ) : fees.length === 0 ? (
          <div className='text-center'>No data available</div>
        ) : (
          <div className="">
            <FeeStructureField fees={fees} selectedOption={selectedOption} setFees={setFees}/>
          </div>
        )}
      </table>
    </div>
  )
}

export default StudentDetails