import LeftCard from "./LeftCard";
import RightCard from "./RightCard";

export default function SetNewPassword(){
    return (
        <div className="flex justify-between w-screen h-screen bg-newPassword  py-10 px-6">
            <LeftCard />
            <RightCard />
        </div>
    )
}