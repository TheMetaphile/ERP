import check from './../../../assets/Checkmark.png'
import cross from './../../../assets/Circled X.png'
import excla from './../../../assets/exclamation.png'

export default function SubjectHomeWorkTile(props){
    const backgroundColor = props.bg;
    let icon;
    if (backgroundColor === "bg-green-200") {
        icon = check;
    } else if (backgroundColor === "bg-red-200") {
        icon = cross;
    } else {
        icon = excla;
    }
    return (
        <div className={`mt-3 w-full p-3 flex justify-between rounded-lg shadow-md items-center ${backgroundColor}`}>
            <div className=" mobile:max-tablet:flex-col ">
                <div className=" px-3 py-1 bg-bg_blue rounded-full w-fit">{props.subject}</div>
                <div className="pl-2 mt-3 font-medium">{props.classwork}</div>
            </div>
    
            <div className="flex items-center">
                <img src={icon} alt="Icon" className="mr-2" />
                <h1 className="font-medium">Date: {props.assignedDate}</h1>
            </div>
        </div>
    )
}