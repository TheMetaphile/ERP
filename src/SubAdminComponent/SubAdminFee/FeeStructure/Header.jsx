export default function Header({ headings }) {
    return (
        <thead className="bg-bg_blue ">
            <tr>
                {headings.map((heading, index) => (
                    <th key={index} className="px-4 py-2 text-left">{heading}</th>
                ))}
            </tr>
        </thead>
    )
}