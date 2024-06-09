import { Link } from "react-router-dom";

export default function TeacherDetailTile({ userData }) {
    return (

        <div className=" w-full ">
            {userData.map((user, index) => (
                <Link to={{
                    pathname: `/Admin-Dashboard/Students/studentdetails`,
                    search: `?email=${user.email}&name=${user.name}&rollNumber=${user.rollNumber}&classs=${user.currentClass}`,

                }} key={index}>
                    <div key={index} className=" flex  mobile:max-tablet:flex-col mobile:max-tablet:gap-2 items-center justify-between border rounded-lg py-2 px-2 mb-2 ">
                        <h1 className="text-base font-medium w-40 ">{user.class}</h1>
                        <h1 className="text-base font-medium w-40 ">{user.section}</h1>
                        <h1 className="text-base font-medium w-40 ">{user.name}</h1>
                        <h1 className="text-base font-medium w-40 ">{user.employeeId}</h1>

                        <div className="w-40 flex ">
                            <img src={user.profileLogo || userimg} alt="" className="h-8 w-8  rounded-full" />
                            <h1 className="text-base font-medium ">{user.email}</h1>

                        </div>
                    </div>
                </Link>
            ))}
        </div>



    );
}

