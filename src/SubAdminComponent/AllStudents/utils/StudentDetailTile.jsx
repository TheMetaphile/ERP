import { Link } from "react-router-dom";

export default function StudentDetailTile({ userData }) {
    return (

        <div className=" w-full ">
            {userData.map((user, index) => (
                <Link to={{
                    pathname: `/Admin-Dashboard/Students/studentdetails`,
                    search: `?email=${user.email}&name=${user.name}&rollNumber=${user.rollNumber}&classs=${user.currentClass}`,

                }} key={index}>
                    <div key={index} className=" flex  text-center mobile:max-tablet:gap-2 items-center justify-evenly border rounded-lg py-2 pl-2 mb-2 tablet:max-laptop:w-fit">
                        <h1 className="w-32 text-xl  mr-4">{user.rollNumber}</h1>
                        <div className="w-40 flex justify-center">

                            <img src={user.profileLogo || userimg} alt="" className="h-8 w-8 rounded-full" />
                            <h1 className="text-base w-32">{user.name}</h1>

                        </div>


                        <h1 className="text-base  w-40 ">{user.currentClass}</h1>
                        <h1 className="text-base  w-40">{user.section}</h1>
                        <h1 className="text-base  w-40">{user.fatherPhoneNumber}</h1>
                        <h1 className="text-base  w-52">{user.email}</h1>

                    </div>
                </Link>
            ))}
        </div>



    );
}

