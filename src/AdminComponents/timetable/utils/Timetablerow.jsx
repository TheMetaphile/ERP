
export default function TimetableRow({index, lectureNo,Time, Subject, Teacher }) {

    return (
        <div className="bg-white flex w-full justify-between px-4 py-2 " key={index}>
            <h1 className="w-36">
                {lectureNo}
            </h1>
            <h1 className="w-36">
                {Time}
            </h1>
            <h1 className="w-36">
                {Subject}
            </h1>
            <h1 className="w-36">
                {Teacher}
            </h1>
        </div>
    )
}