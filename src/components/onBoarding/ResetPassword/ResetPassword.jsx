import LeftCard from "./LeftCard";
import RightCard from "./RightCard";

export default function ResetPassword(){
    return (
        <div className="flex justify-between w-screen h-screen bg-reset  py-10 px-6">
            <LeftCard />
            <RightCard />
        </div>
    )
}