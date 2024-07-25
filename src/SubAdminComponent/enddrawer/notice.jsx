import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import Loading from "../../LoadingScreen/Loading";
import { BASE_URL_Notice } from "../../Config";

export default function Notice(props) {
  const { authState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);


  const getCurrentSession = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const nextYear = (currentYear + 1).toString().slice(-2);
    return `${currentYear}-${nextYear}`;
  };

  const session = getCurrentSession();

  useEffect(() => {
    const fetchNotice = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL_Notice}/notice/fetch/subAdmin?start=${start}&limit=${end}&session=${session}&type=${'For Sub Admin'}`, {
          headers: {
            Authorization: `Bearer ${authState.accessToken}`,
          }
        });
        setDetails(response.data.notices);
        console.log('fetch', response.data);
      } catch (error) {
        console.error("Error fetching notice:", error);
      }
      finally {
        setLoading(false)
      }
    };
    fetchNotice();
  }, [authState.accessToken]);

  return (
    <div className="mt-3 mb-30 ">
      {/* <div className="mt-3 mb-30 ">
            <h4 className="font-normal text-sm">{props.title}</h4>
            <p className="text-gray-500 text-left text-xs">{props.description}</p>
          </div> */}
      {loading ? (
        <Loading />
      ) : details.length === 0 ? (
        <div className="w-full text-center">No notices available</div>
      ) : (
        <>
          {details.map((detail, index) => (
            <div className="mt-3 mb-2 " key={index}>
              <h4 className="font-medium text-sm">{detail.title}</h4>
              <p className="text-gray-500 text-xs overflow-hidden text-justify line-clamp-4 text-ellipsis py-1">{detail.description}</p>
            </div>
          ))
          }
        </>
      )}
    </div>
  );
}
