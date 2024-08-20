import { ToastContainer } from "react-toastify";
import ClassTeacherOnLeaveTable from "./utils/ClassTeachersOnLeaveTable";
import ClassTeacherSubstitutionHistory from "./utils/SubstitutionHistory";

export default function ClassTeacherSubstitute() {

  return (
    <div className="w-full items-center   py-1 mb-2">
      <ToastContainer />
      <div className="flex justify-between pt-3">
        <h1 className="text-3xl font-bold text-indigo-700 mobile:max-tablet:text-2xl whitespace-nowrap mb-2 ">Class teachers on leave (Today)</h1>
      </div>
      <ClassTeacherOnLeaveTable />

      <div className="flex justify-between pt-3">
        <h1 className="text-3xl font-bold text-indigo-700 mobile:max-tablet:text-2xl whitespace-nowrap mt-3 mb-2 ">Class teachers substitution history</h1>
      </div>
      <ClassTeacherSubstitutionHistory />
    </div>
  )
}