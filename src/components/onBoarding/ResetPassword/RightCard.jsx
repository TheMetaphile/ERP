import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import logo from '../../../assets/Bds_logo.png'
import OTPInput from "react-otp-input";
import AuthContext from "../../../Context/AuthContext";
import Loading from '../../../LoadingScreen/Loading'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL_Login } from "../../../Config";

export default function RightCard() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [role, setRole] = useState('');
    // const [otpToken, setOtpToken] = useState('');
    const [error, setError] = useState('');
    // const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { authState, reset } = useContext(AuthContext);

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const sendOTP = async () => {
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            toast.error("Please enter a valid email address.");
            return;
        }
        setIsSubmitting(true);
        setError('');
        try {
            const response = await axios.post(`${BASE_URL_Login}/otp/send/${role}`, {
                email,
            });
            if (response.status === 200) {
                const { otpToken } = response.data;
                reset(email, otpToken);
                console.log("OTP toooken", otpToken)

                toast.success('OTP sent successfully');
            }
        }
        catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.error || 'An error occurred';
            toast.error(errorMessage);
        }
        finally {
            setIsSubmitting(false);
        }

    }

    const verifyOTP = async () => {
        setIsSubmitting(true);
        try {
            const response = await axios.post(`${BASE_URL_Login}/otp/verify`, {
                email: authState.email,
                otp,
                otpToken: authState.otpToken
            });
            if (response.status === 200 && response.data.valid) {
                navigate('/newPassword');
            } else {
                toast.error('Invalid OTP');
            }

        }
        catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.error || 'An error occurred';
            toast.error(errorMessage);
        }
        finally {
            setIsSubmitting(false);
        }

    }

    return (
        <div className="flex flex-col flex-shrink tablet:py-10 mobile:max-tablet:py-5 mobile:max-tablet:px-5 mobile:max-tablet:my-10 bg-white rounded-3xl shadow-lg tablet:px-10 justify-center">
            <ToastContainer />
            <img src={logo} alt="img" className="mr-4 h-32 self-center" />

            <h1 className="tablet:text-2xl mobile:text-xl font-bold self-center whitespace-nowrap">Reset Password</h1>
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
            <div className="flex w-full  py-2  mt-2 text-lg justify-between">
                <select
                    name="role"
                    value={role}
                    onChange={handleRoleChange}
                    className="w-full p-2 border rounded"
                    disabled={isSubmitting}
                >
                    <option value="">Select Role</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Student">Student</option>
                    <option value="SubAdmin">Sub Admin</option>
                    <option value="Admin">Admin</option>


                </select>
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

                {isSubmitting ? <Loading /> : <h1 className="font-medium text-2xl text-white">Submit</h1>}
            </button>
        </div>
    )
}