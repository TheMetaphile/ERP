import { Link } from "react-router-dom";
import logo from '../../../assets/school logo.png'
import { useState } from "react";

export default function RightCard() {
    const [newPassword, setNewPassword] = useState('');
    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };
    return (
        <div className="flex flex-col flex-shrink tablet:py-10 mobile:max-tablet:py-2 mobile:max-tablet:px-2 mobile:max-tablet:my-10 bg-white rounded-3xl shadow-lg tablet:px-10 justify-center">

            <img src={logo} alt="img" className="mr-4 h-32 w-32 self-center" />

            <h1 className="text-2xl text-center font-bold whitespace-nowrap">Reset Password</h1>

            <h1 className="text-xl font-bold mt-5 ">New Password</h1>

            <input
                type="password"
                id="email"
                name="email"
                value={newPassword}
                onChange={handleNewPasswordChange}
                placeholder="Enter new password"
                className="w- rounded-xl shadow-md px-3 py-2 border-2 border-gray-500 mt-3 text-lg "
            />
            <h1 className="text-xl font-bold mt-5 ">Confirm Password</h1>

            <input
                type="password"
                id="email"
                name="email"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Re-enter new password"
                className="w- rounded-xl shadow-md px-3 py-2 border-2 border-gray-500 mt-3 text-lg "
            />

            <Link to='/' className="flex w-64 shadow-md rounded-2xl py-2 justify-center self-center  bg-blue-600 mt-8">
                <h1 className="font-medium text-2xl text-white">Change</h1>
            </Link>
        </div>
    )
}