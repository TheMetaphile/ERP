import HomeCalendar from "./utils/Calender";
import EarningsChart from "./utils/EarningTile";
import ExpensesChart from "./utils/ExpansesTile";
import SchoolPerformanceChart from "./utils/StudentsPerformance";
import Summary from "./utils/Summary";
import TotalStudentTile from "./utils/TotalStudentTile";

export default function AdminHome() {
    return (
        <div className="w-full  p-4">
            <Summary />
            <div className="flex w-full h-80 ">
                <TotalStudentTile />
                <SchoolPerformanceChart />
                <ExpensesChart />
            </div>
            <h1 className="text-2xl font-medium mt-8">School Calender</h1>
            <div className="flex flex-row ">
                <HomeCalendar className='w-2/3'/>
                <EarningsChart />
            </div>
            <h1 className="text-2xl font-medium mt-8">School Calender</h1>
        </div>
    )
}