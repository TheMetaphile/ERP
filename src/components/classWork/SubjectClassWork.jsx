import { useParams } from "react-router-dom";
import ProgressCard from "../assignment_report/utils/progressCard"
import SubjectClassWorkTile from "./utils/SubjectClassworkTile"

export default function SubjectClassWork(){
    const { name } = useParams();
    return (
        <div className=" flex flex-col px-3 h-screen overflow-y-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar">
            <h1 className="text-xl font-medium">{name} ClassWork</h1>
            <div className=" flex flex-col tablet:flex-row items-center gap-3 w-full py-2">
                <ProgressCard
                title={`Syllabus Completed in ${name} I`}
                percent='40'
                centerText='40%'
                trailColor='#c8ebc9'
                strokeColor='#4caf50'
            />
            <ProgressCard
                title={`Syllabus Completed in ${name} II`}
                percent='60'
                centerText='60%'
                trailColor='#90CAF9'
                strokeColor='#2196F3'
            />
            <ProgressCard
                title={`Syllabus Completed in ${name} III`}
                percent='70'
                centerText='70%'
                trailColor='#eac9fe'
                strokeColor='#9100ec'
            />

            </div>
            <h1 className="text-xl font-medium mt-4 ">List of ClassWork</h1>
            <SubjectClassWorkTile subject={name} classwork='Complete Exercise 2.9 .' assignedDate='01/05/2024'/>
            <SubjectClassWorkTile subject={name} classwork='Complete Exercise 2.9 .' assignedDate='31/04/2024'/>
            <SubjectClassWorkTile subject={name} classwork='Complete Exercise 2.9 .' assignedDate='30/04/2024'/>
            <SubjectClassWorkTile subject={name} classwork='Complete Exercise 2.9 .' assignedDate='29/04/2024'/>
            <SubjectClassWorkTile subject={name} classwork='Complete Exercise 2.9 .' assignedDate='28/04/2024'/>
            <SubjectClassWorkTile subject={name} classwork='Complete Exercise 2.9 .' assignedDate='27/04/2024'/>
            <SubjectClassWorkTile subject={name} classwork='Complete Exercise 2.9 .' assignedDate='26/04/2024'/>
        </div>
        
    )
}