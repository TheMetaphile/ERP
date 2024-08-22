import React, { useContext } from "react";
import AuthContext from '../../../Context/AuthContext';
import { FaUser, FaEnvelope, FaCalendarAlt, FaGraduationCap, FaBriefcase, FaChartBar, FaClipboardList } from 'react-icons/fa';

function Apply() {
    const { authState } = useContext(AuthContext);

    return (
        <div className="max-w-7xl mx-auto px-4 mobile:max-tablet:px-2 py-8 mobile:max-tablet:py-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 py-6">
                    <h1 className='text-3xl mobile:max-tablet:text-lg font-bold text-white text-center'>Employee Profile</h1>
                </div>

                <div className="p-6 mobile:max-tablet:p-2">
                    <div className='flex flex-col md:flex-row md:space-x-10 items-center mb-8'>
                        <div className='flex flex-col items-center mb-4 md:mb-0'>
                            <img src={authState.userDetails.profileLink} alt="Profile" className='w-32 h-32 rounded-full border-4 border-purple-500 shadow-lg' />
                            <h2 className='mt-4 text-2xl font-semibold text-gray-800'>{authState.userDetails.name}</h2>
                        </div>
                        <div className='flex-1 grid grid-cols-4 mobile:max-tablet:grid-cols-1 gap-4'>
                            {[
                                { icon: <FaUser />, label: "Employee ID", value: authState.userDetails.employeeId },
                                { icon: <FaGraduationCap />, label: "Department", value: "10th - 12th" },
                                { icon: <FaBriefcase />, label: "Designation", value: "Teacher" },
                                { icon: <FaEnvelope />, label: "Email", value: authState.userDetails.email },
                                { icon: <FaCalendarAlt />, label: "Date of Joining", value: "10-06-2024" },
                                { icon: <FaCalendarAlt />, label: "Last Increment", value: "10-07-2024" },
                            ].map((item, index) => (
                                <div key={index} className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg">
                                    <div className="text-purple-600">{item.icon}</div>
                                    <div>
                                        <p className="text-sm text-gray-600">{item.label}</p>
                                        <p className="font-medium text-gray-800">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Section title="Qualification" icon={<FaGraduationCap />}>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                    {["UG", "PG", "Ph.D", "Other"].map((header, index) => (
                                        <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {["Degree", "Specialization", "Year", "University/College", "Verified by principal"].map((label, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{label}</td>
                                        {[...Array(4)].map((_, i) => (
                                            <td key={i} className="px-6 py-4 whitespace-nowrap">
                                                <input
                                                    type="text"
                                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full border border-gray-300 sm:text-sm  rounded-md px-2 py-1"
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Section>

                    <Section title="Experience" icon={<FaBriefcase />}>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Experience</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience in School</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience other than School</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verified by Principal</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    {[...Array(4)].map((_, i) => (
                                        <td key={i} className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="text"
                                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md px-2 py-1"
                                            />
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </Section>

                    <Section title="Result Analysis" icon={<FaChartBar />}>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" colSpan="2">Half Yearly</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" colSpan="2">Final Exam</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" rowSpan="2">Verified by Principal</th>
                                </tr>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject Taught</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject Taught</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    {[...Array(5)].map((_, i) => (
                                        <td key={i} className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="text"
                                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md px-2 py-1"
                                            />
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </Section>

                    <Section title="Principal Evaluation" icon={<FaClipboardList />}>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poor</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Good</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Excellent</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {["Personal Behaviour", "Punctuality", "Discipline", "Knowledge of subject dealing with", "Promptness in Disposal of Assignment", "Attitude towards Others", "Loyalty"].map((label, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{label}</td>
                                        {[...Array(3)].map((_, i) => (
                                            <td key={i} className="px-6 py-4 whitespace-nowrap">
                                                <input
                                                    type="text"
                                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md px-2 py-1"
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Section>

                    <Section title="About Yourself" icon={<FaUser />}>
                        <textarea
                            rows="4"
                            className="w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Tell us about yourself..."
                        />
                    </Section>

                    <Section title="Outstanding Contributions" icon={<FaGraduationCap />}>
                        <textarea
                            rows="4"
                            className="w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Describe your contributions..."
                        />
                    </Section>

                    <div className="mt-8 flex justify-between items-center mobile:max-tablet:flex-col">
                        <div className="flex items-center space-x-4 mobile:max-tablet:flex-col">
                            <label className="block text-sm font-medium text-gray-700">Present Salary</label>
                            <input
                                type="text"
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-40 sm:text-sm border border-gray-300 rounded-md px-2 py-1"
                            />
                        </div>
                        <div className="flex items-center space-x-4 mobile:max-tablet:flex-col">
                            <label className="block text-sm font-medium text-gray-700">Expected Salary</label>
                            <input
                                type="text"
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-40 sm:text-sm border border-gray-300 rounded-md px-2 py-1"
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end ">
                        <button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300">
                            Submit Application
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Section({ title, icon, children }) {
    return (

        <div className=" overflow-auto">
            <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center mobile:max-tablet:text-sm  whitespace-nowrap">
                    <span className="mr-2 text-purple-600">{icon}</span>
                    {title}
                </h2>
                {children}
            </div>
        </div>



    )
}

export default Apply;