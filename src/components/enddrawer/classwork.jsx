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
      console.log(authState.userDetails.currentClass, new Date().getMonth() + 1, authState.userDetails.academicYear, authState.userDetails.section)
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL_ClassWork}/classwork/fetch/student?class=${authState.userDetails.currentClass}&month=${new Date().getMonth() + 1}&year=${authState.userDetails.academicYear}&section=${authState.userDetails.section}&start=${start}&end=${end}`, {
          headers: {
            Authorization: `Bearer ${authState.accessToken}`,
          }
        });
        setDetails(response.data.classwork);
        console.log('fetch', response.data)
      } catch (error) {
        console.error("Error fetching student classwork:", error);
      }
      finally {
        setLoading(false)
      }
    };
    fetchClassWork();
  }, [authState.accessToken]);

  return (
    <div className="mt-2 mb-30 ">
      {loading ? (
        <Loading />
      ) : details.length === 0 ? (
        <div className="w-full text-center">No classwork available</div>
      ) : (
        <>
          {details.map((detail, index) => (
            <div className="mt-3 mb-2" key={index}>
              <h4 className="font-medium text-sm">Chapter : {detail.chapter}</h4>
              <p className="text-gray-500 text-left text-xs">Topic : {detail.topic}</p>
              <p className="text-gray-500 text-xs overflow-hidden text-justify line-clamp-4 text-ellipsis py-1">Description : {detail.description}</p>
              <p className="text-xs text-right">Date : {detail.date}</p>
            </div>
          ))
          }
        </>
      )}
    </div>
  );
}
