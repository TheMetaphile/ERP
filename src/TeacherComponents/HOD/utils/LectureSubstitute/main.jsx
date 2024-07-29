import { ToastContainer } from "react-toastify";
import ClassTeacherOnLeaveTable from "./utils/ClassTeachersOnLeaveTable";
import ClassTeacherSubstitutionHistory from "./utils/SubstitutionHistory";

export default function LectureSubstitute() {



  return (
    <div className="w-full items-center   py-1 mb-2">
      <ToastContainer />
      <div className="flex justify-between">
        <h1 className="text-xl font-medium mb-2 mobile:max-tablet:text-lg">Subject teachers on leave (Today)</h1>

      </div>
      <ClassTeacherOnLeaveTable />
      <div className="flex justify-between">
        <h1 className="text-xl font-medium mt-3 mb-2 mobile:max-tablet:text-lg">Subject teachers substitution history</h1>

      </div>
      <ClassTeacherSubstitutionHistory />

    </div>
  )
}