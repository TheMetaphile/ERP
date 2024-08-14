
export default function TimetableHeader() {

    return (
        <div className="bg-secondary  flex w-full rounded-t-lg">
            <h1 className="w-96 px-4 py-2 text-center border-r border-gray-400">
                Lecture
            </h1>
            <h1 className="w-full px-4 py-2 text-center border-r border-gray-400">
                Subject
            </h1>
            <h1 className="w-full px-4 py-2 text-center border-r border-gray-400">
                Teacher
            </h1>
            <h1 className="w-full px-4 py-2 text-center border-r border-gray-400">
                Timing
            </h1>
        </div>
    )
}