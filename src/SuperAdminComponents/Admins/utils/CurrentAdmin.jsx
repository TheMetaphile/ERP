import { useContext, useEffect, useState } from "react";
import AdminRow from "./AdminRow";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";
import { BASE_URL_Login } from "../../../Config";
import { motion } from 'framer-motion';

export default function CurrentAdmin({ onNewWork, additionalDataNonAdmin }) {
  const { authState } = useContext(AuthContext);
  const [Admins, SetAdmins] = useState([]);

  useEffect(() => {
    if (additionalDataNonAdmin) {
      SetAdmins((prevAdmins) => [...prevAdmins, ...additionalDataNonAdmin]);
    }
  }, [additionalDataNonAdmin]);

  const fetchAdmins = async () => {

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BASE_URL_Login}/admins/admin?branch=${authState.userDetails.branch}`,
      headers: {
        'Authorization': `Bearer ${authState.accessToken}`
      }
    };

    await axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data), "reluk lkt kljdfgkjar");
        console.log(response.data.admins)
        SetAdmins(response.data.admins)
      })
      .catch((error) => {
        console.log(error);
      });

  }

  useEffect(() => {
    fetchAdmins();
  }, [authState.userDetails.branch])

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };



  return (
    <div className="w-full overflow-x-auto rounded-lg pt-2">

      <motion.table
        className="min-w-full bg-white border border-gray-300 rounded-lg"
        variants={tableVariants}
        initial="hidden"
        animate="visible"
      >
        <thead>
          <tr className="bg-gradient-to-r from-purple-400 to-purple-200 text-lg">
            <th className="py-2 px-6 text-center rounded-t-r whitespace-nowrap">Employee Id</th>
            <th className="py-2 px-6">Name</th>
            <th className="py-2 px-6 text-center">Email</th>
            <th className="py-2 px-6 text-center">DOB</th>
            <th className="py-2 px-6 text-center">Phone Number</th>
            <th className="py-2 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-md font-normal">
          {Admins.map((teachers, index) => (
            <AdminRow Teacher={teachers} index={index} onNewWork={onNewWork} setAdmins={SetAdmins} />
          ))}
        </tbody>
      </motion.table>
    </div>
  )
}
