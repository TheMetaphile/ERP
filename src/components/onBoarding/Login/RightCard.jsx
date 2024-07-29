import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../../../assets/school logo.png'
import axios from 'axios';
import AuthContext from "../../../Context/AuthContext";
import Loading from "../../../LoadingScreen/Loading"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL_Login } from "../../../Config";

export default function RightCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useContext(AuthContext);

    const handleRoleChange = (event) => {
        setRole(event.target.value);
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
            const endpoint = role === "Teacher-Dashboard" ? "/login/teacher" : role === "Sub-Admin" ? "/login/SubAdmin" : "/login/student";
            await axios.post(`${BASE_URL_Login}${endpoint}`, {
                email,
                password
            }).then(async(response) => {
                if (response.status == 200) {
                    console.log(response.data, "isuhgaoiud hfguj dsfkgj")
                    var { userDetails, tokens, subject, ClassDetails } = response.data;
                    console.log(userDetails, tokens);
                    var date = new Date();
                    if (role==="Teacher-Dashboard" && Object.keys(ClassDetails).length <= 0 && date.getHours()<17) {
                       
                        var month = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1; 
                        date = `${date.getFullYear()}-${month}-${date.getDate()}`
                        console.log(date);
                        var [ year1,month1,day] = date.split('-');
                        var session = '';
                        if (parseInt(month1) <= 3) {
                            session = `${parseInt(year1) - 1}-${`${year1}`.substring(2, 4)}`;
                        }
                        else {
                            console.log("here");
                            session = `${year1}-${`${(parseInt(year1) + 1)}`.substring(2, 4)}`;
                        }
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
                                if(response.data){
                                    ClassDetails = response.data;
                                }
                                
                                console.log("dsgsd" , ClassDetails);
                            })
                            .catch((error) => {
                                console.log(error);
                            });

                    }
                    login(userDetails, tokens, subject ? subject.subjects : [], ClassDetails, subject ? subject.Co_scholastic : []);
                    navigate(`/${role}`);
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
    return (
        <div className="flex flex-col bg-white rounded-2xl shadow-lg tablet:w-fit tablet:px-10 mobile:w-full mobile:px-7 mobile:max-tablet:mt-10 justify-center">
            <ToastContainer />
            <img src={logo} alt="img" className="mr-4 h-28 self-center" />

            <h1 className="tablet:text-2xl mobile:text-2xl font-bold self-center whitespace-nowrap">Welcome Back</h1>
            <h1 className="text-lg mt-2 text-gray-400">Please Enter Your ID & Password</h1>

            {/* {error && <div className="text-red-500 text-center mt-2">{error}</div>} */}
            <h1 className="text-xl font-bold mt-3 ">Login Id</h1>

            <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                className=" rounded-lg shadow-md px-3 py-2 border-2 border-gray-500 mt-2 text-lg "
                disabled={isSubmitting}
            />

            <h1 className="text-xl font-bold mt-3">Password</h1>
            <div className="relative">
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter your password"
                    className="rounded-lg shadow-md px-3 py-2 border-2 border-gray-500 mt-2 text-lg pr-10"
                    disabled={isSubmitting}
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    disabled={isSubmitting}
                >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>
            <Link to='/resetpassword' className="w-fit mt-2">
                <h1 className=" text-lg text-blue-600">Forgot Password?</h1>
            </Link>

            <div className="flex w-full   mt-2 text-lg justify-between">
                <select
                    name="role"
                    value={role}
                    onChange={handleRoleChange}
                    className="w-full p-2 border rounded"
                    disabled={isSubmitting}
                >
                    <option value="">Select Role</option>
                    <option value="Teacher-Dashboard">Teacher</option>
                    <option value="Student-Dashboard">Student</option>
                    <option value="Sub-Admin">Sub Admin</option>

                </select>

            </div>


            <button className="flex w-64 shadow-md rounded-2xl py-2 mb-4 mt-2 justify-center self-center  bg-blue-600" onClick={handleSubmit} disabled={isSubmitting}>

                {isSubmitting ? <Loading /> : <h1 className="font-medium text-2xl text-white">Login</h1>}

            </button>
        </div>
    )
}