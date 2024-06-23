import ProgressCards from "./utils/progressBarRow.jsx";
import NewAssignmentRow from "./utils/AssignmentRow.jsx";
import SubmittedRow from "./utils/submittedRow.jsx";

export default function AssignmentReport() {
  return (
    <div className=" mt-2 px-2 py-2 h-screen w-full text-left overflow-y-auto overflow-x-hidden no-scrollbar">
      <h1 className="text-2xl mb-2">My Assignment Report</h1>
      <ProgressCards />
      <h1 className=" text-2xl">New Assignments</h1>
      <NewAssignmentRow />
      <h1 className=" text-2xl">Submitted Assignments</h1>
      <SubmittedRow />
    </div>
  );
}
