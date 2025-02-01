import Notice from "../../components/enddrawer/notice";
import FetchDataComponent from "../loopfor api";
import HomeCalendar from "./utils/Calender";
import EarningsChart from "./utils/EarningTile";
import ExpensesChart from "./utils/ExpansesTile";
import SchoolPerformanceChart from "./utils/StudentsPerformance";
import Summary from "./utils/Summary";
import Header from "./utils/TeachersDetails/LeftCard/Header";
import Middle from "./utils/TeachersDetails/LeftCard/Middle";
import TopperMiddle from "./utils/TopperStudent/Middle";
import TotalStudentTile from "./utils/TotalStudentTile";

export default function SuperAdminHome() {
    return (
        <div className=" overflow-y-auto items-start mb-2 px-2  no-scrollbar">
            {/* <FetchDataComponent /> */}
            <Summary />
            <div className="flex flex-grow justify-between laptop:h-96 mb-3 mt-4 tablet:max-laptop:h-fit">
                <div className="flex w-full gap-2 h-full mobile:max-tablet:flex-col tablet:max-laptop:flex-col tablet:max-laptop:w-full">
                    <div className="w-3/12 mobile:max-laptop:w-full ">
                        <TotalStudentTile />
                    </div>
                    <div className="laptop:w-5/12  mobile:max-laptop:w-full mobile:max-laptop:h-80">
                        <SchoolPerformanceChart />
                    </div>
                    <div className="laptop:w-4/12  mobile:max-laptop:w-full mobile:max-laptop:h-80">
                        <ExpensesChart />
                    </div>
                </div>
            </div>
            <h1 className="text-2xl font-medium mt-8 mobile:max-tablet:-mt-4">School Calender</h1>
            <div className="flex flex-grow justify-between mobile:max-tablet:flex-col gap-2">
                <div className="flex w-2/4 mobile:max-tablet:w-full">
                    <HomeCalendar />
                </div>
                <div className="flex w-2/4 mobile:max-tablet:w-full">
                    <EarningsChart />
                </div>
            </div>

        </div>
    )
}