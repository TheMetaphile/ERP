import { ToastContainer } from "react-toastify";
import ClassTeacherOnLeaveTable from "./utils/ClassTeachersOnLeaveTable";
import ClassTeacherSubstitutionHistory from "./utils/SubstitutionHistory";
import { motion } from 'framer-motion';

export default function ClassTeacherSubstitute() {

  return (
    <div className="w-full items-center   py-1 mb-2">
      <ToastContainer />
      <div className="flex justify-between pt-3">
        <motion.h1
          className="text-3xl font-bold text-blue-600 mobile:max-tablet:text-2xl whitespace-nowrap mb-2"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >Class teachers on leave (Today)
        </motion.h1>

      </div>
      <ClassTeacherOnLeaveTable />

      <div className="flex justify-between pt-3">
        <motion.h1
          className="text-3xl font-bold text-blue-600 mobile:max-tablet:text-2xl whitespace-nowrap mb-2"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >Class teachers substitution history
        </motion.h1>


      </div>
      <ClassTeacherSubstitutionHistory />
    </div>
  )
}