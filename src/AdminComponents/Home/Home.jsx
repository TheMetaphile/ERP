import Notice from "../../components/enddrawer/notice";
import HomeCalendar from "./utils/Calender";
import EarningsChart from "./utils/EarningTile";
import ExpensesChart from "./utils/ExpansesTile";
import SchoolPerformanceChart from "./utils/StudentsPerformance";
import Summary from "./utils/Summary";
import Header from "./utils/TeachersDetails/LeftCard/Header";
import Middle from "./utils/TeachersDetails/LeftCard/Middle";
import TopperMiddle from "./utils/TopperStudent/Middle";
import TotalStudentTile from "./utils/TotalStudentTile";

export default function AdminHome() {
    return (
        <div className=" overflow-y-auto items-start mb-2 px-2  no-scrollbar">

            <Summary />
            <div className="flex flex-grow justify-between tablet:h-80 mb-20 mt-16">
                <div className="flex w-full h-full mobile:max-tablet:flex-col">
                    <div className="w-3/12 mobile:max-tablet:w-full">
                        <TotalStudentTile />
                    </div>
                    <div className="tablet:w-5/12  py-2 mobile:max-tablet:w-full mobile:max-tablet:h-80">
                        <SchoolPerformanceChart />
                    </div>
                    <div className="tablet:w-4/12 py-2 mobile:max-tablet:w-full mobile:max-tablet:h-80">
                        <ExpensesChart />
                    </div>
                </div>
            </div>
            <h1 className="text-2xl font-medium mt-8 mobile:max-tablet:-mt-4">School Calender</h1>
            <div className="flex flex-grow justify-between mobile:max-tablet:flex-col gap-4">
                <div className="flex w-2/4 mobile:max-tablet:w-full">
                    <HomeCalendar />
                </div>
                <div className="flex w-2/4 mobile:max-tablet:w-full">
                    <EarningsChart />
                </div>
            </div>
            <h1 className="text-2xl font-medium mt-8">Teachers Details</h1>
            <div className="flex flex-row w-full mt-4 justify-center mobile:max-tablet:flex-col gap-4">
                <div className="w-full rounded-lg shadow-md border-2 border-black overflow-x-auto">
                    <Header headings={['Name', 'Subject', 'Qualification', 'Sallery', 'Performance']} />
                    <Middle values={['Abhishek', 'Math', 'B.Tech', 'Rs. 10,000', 'Good']} />
                    <Middle values={['Bhanu', 'Science', 'B.Tech', 'Rs. 10,000', 'Good']} />
                    <Middle values={['Yash', 'English', 'B.Tech', 'Rs. 10,000', 'Bad']} />
                    <Middle values={['Ankit', 'Computer', 'B.Tech', 'Rs. 10,000', 'Good']} />
                    <Middle values={['Shub', 'Hindi', 'B.Tech', 'Rs. 10,000', 'Good']} />
                    <Middle values={['Manish', 'Math', 'B.Tech', 'Rs. 10,000', 'Good']} />
                    <Middle values={['Ashish', 'Social Science', 'B.Tech', 'Rs. 10,000', 'Average']} />
                </div>
                <div className="tablet:w-80 px-3 py-2 rounded-lg shadow-md tablet:ml-2 border-2 border-black">
                    <h1 className="text-center text-lg font-medium">
                        Notice Board
                    </h1>
                    <Notice title='Meeting' description='Today Is the Meeting at 12:00 in Auditorium.' />
                    <Notice title='Exam schedule' description='From 13 April to 20 April the Exam will be schedule all the teachers complete their syllabus as far as possible.' />
                    <Notice title='Holiday' description='Tomorrow will be a Holiday on the occasion of Holi.' />
                </div>
            </div>

            <h1 className="text-2xl font-medium mt-8">Topper Students</h1>
            <div className="flex flex-row w-full mt-4 justify-center mobile:max-tablet:flex-col gap-4">
                <div className="w-full rounded-lg overflow-x-auto shadow-md border-2 border-black">
                    <Header headings={['Name', 'ID', 'Class', 'Rank']} />
                    <TopperMiddle values={['Abhishek', '87482', 'VII-A', 'First']} />
                    <TopperMiddle values={['Bhanu', '87482', 'VII-A', 'First']} />
                    <TopperMiddle values={['Yash', '87482', 'VII-A', 'First']} />
                    <TopperMiddle values={['Ankit', '87482', 'VII-A', 'First']} />
                    <TopperMiddle values={['Avni', '87482', 'VII-A', 'First']} />
                    <TopperMiddle values={['Manish', '87482', 'VII-A', 'First']} />
                    <TopperMiddle values={['Ashish', '87482', 'VII-A', 'First']} />
                </div>
                <div className="tablet:w-80 px-3 py-2 rounded-lg shadow-md tablet:ml-2 border-2 border-black">
                    <h1 className="text-center text-lg font-medium">
                        Notice Board
                    </h1>
                    <Notice title='Fees' description='All the Student submit your Term I fee before exam .' />
                    <Notice title='Exam schedule' description='From 13 April to 20 April the Exam will be schedule all the teachers complete their syllabus as far as possible.' />
                    <Notice title='Holiday' description='Tomorrow will be a Holiday on the occasion of Holi.' />
                </div>
            </div>
        </div>
    )
}