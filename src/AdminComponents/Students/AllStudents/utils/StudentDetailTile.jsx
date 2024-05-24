import { Link } from "react-router-dom";

export default function StudentDetailTile({ userData }) {
    return (

        <div className=" w-fit ">
            {userData.map((user, index) => (
                <Link to={{
                    pathname: `/Admin-Dashboard/Students/${user.email}`,
                }} key={index}>
                    <div key={index} className=" flex  mobile:max-tablet:flex-col mobile:max-tablet:gap-2 items-center justify-between border rounded-lg py-2 pl-2 mb-2">

                        <div className="w-40 flex">
                            <img src={user.profileLogo || userimg} alt="" className="h-8 w-8  rounded-full" />
                            <h1 className="text-base font-medium ml-4">{user.id || '101'}</h1>
                        </div>
                        


                        <h1 className="text-base font-medium w-40 ">{user.name}</h1>
                        <h1 className="text-base font-medium w-40 ">{user.currentClass}</h1>
                        <h1 className="text-base font-medium w-40">{user.section}</h1>
                        <h1 className="text-base font-medium w-40">{user.gender}</h1>
                        <h1 className="text-base font-medium w-40">{user.fatherName}</h1>
                        <h1 className="text-base font-medium w-40">{user.fatherPhoneNumber}</h1>
                        <h1 className="text-base font-medium w-40">{user.permanentAddress}</h1>
                        <h1 className="text-base font-medium w-40">{user.DOB}</h1>
                        <h1 className="text-base font-medium w-40">{user.email}</h1>

                    </div>
                </Link>
            ))}
        </div>



    );
}


{/* {userData.map((student, index) => (
                <Link
                    key={index}
                    to={`/student/${student.id}`} 
                    className="flex w-fit justify-between py-2 pl-2 rounded-md shadow-sm h-fit rounded-t-lg border-b-2 border-gray-300 bg-red-400"
                >
                    {Object.values(student).map((value, idx) => (
                        <h1 key={idx} className="w-40">
                            {value}
                        </h1>
                    ))}
                </Link>
            ))} */}