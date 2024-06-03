import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../../Context/AuthContext.jsx";
import axios from 'axios'
import Loading from "../../../LoadingScreen/Loading.jsx";
import Header from './feestructureheader.jsx';
import FeeStructureField from './feeStructureField.jsx';
import FeeStructureFooter from './feeStructureFooter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function FeeStructure() {
    const { authState } = useContext(AuthContext);
    const [fees, setFees] = useState([]);

    const fetchFees = async () => {
        console.log(authState.userDetails.currentClass, 'Class')
        try {
          const response = await axios.get(`https://feeapi.onrender.com/fee/details?class=${authState.userDetails.currentClass}`, {
            headers: {
                'Authorization': `Bearer ${authState.accessToken}`
              }
          });
          console.log("API response fees:", response.data);
          if (response.data ) {
            setFees(response.data.feeStructure);
          } else {
            toast.error('Unexpected response format');
          }
    
        }
        catch (error) {
          const errorMessage = error.response?.data?.error || 'An error occurred';
          toast.error(errorMessage);
        }
      }
    
      useEffect(() => {
        if (authState.accessToken) {
          fetchFees();
        } else {
          toast.error('No access token available');   
        }
      }, [authState.accessToken]);
      
    return (
        <div className="w-full h-fit mb-4 bg-white rounded-lg shadow-md ">
            <ToastContainer />
            <Header />
            
            <FeeStructureField  fees={fees}/>
            <FeeStructureField  fees={fees} />
            <FeeStructureField  fees={fees}/>
            <FeeStructureField  fees={fees}/>
            <FeeStructureField  fees={fees}/>
            <FeeStructureFooter fees={fees}/>
        </div>
    );
}
