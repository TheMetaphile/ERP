import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../../../assets/Bds_logo.png'
import axios from 'axios';
import AuthContext from "../../../Context/AuthContext";
import Loading from "../../../LoadingScreen/Loading"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL_Login } from "../../../Config";
import { messaging, getToken } from '../../../firebase';


export default function RightCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rolee, setRolee] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useContext(AuthContext);

    const handleRoleeChange = (event) => {
        setRolee(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async () => {
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            toast.error("Please enter a valid email address.");
            return;
        }
        setIsSubmitting(true);
        setError('');
        try {
            const endpoint = rolee === "Teacher-Dashboard" ? "/login/teacher" : rolee === "Sub-Admin" ? "/login/SubAdmin" : rolee === "Admin-Dashboard" ? "/login/admin" : "/login/student";
            await axios.post(`${BASE_URL_Login}${endpoint}`, {
                email,
                password
            }).then(async (response) => {
                if (response.status == 200) {
                    console.log(response.data, "isuhgaoiud hfguj dsfkgj")
                    var { userDetails, tokens, subject, ClassDetails, subjects } = response.data;
                    console.log(userDetails, tokens);
                    var date = new Date();
                    if (rolee === "Teacher-Dashboard" && date.getHours() < 17) {

                        var month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
                        date = `${date.getFullYear()}-${month}-${date.getDate()}`
                        console.log(date);
                        var [year1, month1, day] = date.split('-');
                        var session = '';
                        if (parseInt(month1) <= 3) {
                            session = `${parseInt(year1) - 1}-${`${year1}`.substring(2, 4)}`;
                        }
                        else {
                            console.log("here");
                            session = `${year1}-${`${(parseInt(year1) + 1)}`.substring(2, 4)}`;
                        }

                        if (Object.keys(ClassDetails).length <= 0) {
                            let config = {
                                method: 'get',
                                maxBodyLength: Infinity,
                                url: `${BASE_URL_Login}/classTeacherSubstitute/fetch/checkSubstitute?date=${date}&session=${session}`,
                                headers: {
                                    'Authorization': `Bearer ${tokens.accessToken}`
                                }
                            };

                            await axios.request(config)
                                .then((response) => {
                                    console.log(response, "respose dfh srh rh rfh sdf");
                                    if (response.data) {
                                        ClassDetails = response.data;
                                    }

                                    console.log("dsgsd", ClassDetails);
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        }

                        let config = {
                            method: 'get',
                            maxBodyLength: Infinity,
                            url: `${BASE_URL_Login}/CoordinatorSubstitute/fetch/checkSubstitute?date=${date}&session=${session}`,
                            headers: {
                                'Authorization': `Bearer ${tokens.accessToken}`
                            }
                        };

                        await axios.request(config)
                            .then((response) => {
                                console.log(response, "respose coordinator");
                                if (response.data) {
                                    userDetails.co_ordinator_wing = response.data.wing;
                                }

                                console.log("coordinator respo", userDetails);
                            })
                            .catch((error) => {
                                console.log(error);
                            });


                    }
                    const token = await requestPermission(tokens.accessToken);
                    login({ ...userDetails, rolee }, tokens, subject ? subject.subjects : [], ClassDetails, subject ? subject.Co_scholastic : [], subjects ? subjects : [], token);
                    // navigate(`/${rolee}`);
                }
            });

        }
        catch (error) {
            console.log(error);
            const errorMessage = error.response?.data?.error || 'An error occured'
            setError(errorMessage);
            toast.error(errorMessage);
        }
        finally {
            setIsSubmitting(false);
        }
    }


    // Request permission to send notifications
    const requestPermission = async (accessToken) => {
        try {
            const registration = await navigator.serviceWorker.ready;
            await Notification.requestPermission();
            const token = await getToken(messaging, { vapidKey: 'BFSxjvP6e1f3aPaE6KhR4izey4zKE9iLCHEXMoEKFJDqUP3L7esYA8BOjC6JQ_Qr-bvOq1uXHLpD2B0uiYx3hAM', serviceWorkerRegistration: registration, });
            console.log('FCM Token:', token);
            sendToken(token, accessToken);
            return token;
            // You can send the token to your server to save it and use it to send push notifications
        } catch (error) {
            console.error('Error getting FCM token', error);
            return '';
        }
    };

    const sendToken = async (token, accessToken) => {
        try {
            const response = await axios.put(`${BASE_URL_Login}/notification/addToken`,
                {
                    token: token
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                }
            );
            if (response.status === 200) {
                console.log('token send', response.data);
            }
        } catch (error) {
            console.error("Error sending token:", error);
        }
    };

    return (
        <div className="flex flex-col bg-white rounded-2xl shadow-lg tablet:w-96 mobile:w-full px-7 py-6 justify-center space-y-5">
            <ToastContainer />
            <img src={logo} alt="img" className="h-24 self-center" />

            <h1 className="text-2xl font-bold text-center">Welcome Back</h1>
            <h1 className="text-lg text-gray-400 text-center">Please Enter Your ID & Password</h1>

            <div>
                <label htmlFor="email" className="text-xl font-bold">Login Id</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    className="rounded-lg shadow-md px-3 py-2 border-2 border-gray-300 mt-2 w-full text-lg"
                    disabled={isSubmitting}
                />
            </div>

            <div>
                <label htmlFor="password" className="text-xl font-bold">Password</label>
                <div className="relative mt-2">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Enter your password"
                        className="rounded-lg shadow-md px-3 py-2 border-2 border-gray-300 w-full text-lg pr-12"
                        disabled={isSubmitting}
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        disabled={isSubmitting}
                    >
                        {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            <Link to="/resetpassword" className="text-blue-600 text-center text-lg">Forgot Password?</Link>

            <div className="w-full">
                <label htmlFor="rolee" className="sr-only">Select Role</label>
                <select
                    name="rolee"
                    value={rolee}
                    onChange={handleRoleeChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    disabled={isSubmitting}
                >
                    <option value="">Select Role</option>
                    <option value="Teacher-Dashboard">Teacher</option>
                    <option value="Student-Dashboard">Student</option>
                    <option value="Sub-Admin">Sub Admin</option>
                    <option value="Admin-Dashboard">Admin</option>
                </select>
            </div>

            <button
                className="w-full shadow-md rounded-2xl py-2 flex justify-center bg-blue-600 text-white font-medium text-lg hover:bg-blue-700 transition"
                onClick={handleSubmit}
                disabled={isSubmitting}
            >
                {isSubmitting ? <Loading /> : "Login"}
            </button>
        </div>

    )
}