export default function TimetableHeader() {
    return (
        <thead className="bg-secondary border-t border-gray-400 rounded-t-lg text-xl w-full">
            <tr>
                <th className="mobile:max-tablet:w-40 px-4 py-2 text-center border-r border-gray-400">
                    Lecture
                </th>
                <th className="mobile:max-tablet:w-40 px-4 py-2 text-center border-r border-gray-400">
                    Timing
                </th>
                <th className="mobile:max-tablet:w-40 px-4 py-2 text-center border-r border-gray-400">
                    Subject
                </th>
                <th className="mobile:max-tablet:w-40 px-4 py-2 text-center border-r border-gray-400">
                    Optional
                </th>
                <th className="mobile:max-tablet:w-40 px-4 py-2 text-center border-r border-gray-400">
                    Teacher
                </th>
                <th className="mobile:max-tablet:w-40 px-4 py-2 text-center border-r border-gray-400">
                    Remark
                </th>
            </tr>
        </thead>
    );
}
