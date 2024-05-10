export default function SalaryDetails({ teachers }) {
    return (
        <div className="overflow-x-auto max-w-screen-lg mx-auto">
            <table className="min-w-full divide-y divide-gray-600">
                <thead className="">
                    <tr>
                        <th className="px-6 py-3 text-left text-xl font-normal border-r">Name</th>
                        <th className="px-6 py-3 text-left text-xl font-normal border-r-">ID</th>
                        <th className="px-6 py-3 text-left text-xl font-normal border-r">Paid Hours</th>
                        <th className="px-6 py-3 text-left text-xl font-normal border-r">Gross Pay</th>
                        <th className="px-6 py-3 text-left text-xl font-normal border-r">Deduction</th>
                        <th className="px-6 py-3 text-left text-xl font-normal border-r">Incentive</th>
                        <th className="px-6 py-3 text-left text-xl font-normal border-r">Net Pay</th>
                        <th className="px-6 py-3 text-left text-xl font-normal border-r">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {teachers.map((teacher, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-lg border-r">{teacher.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-lg border-r">{teacher.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-lg border-r">{teacher.paidHours}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-lg border-r">{teacher.grossPay}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-lg border-r">{teacher.deduction}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-lg border-r">{teacher.incentive}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-lg border-r">{teacher.netPay}</td>
                            <td className={`${teacher.status === 'Paid' ? 'text-green-500' : 'text-red-500'} px-6 py-4 whitespace-nowrap text-lg border-r`}>{teacher.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
