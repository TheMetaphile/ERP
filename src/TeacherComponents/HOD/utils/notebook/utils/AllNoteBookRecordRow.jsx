import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { MdCheck, MdEdit } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { BASE_URL_Login } from "../../../../../Config";
import AuthContext from "../../../../../Context/AuthContext";
import { motion } from "framer-motion";

function AllNoteBookRecordRow({ record, index }) {
  const [remark, setRemark] = useState(record.remark || "");
  const [editingRow, setEditingRow] = useState(false);
  const { authState } = useContext(AuthContext);

  const date = new Date();
  var session =
    date.getMonth() + 1 < 4
      ? `${date.getFullYear() - 1}-` + `${date.getFullYear()}`.substring(2, 4)
      : `${date.getFullYear()}-` + `${date.getFullYear() + 1}`.substring(2, 4);

  const handleUpdateClick = () => {
    setEditingRow(true);
  };

  const handleConfirmClick = async () => {
    console.log(record._id, session, remark);
    try {
      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${BASE_URL_Login}/notebook/update/remark?docId=${record._id}&session=${session}`,
        headers: {
          Authorization: `Bearer ${authState.accessToken}`,
        },
        data: { remark },
      };

      await axios.request(config);
      toast.success("Remark updated successfully");
      setEditingRow(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update remark");
    }
  };

  const handleCancelClick = () => {
    setRemark(record.remark || "");
    setEditingRow(false);
  };

  return (
    <motion.tr
      key={index}
      className="border-b border-gray-200 last:border-none"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <td className="py-3 px-6 text-center whitespace-nowrap">
        {new Date(record.date).toDateString()}
      </td>
      <td className="py-3 px-6 text-center">{record.chapter}</td>
      <td className="py-3 px-6 text-center whitespace-nowrap">{record.topic}</td>
      <td className="py-3 px-6 text-center">{record.checked}</td>
      <td className="py-3 px-6 text-center whitespace-nowrap">
        <Link
          to={`/Teacher-Dashboard/HOD/notebook/details/${record._id}?session=${session}&date=${record.date}&chapter=${record.chapter}&topic=${record.topic}`}
          className="block w-full text-blue-500 underline hover:text-blue-700"
        >
          Show Details
        </Link>
      </td>
      <td className="py-3 px-6 text-center">
        {editingRow ? (
          <input
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="Enter your remark"
            className="w-full p-2 border border-black rounded-md"
          />
        ) : (
          <span>{remark}</span>
        )}
      </td>
      <td className="py-3 px-6 text-center">
        {editingRow ? (
          <div className="flex gap-1 justify-center">
            <motion.button
              className="bg-green-400 hover:bg-green-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center"
              onClick={handleConfirmClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MdCheck />
            </motion.button>
            <motion.button
              className="bg-red-400 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center"
              onClick={handleCancelClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes />
            </motion.button>
          </div>
        ) : (
          <div className="flex justify-center gap-1">
            <motion.button
              className="bg-blue-400 hover:bg-blue-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center"
              onClick={handleUpdateClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MdEdit />
            </motion.button>
          </div>
        )}
      </td>
    </motion.tr>
  );
}

export default React.memo(AllNoteBookRecordRow);