import { Check, X } from "react-feather"

export default function Switch ({checked}) {
    
    return (<label className="cursor-pointer" >
        <div className={`w-14 p-1 rounded-full ${checked ? "bg-blue-200" : "bg-gray-200"}`}>
            <div className={`w-fit p-0.5 shadow-sm rounded-full transition-all duration-300 text-white ${checked ? "bg-blue-500 translate-x-6" : "bg-gray-400 -rotate-180"}`}>
                {checked ? <Check size={20} /> : <X size={20} />}
            </div>
        </div>
    </label>);
}

