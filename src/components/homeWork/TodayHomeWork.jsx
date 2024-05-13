import HomeWorkGrid from "./utils/HomeWorkGrid";
import HomeSubjectGrid from "./utils/HomeSubjectGrid";

export default function TodayHomeWork() {
    return (
        <div className="flex flex-col  h-screen  items-start mt-2 ml-2 mr-3 no-scrollbar">
            <h1 className="text-lg font-medium px-2">Today HomeWork</h1>
            <HomeWorkGrid />
            <h1 className="text-lg font-medium mt-4 px-2">All subjects</h1>
            <HomeSubjectGrid />
        </div>
    )
}