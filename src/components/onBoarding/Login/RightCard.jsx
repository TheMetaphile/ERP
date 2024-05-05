import { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../../../assets/school logo.png'

export default function RightCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    return (
        <div className="flex flex-col w-fit  bg-white rounded-2xl shadow-lg px-10 justify-center">

            <img src={logo} alt="img" className="mr-4 h-28 w-28 self-center" />

            <h1 className="text-2xl font-bold whitespace-nowrap">Welcome Back</h1>
            <h1 className="text-lg mt-2 text-gray-400">Please Enter Your ID & Password</h1>

            <h1 className="text-xl font-bold mt-3 ">Login Id</h1>

            <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                className="w-80 rounded-lg shadow-md px-3 py-2 border-2 border-gray-500 mt-2 text-lg "
            />

            <h1 className="text-xl font-bold mt-3">Password</h1>

            <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                className="w-80 rounded-lg shadow-md px-3 py-2 border-2 border-gray-500 mt-2 text-lg "
            />
            <Link to='/resetpassword' className="w-fit mt-2">
                <h1 className=" text-lg text-blue-600">Forgot Password?</h1>
            </Link>
            
            <div className="flex w-60 px-3 py-2  mt-2 text-lg justify-between">
                <label className="text-lg font-medium text-center">
                    <input
                        type="radio"
                        name="role"
                        value="Admin-Dashboard"
                        checked={role === "Admin-Dashboard"}
                        onChange={handleRoleChange}
                        className="mr-3 w-4 h-4"
                    />
                    Admin
                </label>

                <label className="text-lg font-medium text-center">
                    <input
                        type="radio"
                        name="role"
                        value="Student-Dashboard"
                        checked={role === "Student-Dashboard"}
                        onChange={handleRoleChange}
                        className="mr-3 w-4 h-4"
                    />
                    Student
                </label>
            </div>

            <Link to={`${role}`} className="flex w-64 shadow-md rounded-2xl py-2 mb-4 mt-2 justify-center self-center  bg-blue-600">
                <h1 className="font-medium text-2xl text-white">Login</h1>
            </Link>
        </div>
    )
}