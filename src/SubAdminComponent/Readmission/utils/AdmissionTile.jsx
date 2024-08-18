import { useState } from "react";
import AdmissionTileRow from "./AdmissionTileRow";
import ReadmissionDialog from "./Dialogadmit";

export default function StudentDetailTile({ userData, handleRemove }) {
    const [clickedIndex, setClickedIndex] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    const handleSave = () => {
        handleRemove(data);
    };

    return (
        <div className=" w-full ">
            {userData.map((user, index) => (
                <AdmissionTileRow key={user}
                    data={user}
                    index={index}
                    clickedIndex={clickedIndex}
                    setClickedIndex={setClickedIndex}
                    handleRemove={handleRemove}
                    setIsDialogOpen={setIsDialogOpen}
                />


            ))}
            {isDialogOpen && (
                <ReadmissionDialog
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    user={userData[clickedIndex]}
                    onSave={handleSave}
                />
            )}
        </div>

    );
}

