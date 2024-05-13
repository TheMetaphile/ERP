import { useParams } from "react-router-dom";
import ProgressCard from "../assignment_report/utils/progressCard"
import SubjectHomeWorkTile from "./utils/SubjectHomeWorkTile"

export default function SubjectHomeWork(){
    const { name } = useParams();
    return (
        <div className=" flex flex-col px-3 h-screen overflow-y-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar">
            <h1 className="text-xl font-medium">{name} HomeWork</h1>
            <div className=" flex flex-col tablet:flex-row items-center gap-3 w-full py-2">
                <ProgressCard
                title={`Total`}
                percent='100'
                centerText='9'
                trailColor='#335cff'
                strokeColor='#335cff'
            />
            <ProgressCard
                title={`Checked`}
                percent='100'
                centerText='5'
                trailColor='#25e87a'
                strokeColor='#25e87a'
            />
            <ProgressCard
                title={`Unchecked`}
                percent='100'
                centerText='3'
                trailColor='#fa323c'
                strokeColor='#fa323c'
            />
            <ProgressCard
                title={`Incomplete`}
                percent='100'
                centerText='1'
                trailColor='#c83bf7'
                strokeColor='#c83bf7'
            />

            </div>
            <h1 className="text-xl font-medium mt-4 ">List of HomeWork</h1>
            <SubjectHomeWorkTile subject={name} classwork='Write a Essay on My Mother ?' assignedDate='01-05-2024' bg='bg-green-200'/>
            <SubjectHomeWorkTile subject={name} classwork='Complete Exercise 2.9 .' assignedDate='31-04-2024' bg='bg-red-200'/>
            <SubjectHomeWorkTile subject={name} classwork='Complete Exercise 2.9 .' assignedDate='30-04-2024' bg='bg-purple-200'/>
            <SubjectHomeWorkTile subject={name} classwork='Complete Exercise 2.9 .' assignedDate='29-04-2024' bg='bg-green-200'/>
           
        </div>
        
    )
}