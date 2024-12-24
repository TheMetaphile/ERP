import LeftCard from "./LeftCard";
import RightCard from "./RightCard";
import MetaphileLogo from './../../../assets/metaphile_logo.png';

export default function Login() {
  return (
    <div className="w-screen h-screen bg-login flex flex-col items-center justify-center">
      <div className="flex mobile:max-tablet:flex-col self-center items-center  mobile:py-3 tablet:px-6 mobile:px-3 overflow-y-auto tablet:flex tablet:justify-between">
        <LeftCard />
        <RightCard />
      </div>
      <div className="flex items-center mt-5 mb-3 ">
        <img src={MetaphileLogo} alt="" className="h-8 w-8 mr-4" />
        <p className="font-sans text-lg font-medium">Designed and Developed by </p>
        <a href="https://metaphile.in" target="_blank" rel="noopener noreferrer" className="font-sans text-lg font-medium text-blue-800">&nbsp;Metaphile pvt. ltd.</a>
      </div>
    </div>
  )
}