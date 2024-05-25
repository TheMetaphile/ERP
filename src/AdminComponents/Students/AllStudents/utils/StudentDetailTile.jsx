import { Link } from "react-router-dom";

export default function StudentDetailTile({ userData }) {
    return (

        <div className=" w-full ">
            {userData.map((user, index) => (
                <Link to={{
                    pathname: `/Admin-Dashboard/Students/${user.email}`,
                }} key={index}>
                    <div key={index} className=" flex  mobile:max-tablet:flex-col mobile:max-tablet:gap-2 items-center justify-between border rounded-lg py-2 pl-2 mb-2">

                        <div className="w-40 flex">
                            <img src={user.profileLogo || userimg} alt="" className="h-8 w-8  rounded-full" />
                            <h1 className="text-base font-medium ml-4">{user.rollNumber}</h1>
                        </div>
                        
                        <h1 className="text-base font-medium w-40 ">{user.name}</h1>
                        <h1 className="text-base font-medium w-40 ">{user.currentClass}</h1>
                        <h1 className="text-base font-medium w-40">{user.section}</h1>
                        <h1 className="text-base font-medium w-40">{user.fatherPhoneNumber}</h1>
                        <h1 className="text-base font-medium w-40">{user.email}</h1>

                    </div>
                </Link>
            ))}
        </div>



    );
}

