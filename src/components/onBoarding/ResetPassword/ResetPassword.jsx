import LeftCard from "./LeftCard";
import RightCard from "./RightCard";

export default function ResetPassword(){
    return (
        <div className="w-screen h-screen self-center items-center bg-reset mobile:py-3 tablet:px-6 mobile:px-3 overflow-y-auto tablet:flex tablet:justify-between  mobile:max-table:flex-col-reverse mobile:max-table:justify-between">
      <LeftCard />
      <RightCard />
    </div>
    )
}