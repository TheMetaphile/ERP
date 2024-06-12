import { Link } from "react-router-dom";

export default function TeacherDetailTile({ userData }) {
    return (

        <div className=" w-full ">
            {userData.map((user, index) => (
                <Link to={{
                    pathname: `/Admin-Dashboard/Students/studentdetails`,
                    search: `?email=${user.email}&name=${user.name}&rollNumber=${user.rollNumber}&classs=${user.currentClass}`,

                }} key={index}>
                    <div key={index} className=" flex  mobile:max-tablet:flex-col mobile:max-tablet:gap-2 items-center justify-between border rounded-lg py-2 pl-2 w-full mb-2 ">
                    <div className="w-36 flex  items-center">
                            <img src={user.profileLogo || userimg} alt="" className="h-8 w-8  rounded-full" />
                            <h1 className="text-base font-medium ml-3">{user.email}</h1>

                        </div>
                        <h1 className="text-base font-medium w-36 ">{user.class}</h1>
                        <h1 className="text-base font-medium w-36 ">{user.section}</h1>
                        <h1 className="text-base font-medium w-36 ">{user.name}</h1>
                        <h1 className="text-base font-medium w-36 ">{user.employeeId}</h1>

                        
                    </div>
                </Link>
            ))}
        </div>



    );
}

