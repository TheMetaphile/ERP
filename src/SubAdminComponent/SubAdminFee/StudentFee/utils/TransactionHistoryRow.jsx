import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../../../Context/AuthContext.jsx";
import axios from 'axios'
import Loading from "../../../../LoadingScreen/Loading.jsx";
import TransactionField from "./TransactionField.jsx";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL_Fee } from "../../../../Config.js";

export default function TransactionRow({selectedStudent}) {
    const { authState } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)



    useEffect(() => {
        if (authState.accessToken && selectedStudent) {
            setLoading(true);
            fetchTransaction();
        }
    }, [authState.accessToken,selectedStudent]);

    const fetchTransaction = async () => {
        try {
            const response = await axios.get(`${BASE_URL_Fee}/fee/fetch/particularStudent/transactions?email=${selectedStudent.email}`, {
                headers: {
                    'Authorization': `Bearer ${authState.accessToken}`
                }
            });
            console.log("API response transaction:", response.data);
            setData(response.data.transactions)
        }
        catch (error) {
            const errorMessage = error.response?.data?.error || 'An error occurred';
            toast.error(errorMessage);
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full h-fit mb-4 shadow-md rounded-lg border border-gray-300   overflow-x-auto no-scrollbar">
            
            {loading ? (
                <Loading />
            ) : data.length === 0 ? (
                <div className='text-center'>No data available</div>
            ) : (
                <div>
                    <TransactionField data={data} selectedStudent={selectedStudent}/>
                </div>
            )}

        </div>
    );
}
