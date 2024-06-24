
export default function TimetableHeader() {

    return (
        <div className="bg-secondary text-center flex w-full justify-between px-4 py-2 border rounded-t-lg text-xl">
            <h1 className="w-40">
                Lecture
            </h1>
            <h1 className="w-40">
                Timing
            </h1>
            <h1 className="w-40">
                Subject
            </h1>
            <h1 className="w-48">
                Teacher
            </h1>
            <h1 className="w-48">
                Remark
            </h1>
        </div>
    )
}