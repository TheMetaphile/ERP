import React, { useContext } from "react";
import AuthContext from '../../../Context/AuthContext'

function Apply() {
    const { authState } = useContext(AuthContext);

    return (
        <div className=" border border-gray-300 shadow-md rounded-lg py-2 mt-4 mr-3 ml-3">
            <h1 className='tablet:text-3xl mobile:max-tablet:text-xl font-medium text-text_blue text-center'>Profile</h1>
            <div className="border-t-2 border-text_blue my-3 tablet:mx-3 rounded-full "></div>
            <div className='flex space-x-10 justify-center items-center'>
                <div className='flex flex-col text-center items-center'>
                    <img src={authState.userDetails.profileLink} alt="img" className=' w-20 h-20 rounded-full mobile:max-tablet:hidden' />
                    <h1 className='mt-2 teblet:text-2xl mobile:max-tablet:text-xl font-medium '>{authState.userDetails.name}</h1>
                </div>
                <div className='flex'>
                    <div className='text-lg mobile:max-tablet:text-sm font-medium tablet:w-60 mobile:max-tablet:w-48 my-2'>
                        <h1>Employee ID</h1>
                        <h1>Department</h1>
                        <h1>Designation</h1>
                        <h1>Salary</h1>
                        <h1>Email</h1>
                        <h1>Date of Joining</h1>
                        <h1>Date of Last Increment</h1>
                    </div>
                    <div className='text-lg mobile:max-tablet:text-sm w-60 text-gray-400 my-2'>
                        <h1>{authState.userDetails.employeeId}</h1>
                        <h1>10th - 12th</h1>
                        <h1>Teacher</h1>
                        <h1>40,000 Rs</h1>
                        <h1>{authState.userDetails.email}</h1>
                        <h1>10-06-2024</h1>
                        <h1>10-07-2024</h1>
                    </div>
                </div>
            </div>
            <div className="border-t-2 border-text_blue my-3 tablet:mx-3 rounded-full "></div>

            <div className="mr-3 ml-3">
                <h1 className="font-medium text-lg mobile:max-tablet:text-sm">Qualification</h1>
                <div className="overflow-x-auto border border-black mt-2 rounded-lg">
                    <table className="min-w-full border-collapse border border-gray-400">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-sm font-medium text-center uppercase tracking-wider border border-gray-400"></th>
                                <th className="px-6 py-3 text-sm font-medium text-center uppercase tracking-wider border border-gray-400">UG</th>
                                <th className="px-6 py-3 text-sm font-medium text-center uppercase tracking-wider border border-gray-400">PG</th>
                                <th className="px-6 py-3 text-sm font-medium text-center uppercase tracking-wider border border-gray-400">Ph.D</th>
                                <th className="px-6 py-3 text-sm font-medium text-center uppercase tracking-wider border border-gray-400">Other</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {["Degree", "Specialization", "Year", "University/College", "Verified by principal"].map((label, index) => (
                                <tr key={index} className="border border-gray-400">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-400">{label}</td>
                                    {[...Array(4)].map((_, i) => (
                                        <td key={i} className="px-6 py-2 whitespace-nowrap border border-gray-400">
                                            <input
                                                type="text"
                                                className="border py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-3">
                    <h1 className="font-medium text-lg mobile:max-tablet:text-sm">Experience</h1>
                    <div className="overflow-x-auto border border-black mt-2 rounded-lg">
                        <table className="min-w-full border-collapse border border-gray-400">
                            <thead className="bg-gray-50">
                                <tr className=" whitespace-nowrap">
                                    <th className="px-6 py-3 text-sm font-medium text-center  border border-gray-400">Total Experience</th>
                                    <th className="px-6 py-3 text-sm font-medium text-center  border border-gray-400">Experience in School</th>
                                    <th className="px-6 py-3 text-sm font-medium text-center  border border-gray-400">Experience other than School</th>
                                    <th className="px-6 py-3 text-sm font-medium text-center  border border-gray-400">Verified by Principal</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                <tr className="border border-gray-400">
                                    <td className="px-6 py-4 whitespace-nowrap border border-gray-400">
                                        <input type="text" className="border py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap border border-gray-400">
                                        <input type="text" className="border py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap border border-gray-400">
                                        <input type="text" className="border py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap border border-gray-400">
                                        <input type="text" className="border py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-3">
                    <h1 className="font-medium text-lg mobile:max-tablet:text-sm">Result Analysis</h1>
                    <div className="overflow-x-auto border border-black mt-2 rounded-lg">
                        <table className="min-w-full border-collapse border border-gray-400">
                            <thead className="bg-gray-50">
                                <tr className=" whitespace-nowrap">
                                    <th className="px-6 py-3 text-sm font-medium text-center  border border-gray-400" colSpan="2">Half Yearly</th>
                                    <th className="px-6 py-3 text-sm font-medium text-center  border border-gray-400" colSpan="2">Final Exam</th>
                                    <th className="px-6 py-3 text-sm font-medium text-center  border border-gray-400" rowSpan="2">Verified by Principal</th>
                                </tr>
                                <tr className=" whitespace-nowrap">
                                    <th className="px-6 py-3 text-sm font-medium text-center  border border-gray-400">Subject Taught</th>
                                    <th className="px-6 py-3 text-sm font-medium text-center  border border-gray-400">Result</th>
                                    <th className="px-6 py-3 text-sm font-medium text-center  border border-gray-400">Subject Taught</th>
                                    <th className="px-6 py-3 text-sm font-medium text-center  border border-gray-400">Result</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                <tr className="border border-gray-400">
                                    <td className="px-6 py-4 whitespace-nowrap border border-gray-400">
                                        <input type="text" className="border py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap border border-gray-400">
                                        <input type="text" className="border py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap border border-gray-400">
                                        <input type="text" className="border py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap border border-gray-400">
                                        <input type="text" className="border py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap border border-gray-400">
                                        <input type="text" className="border py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-3">
                    <h1 className="font-medium text-lg mobile:max-tablet:text-sm">To be furnished by Dean/ Principal</h1>
                    <div className="overflow-x-auto border border-black mt-2 rounded-lg">
                        <table className="min-w-full border-collapse border border-gray-400">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-sm font-medium text-center  border border-gray-400">Category</th>
                                    <th className="px-6 py-3 text-sm font-medium text-center  border border-gray-400">Poor</th>
                                    <th className="px-6 py-3 text-sm font-medium text-center  border border-gray-400">Good</th>
                                    <th className="px-6 py-3 text-sm font-medium text-center  border border-gray-400">Excellent</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {["Personal Behaviour", "Punctuality", "Discipline", "Knowledge of subject dealing with", "Promptness in Disposal of Assignment", "Attitude towards Others", "Loyalty"].map((label, index) => (
                                    <tr key={index} className="border border-gray-400">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-400">{label}</td>
                                        {[...Array(3)].map((_, i) => (
                                            <td key={i} className="px-6 py-2 whitespace-nowrap border border-gray-400">
                                                <input
                                                    type="text"
                                                    className="border py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-3">
                    <h1 className="font-medium text-lg mobile:max-tablet:text-sm">Record of Absence filled by Dean/ Principal</h1>
                    <div className="overflow-x-auto border border-black mt-2 rounded-lg">
                        <table className="min-w-full border-collapse border border-gray-400">
                            <thead className="bg-gray-50">
                                <tr className=" whitespace-nowrap">
                                    <th className="px-6 py-3 text-sm font-medium text-center  border border-gray-400" rowSpan="2">Type of Leave</th>
                                    <th className="px-6 py-3 text-sm font-medium text-center  border border-gray-400" colSpan="2">No. of Leaves</th>
                                    <th className="px-6 py-3 text-sm font-medium text-center  border border-gray-400" rowSpan="2">Signature of Director</th>
                                </tr>
                                <tr>
                                    <th className="px-6 py-3 text-sm font-medium text-center  border border-gray-400">1-6 Months</th>
                                    <th className="px-6 py-3 text-sm font-medium text-center  border border-gray-400">6-12 Months</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {["Casual", "Medical", "Duty", "Leave without Pay"].map((leaveType, index) => (
                                    <tr key={index} className="border border-gray-400">
                                        <td className="px-6 py-4 whitespace-nowrap border border-gray-400 text-sm font-medium text-gray-900">{leaveType}</td>
                                        <td className="px-6 py-4 whitespace-nowrap border border-gray-400">
                                            <input
                                                type="text"
                                                className="border py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap border border-gray-400">
                                            <input
                                                type="text"
                                                className="border py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap border border-gray-400">
                                            <input
                                                type="text"
                                                className="border py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-3">
                    <h1 className="font-medium text-lg mobile:max-tablet:text-sm">Brief about yourself</h1>
                    <div className=" mt-2 ">
                        <textarea
                            rows="4"
                            className="w-full border border-black rounded-lg"
                            placeholder="Enter your remarks here..."
                        />
                    </div>
                </div>

                <div className="mt-3">
                    <h1 className="font-medium text-lg mobile:max-tablet:text-sm">Brief about your outstanding contribution toward Institution</h1>
                    <div className=" ">
                        <textarea
                            rows="4"
                            className="w-full border mobile:max-tablet:text-sm border-black mt-2 rounded-lg"
                            placeholder="Enter your remarks here..."
                        />
                    </div>
                </div>

                <div className="mt-3 px-4">
                    <div className="flex items-center gap-1 justify-between mobile:max-tablet:flex-col">
                        <div className="flex items-center gap-2">
                            <label className="block text-sm font-medium whitespace-nowrap">Present Salary</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block mobile:max-tablet:w-28 mobile:max-tablet:py-1 w-40 sm:text-sm p-2"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="block text-sm font-medium whitespace-nowrap">Expected Salary</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block mobile:max-tablet:w-28 mobile:max-tablet:py-1 w-40 sm:text-sm p-2"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-4 mb-3 px-4 flex justify-end">
                    <button className="bg-purple-300 hover:bg-purple-500 py-1 px-2 rounded-lg shadow-md cursor-pointer">Submit</button>
                </div>

            </div>
        </div>
    )
}

export default Apply