import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import Loading from "../../LoadingScreen/Loading";
import { BASE_URL_Notice } from "../../Config";

export default function Notice(props) {
  // const { authState } = useContext(AuthContext);
  // const [loading, setLoading] = useState(false);
  // const [details, setDetails] = useState([]);
  // const [start, setStart] = useState(0);
  // const [end, setEnd] = useState(5);


  // useEffect(() => {
  //   const fetchNotice = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get(`${BASE_URL_Notice}/notice/fetch/student?start=${start}&limit=${end}`, {
  //         headers: {
  //           Authorization: `Bearer ${authState.accessToken}`,
  //         }
  //       });
  //       setDetails(response.data.notices);
  //       console.log('fetch', response.data);
  //     } catch (error) {
  //       console.error("Error fetching notice:", error);
  //     }
  //     finally {
  //       setLoading(false)
  //     }
  //   };
  //   fetchNotice();
  // }, [authState.accessToken]);

  return (
    <div className="mt-3 mb-30 ">
      <div className="mt-3 mb-30 ">
            <h4 className="font-normal text-sm">{props.title}</h4>
            <p className="text-gray-500 text-left text-xs">{props.description}</p>
          </div>
      {/* {loading ? (
        <Loading />
      ) : details.length === 0 ? (
        <div className="w-full text-center">No notices available</div>
      ) : (
        <>
          {details.map((detail, index) => (
            <div className="mt-3 mb-30 ">
            <h4 className="font-normal text-sm">{props.title}</h4>
            <p className="text-gray-500 text-left text-xs">{props.description}</p>
          </div>
          ))
          }
        </>
      )} */}
    </div>
  );
}
