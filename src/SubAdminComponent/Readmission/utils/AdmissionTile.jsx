import { useState } from "react";
import AdmissionTileRow from "./AdmissionTileRow";

export default function StudentDetailTile({ userData, handleRemove }) {
    const [clickedIndex, setClickedIndex] = useState(null);

    return (
        <div className=" w-full ">
            {userData.map((user, index) => (
                <AdmissionTileRow key={user}
                    data={user}
                    index={index}
                    clickedIndex={clickedIndex}
                    setClickedIndex={setClickedIndex}
                    handleRemove={handleRemove} />
            ))}
        </div>

    );
}

