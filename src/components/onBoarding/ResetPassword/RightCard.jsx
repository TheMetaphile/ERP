import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from '../../../assets/school logo.png'
import OTPInput from "react-otp-input";

export default function RightCard() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    return (
        <div className="flex flex-col flex-shrink h-8/10 bg-white rounded-3xl shadow-lg px-10 justify-center">

            <img src={logo} alt="img" className="mr-4 h-32 self-center" />

            <h1 className="text-2xl font-bold whitespace-nowrap">Reset Password</h1>

            <h1 className="text-xl font-bold mt-5 ">Login Id</h1>

            <div className="flex justify-between mt-3">
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    className="w-2/3 rounded-xl shadow-md px-3 py-2 border-2 border-gray-500  text-lg "
                />
                <button className="py-2 px-3 whitespace-nowrap rounded-xl shadow-md self-center bg-secondary">
                    Send OTP
                </button>
            </div>
            <h1 className="text-xl font-bold mt-5 ">Verify OTP</h1>
            <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderInput={(props) => <input {...props} />}
                inputStyle={'p-2 rounded-2xl shadow-lg border-grey-400 border-4 text-2xl mr-7 w-14 text-center'}
                skipDefaultStyles={true}
                containerStyle={'mt-5'}
            />

            <Link to='/newPassword' className="flex w-64 shadow-md rounded-2xl py-2 justify-center self-center  bg-blue-600 mt-8">
                <h1 className="font-medium text-2xl text-white">Submit</h1>
            </Link>
        </div>
    )
}