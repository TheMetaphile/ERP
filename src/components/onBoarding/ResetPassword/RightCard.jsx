import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import logo from '../../../assets/school logo.png'
import OTPInput from "react-otp-input";

export default function RightCard() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [role, setRole] = useState('');
    const [otpToken, setOtpToken] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const sendOTP = async () => {
        setIsSubmitting(true);
        try {
            const response = await axios.post(`https://loginapi-y0aa.onrender.com/otp/send/${role}`, {
                email,
            });
            const { otpToken } = response.data;
            console.log(otpToken);
            setOtpToken(otpToken);
            localStorage.setItem('otpToken', otpToken);
        }
        catch (error) {
            console.error(error);
            setError(error.response?.data?.error || 'An error ocured');
            setTimeout(() => {
                setError('');
            }, 2000);
        }
        finally {
            setIsSubmitting(false);
        }

    }

    const verifyOTP = async () => {
        setIsSubmitting(true);
        try {
            const response = await axios.post(`https://loginapi-y0aa.onrender.com/otp/verify`, {
                email,
                otp,
                otpToken
            });
            const  success  = response.data;
            localStorage.setItem('email', email);
            if (success) {
                navigate('/newPassword');
            }
            else {
                setError('Invalid OTP');
                setTimeout(() => {
                    setError('');
                }, 2000)
            }
        }
        catch (error) {
            console.error(error);
            setError(error.response?.data?.error || 'An error ocured');
            setTimeout(() => {
                setError('');
            }, 2000);
        }
        finally {
            setIsSubmitting(false);
        }

    }

    return (
        <div className="flex flex-col flex-shrink tablet:py-10 mobile:max-tablet:py-5 mobile:max-tablet:px-5 mobile:max-tablet:my-10 bg-white rounded-3xl shadow-lg tablet:px-10 justify-center">

            <img src={logo} alt="img" className="mr-4 h-32 self-center" />

            <h1 className="tablet:text-2xl mobile:text-xl font-bold self-center whitespace-nowrap">Reset Password</h1>
            {error && <p className="text-red-500">{error}</p>}
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
                    disabled={isSubmitting}
                />
                <button className="py-2 px-3 whitespace-nowrap rounded-xl shadow-md self-center bg-secondary" onClick={sendOTP}>
                    Send OTP
                </button>
            </div>
            <div className="flex w-60 px-3 py-2  mt-2 text-lg justify-between">
                <label className="text-lg font-medium text-center">
                    <input
                        type="radio"
                        name="role"
                        value="teacher"
                        checked={role === "teacher"}
                        onChange={handleRoleChange}
                        className="mr-3 w-4 h-4"
                        disabled={isSubmitting}
                    />
                    Admin
                </label>

                <label className="text-lg font-medium text-center">
                    <input
                        type="radio"
                        name="role"
                        value="student"
                        checked={role === "student"}
                        onChange={handleRoleChange}
                        className="mr-3 w-4 h-4"
                        disabled={isSubmitting}
                    />
                    Student
                </label>
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
                disabled={isSubmitting}
            />

            
            <button className="flex w-64 shadow-md rounded-2xl py-2 justify-center self-center  bg-blue-600 mt-8" onClick={verifyOTP} disabled={isSubmitting}>

                <h1 className="font-medium text-2xl text-white">Submit</h1>
            </button>
        </div>
    )
}