import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";
import Loading from "../../../LoadingScreen/Loading";
import { BASE_URL_Notice } from "../../../Config";

const TeacherNotice = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    if (authState.accessToken) {
      setLoading(true);
      fetchTeacherNotices();
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

  const fetchTeacherNotices = async () => {
    const session = getCurrentSession();

    try {
      const response = await axios.get(`${BASE_URL_Notice}/notice/fetch/admin?start=${0}&limit=${10}&session=${session}`, {
        headers: {
          Authorization: `Bearer ${authState.accessToken}`
        }
      }
      );
      console.log("API response notice:", response.data.notices);
      setData(response.data.notices);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mt-4 mx-2">
      <div className="flex flex-col space-y-4 mb-4">
        {loading ? (
          <Loading />
        ) : data === null || data.length === 0 ? (
          <div>No notices available</div>
        ) : (
          data.map((notice, index) => (
            (notice.type === 'For Teachers' || notice.type === 'Particular Teachers') && (
              <div key={index} className="bg-white shadow-md rounded-md p-4 border mt-2">
                <h3 className="text-lg font-bold mb-2">Title : {notice.title}</h3>
                <p className="text-sm text-gray-500 mb-2">Description : {notice.description}</p>
                <p className="text-sm text-gray-500 mb-2">Date: {notice.date}</p>
                <p className="text-sm text-gray-500 mb-2">Type: {notice.type}</p>
                <div className="flex items-center">
                  By :
                  <div className="flex items-center gap-1 px-1">
                    <img src={notice.from.profileLink} alt="" className="w-8 h-8 rounded-full" />
                    <p className="text-sm text-gray-500">{notice.from.name}</p>
                  </div>
                </div>
                {notice.type === "For Teachers" && (
                  <p className="text-sm text-gray-500 mb-2">For teachers</p>
                )}
                {notice.type === "Particular Teachers" && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">For particular teacher:</p>
                    <ul className="list-disc ml-4">
                      {notice.forId.map((teacher, idx) => (
                        <li key={idx}>{teacher.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          ))
        )}
      </div>
    </div>
  );
};

export default TeacherNotice;