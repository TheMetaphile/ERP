import InfoCard from "./utils/InfoCard";
import profile from './../../assets/Test Account.png'
import Attendance from "./utils/Attendance";
import Performance from "./utils/Performance";
export default function Result(){
    const handlePrint = () => {
        window.print();
      };
    return(
        <div className="flex flex-col w-full h-screen overflow-y-auto items-start mt-2 px-2 no-scrollbar">
            <h3 className="text-xl font-medium">Result</h3>
            <InfoCard 
                class='2nd A' 
                name='Mehika Tegwal' 
                profileImg={profile}
                rollnumber='2001270100028'
                dob='27 Dec 1995'
                bloodgroup='B+'
                contactno='+91 8979020025'
                father='Mr. Raj kumar Tyagi'
                mother= 'Mrs. Manju Tyagi'
            />
            <Attendance term={[{total:"249", attendance: "235"},{total:"100", attendance: "72"}]}/>
            <Performance />
            <div className="text-xl font-medium my-3 bg-secondary text-black self-center rounded-lg shadow-md py-1 px-3 mt-3 hover:bg-blue-400 cursor-pointer hover:text-white" onClick={handlePrint}>
                Download
            </div>
        </div>
    )
}