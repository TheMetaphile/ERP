import ClassWorkGrid from "./utils/ClassWorkGrid";
import SubjectGrid from "./utils/SubjectGrid";

export default function TodayClassWork(){
    return (
        <div className="flex flex-col  h-screen overflow-y-auto items-start mt-2 ml-2 mr-3 no-scrollbar">
            <h1 className="text-xl font-medium mb-2">Todays ClassWork</h1>
            <ClassWorkGrid />
            <h1 className="text-xl font-medium mt-4 mb-2">Subject-wise ClassWork</h1>
            <SubjectGrid />
        </div>
    )
}