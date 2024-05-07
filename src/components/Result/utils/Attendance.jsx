

export default function Attendance(props) {
    return (
        <div className="w-full shadow-lg rounded-lg p-4 mt-4 ">
            <div className="border-t-2 border-text_blue my-3 tablet:mx-2 rounded-full "></div>
            <h1 className='tablet:text-3xl mobile:max-tablet:text-xl font-medium text-text_blue text-center'>Attendance</h1>
            <div className="border-t-2 border-text_blue my-3 tablet:mx-2 rounded-full "></div>
            <div className='flex w-full justify-between tablet:mx-2 mobile:max-tablet:flex-col'>
                <div className="w-full mx-2">
                    <h1 className="text-xl font-medium mb-3">
                        Term I
                    </h1>
                    <div className=" rounded-lg shadow-md bg-secondary text-center py-2">
                        <h1 className="text-xl font-medium">
                            {props.term[0].attendance}/{props.term[0].total} Days
                        </h1>
                        <h1 className="text-lg text-gray-500">
                            Total attendance of the student
                        </h1>
                    </div>
                </div>
                <div className="w-full mx-2">
                    <h1 className="text-xl font-medium tablet:mb-3 mobile:max-tablet:mt-3">
                        Term II
                    </h1>
                    <div className=" rounded-lg shadow-md bg-secondary text-center py-2">
                        <h1 className="text-xl font-medium">
                            {props.term[1].attendance}/{props.term[1].total} Days
                        </h1>
                        <h1 className="text-lg text-gray-500">
                            Total attendance of the student
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}