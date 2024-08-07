export default function StudentDetailTile({ userData, Class }) {
    return (

        <div className=" w-full ">
            {userData.map((user, index) => (
                <div key={index} className=" flex  text-center mobile:max-tablet:gap-2 items-center justify-evenly border rounded-lg py-2 pl-2 mb-2 tablet:max-laptop:w-fit">
                    <div className="w-40 flex justify-center">
                        <img src={user.profileLink} alt="" className="h-8 w-8 rounded-full" />
                        <h1 className="text-base w-32">{user.name}</h1>
                    </div>
                    <h1 className="text-base  w-40 ">{Class}</h1>
                    <h1 className="text-base  w-40 ">{user.gender}</h1>
                    <h1 className="text-base  w-40">{user.fatherPhoneNumber}</h1>
                    <h1 className="text-base  w-52">{user.email}</h1>
                </div>
            ))}
        </div>
    );
}

