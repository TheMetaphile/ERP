export default function Header({ headings }) {
    return (
        <thead className="bg-gradient-to-r from-indigo-500 to-blue-500">
        <tr>
            {headings.map((heading, index) => (
                <th key={index} className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    {heading}
                </th>
            ))}
        </tr>
    </thead>
    )
}
