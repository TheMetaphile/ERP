import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import Loading from "../../LoadingScreen/Loading";
import { BASE_URL_Notice } from "../../Config";

export default function Notice() {
  const { authState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);

  useEffect(() => {
    const fetchNotice = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL_Notice}/notice/fetch/student?start=${start}&limit=${end}`, {
          headers: {
            Authorization: `Bearer ${authState.accessToken}`,
          }
        });
        setDetails(response.data.notices);
      } catch (error) {
        console.error("Error fetching notice:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotice();
  }, [authState.accessToken, start, end]);

  return (
    <div className="space-y-4">
      {loading ? (
        <Loading />
      ) : details.length === 0 ? (
        <div className="text-center text-gray-500">No notices available</div>
      ) : (
        details.map((detail, index) => (
          <div key={index} className="border-b border-gray-200 pb-3">
            <h3 className="font-semibold text-base mb-1">{detail.title}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">{detail.description}</p>
          </div>
        ))
      )}
    </div>
  );
}
