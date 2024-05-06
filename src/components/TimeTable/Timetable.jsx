import Calendar from "./utils/calender";

export default function TimeTable(){
    return (
        <div className=" flex flex-col w-full h-screen overflow-y-auto items-start px-2 py-3 no-scrollbar">
            <div className="flex w-full justify-between ">
                <h1 className="text-2xl font-medium">
                    Time Table
                </h1>
                <h3 className="text-base">
                &lt; November 2024 &gt;
                </h3>
            </div>
            <Calendar />
        </div>
    )
}