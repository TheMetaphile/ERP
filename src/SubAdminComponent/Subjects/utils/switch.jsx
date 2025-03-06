import React from 'react';
import { Check, X } from "react-feather";

function Switch({ checked, changeRole, darkMode }) {
    const handle = (checked) => {
        changeRole(checked);
    };

    return (
        <label className="cursor-pointer" onClick={() => handle(!checked)}>
            <div className={`w-14 p-1 rounded-full transition-colors duration-200 ${checked
                    ? darkMode ? "bg-blue-900" : "bg-blue-200"
                    : darkMode ? "bg-gray-700" : "bg-gray-200"
                }`}>
                <div className={`w-fit p-0.5 shadow-sm rounded-full transition-all duration-300 text-white ${checked
                        ? `${darkMode ? "bg-blue-600" : "bg-blue-500"} translate-x-6`
                        : `${darkMode ? "bg-gray-600" : "bg-gray-400"} -rotate-180`
                    }`}>
                    {checked ? <Check size={20} /> : <X size={20} />}
                </div>
            </div>
        </label>
    );
}

export default Switch;