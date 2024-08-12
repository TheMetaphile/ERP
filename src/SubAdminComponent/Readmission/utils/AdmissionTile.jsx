import { useState, useContext, useEffect } from "react";
import axios from 'axios';
import AuthContext from "../../../Context/AuthContext";
import Loading from "../../../LoadingScreen/Loading";
import { BASE_URL_Login } from "../../../Config";
import { toast } from "react-toastify";
import ReadmissionDialog from "./Dialogadmit";

export default function StudentDetailTile({ userData, user, index }) {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [newData, setNewData] = useState(userData);
    const [loadinfIndex, setLoadingIndex] = useState('');
    const [clickedIndex, setClickedIndex] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleClick = (index) => {
        setClickedIndex(index);
    };

    const handleReadmit = (email, index) => {
        setIsDialogOpen(true);
        // console.log(authState.accessToken, email)
        // setLoading(true);
        // setLoadingIndex(index);
        // try {
        //     const response = await axios.delete(`${BASE_URL_Login}/terminate/student`, {
        //         data: {
        //             email: email,
        //             accessToken: authState.accessToken
        //         }
        //     });
        //     console.log(response.data);
        //     toast.success("Student terminated successfully");
        //     setNewData((prevData) => prevData.filter(user => user.email !== email));
        // } catch (error) {
        //     console.error("There was an error terminating the student!", error);
        //     toast.error("Failed to terminate the student");
        // }
        // finally {
        //     setLoading(false);
        // }
    };
    const handleSave = (email, streams) => {
        console.log(`Readmitting ${email} to streams ${streams.join(', ')}`);
    };

    return (


        <div className=" w-full ">
            {newData.map((user, index) => (
                <div key={index} className={`flex  text-center mobile:max-tablet:gap-2 items-center justify-evenly border rounded-lg py-2 pl-2 mb-2 tablet:max-laptop:w-fit  ${clickedIndex === index ? 'bg-secondary' : ''}`} onClick={() => handleClick(index)}>
                    <div className="w-40 flex justify-center">

                        <img src={user.profileLogo || userimg} alt="" className="h-8 w-8 rounded-full" />
                        <h1 className="text-base w-32">{user.name}</h1>

                    </div>


                    <h1 className="text-base  w-40 ">{user.currentClass}</h1>
                    <h1 className="text-base  w-40">{user.section}</h1>
                    <h1 className="text-base  w-40">{user.fatherPhoneNumber}</h1>
                    <h1 className="text-base  w-52">{user.email}</h1>
                    {index === setLoadingIndex && loading ? <Loading /> :
                        <button className="bg-purple-100 text-purple-500 px-2 py-0.5 mr-2 rounded" onClick={() => handleReadmit(user.email, user.name, index)}>Readmission</button>

                    }
                    <ReadmissionDialog
                        isOpen={isDialogOpen}
                        onClose={() => setIsDialogOpen(false)}
                        onSave={handleSave}
                        user={user}
                    />

                </div>
            ))}
        </div>



    );
}

