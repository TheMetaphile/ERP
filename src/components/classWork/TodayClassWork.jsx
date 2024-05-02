import ClassWorkGrid from "./utils/ClassWorkGrid";
import SubjectGrid from "./utils/SubjectGrid";

export default function TodayClassWork(){
    return (
        <div className="flex flex-col w-full h-screen overflow-y-auto items-start mt-2 ml-2 mr-3">
            <h1 className="text-xl font-medium">Today ClassWork</h1>
            <ClassWorkGrid />
            <h1 className="text-xl font-medium mt-4">All subjects</h1>
            <SubjectGrid />
        </div>
    )
}