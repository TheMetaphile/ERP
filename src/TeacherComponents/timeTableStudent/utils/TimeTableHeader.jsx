
export default function TimetableHeader() {

    return (
        <div className="bg-secondary flex mobile:max-tablet:w-fit w-full rounded-t-lg">
            <h1 className="w-32 px-4 py-2 text-center border-r border-gray-400">
                Lecture
            </h1>
            <h1 className="w-60 px-4 py-2 text-center border-r border-gray-400">
                Subject
            </h1>
            <h1 className="w-60 px-4 py-2 text-center border-r border-gray-400">
                Teacher
            </h1>
            <h1 className="w-60 px-4 py-2 text-center border-r border-gray-400">
                Timing
            </h1>
        </div>
    )
}