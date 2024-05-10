import Calendar from "./utils/calender";
import LeactureTile from "./utils/LectureTile";

export default function TimeTable() {
    return (
        <div className=" flex flex-col w-full  items-start  py-3 px-3">
            <div className="flex w-full justify-between ">
                <h1 className="text-2xl font-medium">
                    Time Table
                </h1>
                <h3 className="text-base">
                    &lt; November 2024 &gt;
                </h3>
            </div>
            <Calendar />
            <br></br>
            <h1 className="text-xl font-medium">
                Today Lectures
            </h1>

            <div className=' w-full '>
                <LeactureTile subject='Computer' lecture='Lecture:01' time='11:00am to 12:15pm' />
                <LeactureTile subject='Computer' lecture='Lecture:01' time='11:00am to 12:15pm' />
                <LeactureTile subject='Computer' lecture='Lecture:01' time='11:00am to 12:15pm' />
                <LeactureTile subject='Computer' lecture='Lecture:01' time='11:00am to 12:15pm' />
                <LeactureTile subject='Computer' lecture='Lecture:01' time='11:00am to 12:15pm' />            
                <LeactureTile subject='Computer' lecture='Lecture:01' time='11:00am to 12:15pm' />                
                <LeactureTile subject='Computer' lecture='Lecture:01' time='11:00am to 12:15pm' />
                <LeactureTile subject='Computer' lecture='Lecture:01' time='11:00am to 12:15pm' />
            </div>
        </div>
    )
}