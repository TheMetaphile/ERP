import logo from '../../../assets/school logo.png'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState, useContext } from "react";
import AuthContext from '../../../Context/AuthContext';
import Loading from '../../../LoadingScreen/Loading'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RightCard() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { authState } = useContext(AuthContext);
    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };
    const handleConfirm = async () => {
        setIsSubmitting(true);
        if (newPassword !== confirmPassword) {
            const errorMessage = 'Passwords do not match';
            toast.error(errorMessage);
           
            setIsSubmitting(false);
            return;
        }
        try {
            console.log("mail password", authState.email, newPassword)
            const response = await axios.post(`https://loginapi-y0aa.onrender.com/password/forgot/Student`, {
                email: authState.email,
                newPassword
            });
            const success = response.data;
            if (success) {
                console.log("Success")
                toast.success('Success');
                navigate('/');
            }
            else {
                setError('Failed to Reset');
                setTimeout(() => {
                    setError('');
                }, 2000)
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

            <h1 className="text-2xl text-center font-bold whitespace-nowrap">Reset Password</h1>
            {/* {error && <p className="text-red-500">{error}</p>} */}
            <h1 className="text-xl font-bold mt-5 ">New Password</h1>

            <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={handleNewPasswordChange}
                placeholder="Enter new password"
                className="w- rounded-xl shadow-md px-3 py-2 border-2 border-gray-500 mt-3 text-lg "
                disabled={isSubmitting}
            />
            <h1 className="text-xl font-bold mt-5 ">Confirm Password</h1>

            <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Re-enter new password"
                className="w- rounded-xl shadow-md px-3 py-2 border-2 border-gray-500 mt-3 text-lg "
                disabled={isSubmitting}
            />

            <button className="flex w-64 shadow-md rounded-2xl py-2 justify-center self-center  bg-blue-600 mt-8" onClick={handleConfirm} disabled={isSubmitting}>

            {isSubmitting ? <Loading /> : <h1 className="font-medium text-2xl text-white">Change</h1>}
            </button>
        </div>

    )
}