import { Check, X } from "react-feather"

export default function Switch ({checked,changeRole}) {
    const handle = (checked)=>{
        changeRole(checked);
    };
    return (
    <label className="cursor-pointer" onClick={()=>handle(!checked)}>
        <div className={`w-14 p-1 rounded-full ${checked ? "bg-blue-200" : "bg-gray-200"}`}>
            <div className={`w-fit p-0.5 shadow-sm rounded-full transition-all duration-300 text-white ${checked ? "bg-blue-500 translate-x-7" : "bg-gray-400 -rotate-180"}`}>
                {checked ? <Check size={15} /> : <X size={15} />}
            </div>
        </div>
        Scholastic
    </label>);
}

