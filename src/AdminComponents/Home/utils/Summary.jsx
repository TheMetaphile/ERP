import SummaryTile from "./SummaryTile";
import students from './../../../assets/Students.png'
import teachers from './../../../assets/teachers.png'
import workers from './../../../assets/workers.png'
import events from './../../../assets/events.png'
import earning from './../../../assets/earning.png'
export default function Summary(){
    return (
        <div className="flex mobile:max-tablet:grid mobile:max-tablet:grid-cols-2 rounded-lg mt-4 mb-4 gap-4">
            <SummaryTile img={students} title='Students' value='1020'/>
            <SummaryTile img={teachers} title='Teachers' value='250'/>
            <SummaryTile img={workers} title='Workers' value='60'/>
            <SummaryTile img={events} title='Events' value='50'/>
            <SummaryTile img={earning} title='Earning' value='Rs. 65,35,530'/>
        </div>
    )
}