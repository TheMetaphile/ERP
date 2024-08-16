import { useState } from "react";
import ReadmissionDialog from "./Dialogadmit";
import { motion } from "framer-motion";

function AdmissionTileRow({ data, index, clickedIndex, setClickedIndex,  handleRemove }) {
    const [loadinfIndex, setLoadingIndex] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleClick = () => {
        setClickedIndex(index);
    };


    const handleReadmit = (email, index) => {
        setIsDialogOpen(true);
        setLoadingIndex(index);
    };

    const handleSave = () => {
        handleRemove(data);
    };

    return (
        <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
      >
        <div
            key={index}
            className={`flex text-center mobile:max-tablet:gap-2 items-center justify-evenly border rounded-lg py-2 pl-2 mb-2 tablet:max-laptop:w-fit ${clickedIndex === index ? 'bg-purple-100' : ''}`}
            onClick={handleClick}
        >
            <div className="w-40 flex justify-center">
                <img src={data.profileLogo || userimg} alt="" className="h-8 w-8 rounded-full" />
                <h1 className="text-base w-32">{data.name}</h1>
            </div>

            <h1 className="text-base  w-40 ">{data.currentClass}</h1>
            <h1 className="text-base  w-40">{data.section}</h1>
            <h1 className="text-base  w-40">{data.fatherPhoneNumber}</h1>
            <h1 className="text-base  w-52">{data.email}</h1>
            <button className="bg-purple-100 text-purple-500 px-2 py-0.5 mr-2 rounded" onClick={() => handleReadmit(data.email, data.name, index)}>Readmission</button>

            {isDialogOpen && (
                <ReadmissionDialog
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    user={data}
                    onSave={handleSave}
                />
            )}

        </div>
        </motion.div>
    )
}

export default AdmissionTileRow