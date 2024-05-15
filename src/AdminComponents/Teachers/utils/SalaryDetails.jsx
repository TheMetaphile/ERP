export default function SalaryDetails({ teachers }) {
    return (
        <div className="rounded-xl shadow-lg mb-4">
        <div className="overflow-x-auto w-full mt-4 rounded-lg">
            <table className="min-w-full divide-y divide-gray-600">
                <thead className="">
                    <tr>
                        <th className="px-6 py-3 text-left text-xl font-normal border-r bg-secondary">Name</th>
                        <th className="px-6 py-3 text-left text-xl font-normal border-r bg-secondary">ID</th>
                        <th className="px-6 py-3 text-left text-xl font-normal border-r bg-secondary">Paid Hours</th>
                        <th className="px-6 py-3 text-left text-xl font-normal border-r bg-secondary">Gross Pay</th>
                        <th className="px-6 py-3 text-left text-xl font-normal border-r bg-secondary">Deduction</th>
                        <th className="px-6 py-3 text-left text-xl font-normal border-r bg-secondary">Incentive</th>
                        <th className="px-6 py-3 text-left text-xl font-normal border-r bg-secondary">Net Pay</th>
                        <th className="px-6 py-3 text-left text-xl font-normal border-r bg-secondary">Status</th>
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
        </div>
    );
}
