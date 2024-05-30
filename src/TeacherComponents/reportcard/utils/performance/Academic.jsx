import AcademicBottonTile from "./AcademicBottomTile";
import AcademicMiddleTile from "./AcademicMiddleTile";
import AcademicTopTile from "./AcademicTopTile";
import { MdEdit } from "react-icons/md";


export default function Academic(props) {
    return (
        <div className="w-full shadow-lg rounded-lg tablet:p-4 mobile:max-tablet:px-2 mt-4 ">
            <div className="border-t-2 border-text_blue my-3 tablet:mx-2 rounded-full "></div>
            <div className='w-full flex items-center justify-between px-3'>
                <h1 className='tablet:text-3xl mobile:max-tablet:text-xl font-medium text-text_blue text-center'>Academic Performance</h1>
                <h1 className='flex items-center text-sm bg-secondary p-2 rounded-lg shadow-md self-end'>Edit <MdEdit className='ml-1' /></h1>
            </div>

            <div className="border-t-2 border-text_blue my-3 tablet:mx-2 rounded-full "></div>
            <div className='flex flex-col w-full justify-between tablet:mx-2'>

                <div className="w-full tablet:mx-2">
                    <h1 className="text-xl font-medium mb-3">
                        Term I
                    </h1>
                    <div className="rounded-lg shadow-md tablet:mr-5 border-2 border-gray-400">
                        <AcademicTopTile heading={["Subjects", 'Obtained Marks', "Total Marks"]} />
                        <AcademicMiddleTile value={["English", '74-B', "100"]} />
                        <AcademicMiddleTile value={["Hindi", '87-B', "100"]} />
                        <AcademicMiddleTile value={["Science", '74-B', "100"]} />
                        <AcademicMiddleTile value={["Maths", '78-B', "100"]} />
                        <AcademicMiddleTile value={["Social Study", '87-B', "100"]} />
                        <AcademicMiddleTile value={["Drawing", '74-B', "100"]} />
                        <AcademicMiddleTile value={["Computer", '96-A', "100"]} />
                        <AcademicBottonTile value={["", 'GPA', "8.2"]} />
                    </div>
                </div>

            </div>
        </div>
    )
}