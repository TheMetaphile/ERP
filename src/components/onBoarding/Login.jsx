import LeftCard from "./LeftCard";
import RightCard from "./RightCard";

export default function Login() {
    return (
        <div className="flex justify-between w-screen h-screen bg-login py-10 px-6">
            <LeftCard />
            <RightCard />
        </div>
    )
}