import { Check, X } from "react-feather"

export default function Switch () {

    return (<label className="cursor-pointer">
        <div className="w-14 p-1 rounded-full bg-blue-200" >
            <div className={`w-fit p-0.5 shadow-sm rounded-full transition-all duration-300 text-white  bg-blue-500 translate-x-6`}>
                <Check size={20} /> 
            </div>
        </div>
    </label>);
}

