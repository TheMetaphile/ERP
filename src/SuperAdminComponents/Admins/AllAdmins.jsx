import { ToastContainer } from "react-toastify";
import AllTeachers from "./utils/AllTeachers";
import { motion } from 'framer-motion';
import CurrentAdmin from "./utils/CurrentAdmin";
import { useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function AllAdmins() {
  const [additionalDataAdmin, setAdditionalDataAdmin] = useState([]);
  const [additionalDataNonAdmin, setAdditionalDataNonAdmin] = useState([]);


  const handleDemotedAdmin = (newWork) => {
    setAdditionalDataAdmin([newWork]);
  };

  const handlePromotedAdmin = (newWork) => {
    setAdditionalDataNonAdmin([newWork]);
  };
  return (
    <div className="items-center mx-3  py-1 mb-2">
      <ToastContainer />
      <div className="flex justify-between pt-3">
        <motion.h1
          className="text-3xl font-medium text-black mobile:max-tablet:text-lg whitespace-nowrap mb-2"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >Current Admins
        </motion.h1>

        <Link to="/Sup-Admin/AddTeachers" className="bg-purple-200 p-2 block text-center rounded-md">
          Register
        </Link>
      </div>
      <CurrentAdmin onNewWork={handleDemotedAdmin} additionalDataNonAdmin={additionalDataNonAdmin} />

      <div className="flex justify-between pt-3">
        <motion.h1
          className="text-3xl font-medium text-black mobile:max-tablet:text-lg whitespace-nowrap mb-2"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >All teachers
        </motion.h1>


      </div>
      <AllTeachers additionalDataAdmin={additionalDataAdmin} onNew={handlePromotedAdmin} />
    </div>
  )
}