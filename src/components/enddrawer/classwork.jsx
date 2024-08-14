import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import Loading from "../../LoadingScreen/Loading";
import { BASE_URL_ClassWork } from "../../Config";

export default function Classwork() {
  const { authState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(4);

  useEffect(() => {
    const fetchClassWork = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL_ClassWork}/classwork/fetch/student?class=${authState.userDetails.currentClass}&month=${new Date().getMonth() + 1}&year=${authState.userDetails.academicYear}&section=${authState.userDetails.section}&start=${start}&end=${end}`, {
          headers: {
            Authorization: `Bearer ${authState.accessToken}`,
          }
        });
        setDetails(response.data.classwork);
      } catch (error) {
        console.error("Error fetching student classwork:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClassWork();
  }, [authState.accessToken, authState.userDetails, start, end]);

  return (
    <div className="space-y-4 border-b border-gray-200">
      {loading ? (
        <Loading />
      ) : details.length === 0 ? (
        <div className="text-center text-gray-500">No classwork available</div>
      ) : (
        details.map((detail, index) => (
          <div key={index} className="bg-gray-50 rounded-md py-3">
            <h3 className="font-semibold text-base mb-1">Chapter: {detail.chapter}</h3>
            <p className="text-gray-600 text-sm mb-1">Topic: {detail.topic}</p>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{detail.description}</p>
            <p className="text-xs text-right text-gray-500">Date: {detail.date}</p>
          </div>
        ))
      )}
    </div>
  );
}
