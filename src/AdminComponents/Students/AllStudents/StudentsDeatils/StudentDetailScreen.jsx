import { useLocation, useParams } from "react-router-dom";
import FeeStatus from "./FeeStatus";
import StudentBasicDetails from "./DetailCard";

export default function StudentDetailScreen(){
    const { id } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const name=searchParams.get('name')
    const email=searchParams.get('email');
    const Class = searchParams.get('class');
    const rollNumber = searchParams.get('rollnumber');
    const session = searchParams.get('session');


    return (
        <div className="overflow-y-auto items-start mb-2 px-2  no-scrollbar">
            <h1 className="text-xl font-medium mb-3">
            {name}'s Fees Status 
            </h1>
            <FeeStatus name={name} class={Class} rollNumber={rollNumber} session={session}/>
            <StudentBasicDetails rollNumber={rollNumber} class={Class} name={name}/>
        </div>
    )
}