export default function Header({ headings }) {
    return (
        <thead className="bg-gray-200">
            <tr>
                {headings.map((heading, index) => (
                    <th key={index} className="px-4 py-2 border-b text-left">{heading}</th>
                ))}
            </tr>
        </thead>
    )
}