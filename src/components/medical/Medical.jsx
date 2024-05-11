import Disease from "./utils/Disease";
import Status from "./utils/Status";

export default function Medical() {

    return (
        <div>
            <div className="px-3 mt-2 ml-2 mr-3">
                <h1 className='text-2xl'>Your Health Status</h1>
                <Status />
            </div>
            <div className="px-3 mt-2 ml-2 mr-3"> 
                <h1 className='text-2xl'>Medical Record</h1>
                <Disease/>
                
            </div>
        </div>
    )
}

