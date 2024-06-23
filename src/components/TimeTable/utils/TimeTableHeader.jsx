
export default function TimetableHeader() {

    return (
        <div className="bg-secondary flex w-full justify-between border border-gray-300 px-4 py-2 rounded-t-lg">
            <h1 className="w-36 text-center">
                Lecture
            </h1>
           
            <h1 className="w-36 text-center">
                Subject
            </h1>
            <h1 className="w-36 text-center">
                Teacher
            </h1>
            <h1 className="w-36 text-center">
                Timing
            </h1>
        </div>
    )
}