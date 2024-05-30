import ProgressCard from "../../../components/assignment_report/utils/progressCard"


export default function Progress(){
   
    return (
        <div className=" flex flex-col px-3  overflow-y-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar">
           
            <div className=" flex flex-col tablet:flex-row items-center gap-3 w-full py-2">
                <ProgressCard
                title={`Leave Balance`}
                percent='40'
                centerText='05'
                trailColor='#c8ccc9'
                strokeColor='#7dc5f5'
            />
            <ProgressCard
                title={`Casual Leave`}
                percent='60'
                centerText='2'
                trailColor='#c8ccc9'
                strokeColor='#2196F3'
            />
            <ProgressCard
                title={`Medical Leave`}
                percent='70'
                centerText='4'
                trailColor='#c8ccc9'
                strokeColor='#fa70fa'
            />
            <ProgressCard
                title={`Annual Leave`}
                percent='70'
                centerText='7'
                trailColor='#c8ccc9'
                strokeColor='#ffb259'
            />
            <ProgressCard
                title={`Unpaid Leave`}
                percent='70'
                centerText='0'
                trailColor='#c8ccc9'
                strokeColor='#9100ec'
            />

            </div>
           
        </div>
        
    )
}