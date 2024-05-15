import React from "react";

export default function BookList({ books }) {
    return (
        <div className="rounded-xl shadow-lg mb-4">
        <div className="overflow-x-auto w-full mt-8">
            <table className="min-w-full divide-y divide-gray-600">
                <thead className="">
                    <tr>
                        <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">ID</th>
                        <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Name</th>
                        <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Subject</th>
                        <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Writer</th>
                        <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Class</th>
                        <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Published</th>
                        <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Uplaod Date</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {books.map((book, index) => (
                        <tr key={index}>
                            <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">{book.id}</td>
                            <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">{book.name}</td>
                            <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">{book.subject}</td>
                            <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">{book.writer}</td>
                            <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">{book.class}</td>
                            <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">{book.published}</td>
                            <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">{book.upload}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>

    )
}