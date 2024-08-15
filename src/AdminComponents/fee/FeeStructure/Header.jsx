export default function Header({ headings }) {
    return (
        <thead className="bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-t-lg">
            <tr>
                {headings.map((heading, index) => (
                    <th key={index} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        {heading}
                    </th>
                ))}
            </tr>
        </thead>
    );
}