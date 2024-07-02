
export default function TimetableHeader() {

    return (


        <div className="bg-secondary  flex w-full  border-t border-gray-400 rounded-t-lg text-xl mobile:max-tablet:w-fit">
            <h1 className="w-full mobile:max-tablet:w-40 px-4 py-2 text-center border-r border-gray-400">
                Lecture
            </h1>
            <h1 className="w-full mobile:max-tablet:w-40 px-4 py-2 text-center border-r border-gray-400">
                Timing
            </h1>
            <h1 className="w-full mobile:max-tablet:w-40 px-4 py-2 text-center border-r border-gray-400">
                Subject
            </h1>
            <h1 className="w-full mobile:max-tablet:w-40 px-4 py-2 text-center border-r border-gray-400">
                Teacher
            </h1>
            <h1 className="w-full mobile:max-tablet:w-40 px-4 py-2 text-center border-r border-gray-400">
                Remark
            </h1>
        </div>


    )
}