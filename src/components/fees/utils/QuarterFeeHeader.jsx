export default function QuarterFeeHeader() {
    return (
        <thead className="bg-gradient-to-r from-blue-500 to-teal-400 text-white">
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Quarter</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Discount</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Pending Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
            </tr>
        </thead>
    );
}
