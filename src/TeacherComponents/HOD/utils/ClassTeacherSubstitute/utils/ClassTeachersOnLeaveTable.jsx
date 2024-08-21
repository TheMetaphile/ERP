import { useContext, useEffect, useState } from "react";
import ClassTeacherOnLeaveRow from "./ClassTeachersOnLeaveRow";
import axios from "axios";
import AuthContext from "../../../../../Context/AuthContext";
import { BASE_URL_Login } from "../../../../../Config";
import { motion } from 'framer-motion';

export default function ClassTeacherOnLeaveTable() {
    const {authState} = useContext(AuthContext);
    const [TeachersOnLeave, SetTeachersOnLeave] = useState([]);
    const date = new Date();
    var month = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1; 
    const formattedDate = `${date.getFullYear()}-${month}-${date.getDate()}`;
    const session = getCurrentSession();
    const fetchTeacherOnLeaveList = async () => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BASE_URL_Login}/classTeacherSubstitute/fetch/checkLeave?date=${formattedDate}&session=${session}`,
            headers: {
                'Authorization': `Bearer ${authState.accessToken}`
            }
        };

        await axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data),"reluk lkt kljdfgkjar");
                if(!response.data.status){
                    SetTeachersOnLeave(response.data.ClassTeachers)
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }

    useEffect(()=>{
        fetchTeacherOnLeaveList();
    },[authState])

    const tableVariants = {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { 
            staggerChildren: 0.1 
          }
        }
      };
    
      const rowVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            type: 'spring',
            stiffness: 100,
            damping: 12
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
          <tr className="bg-gradient-to-r from-blue-400 to-blue-200 text-lg">
            <th className="py-2 px-6 text-center rounded-t-r whitespace-nowrap">Employee Id</th>
            <th className="py-2 px-6">Name</th>
            <th className="py-2 px-6 text-center">Date</th>
            <th className="py-2 px-6 text-center">Class</th>
            <th className="py-2 px-6 text-center">Section</th>
            <th className="py-2 px-6 text-center">Substitute</th>
            <th className="py-2 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-md font-normal">
          {TeachersOnLeave.map((teachers, index) => (
            <motion.tr
              key={index}
              variants={rowVariants}
            >
              <ClassTeacherOnLeaveRow Teacher={teachers} index={index} date={formattedDate} session={session} />
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </div>
    )
}


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