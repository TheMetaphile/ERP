// import { MdOutlineFileDownload } from "react-icons/md";
export default function ClassWorkTile(props) {
    return (
        <div className=" p-2 mb-4  border border-black rounded-lg shadow-md mt-3 flex items-center justify-between">

  
            <div className='px-2 w-11/12'>
                <div className="pl-2 mt-1 font-normal text-xl">{props.description}</div>
                <div className="pl-2 mt-1 font-light text-xs text-gray-700">Class : {props.classs}</div>
            </div>

            {/* <MdOutlineFileDownload className="w-12 h-12"/> */}

            <div className='px-2 w-11/12 text-right'>
                <div className="pl-2 mt-1 font-light text-sm text-gray-700">{props.subject}</div>
                <div className="pl-2 mt-1 font-light text-xs text-gray-700">{props.day}</div>
            </div>

           
        </div>
    )
}

