import schoolImage from "../../assets/School.png";
import logout1 from "../../assets/logout.png";
import ExpansionTile from "../utils/ExpansionTile.jsx";
import menuItems from "./helper.js";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../../Context/AuthContext.jsx";

export default function SubadminDrawer({ isOpen }) {
    const { logout, authState } = useContext(AuthContext);
    const navigate = useNavigate();
    const [active, setActive] = useState(null)


    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const handleClick = (index) => {
        setActive(index)
    }
    return (
        <div className={` ${isOpen ? 'h-screen  py-6 px-2' : ''} w-full overflow-y-auto rounded-sm text-center items-center border bg-white shadow-md no-scrollbar`}>
            <div className="flex items-center justify-center">
                <span className="text-black font-semibold text-2xl">Accounts</span>
            </div>
            {/* <div className="mt-5 bg-teal-300 px-2 py-4 rounded-2xl shadow-lg"> */}
            {/* <h2 className="text-xl font-semibold">Accounts</h2> */}
            <div className="mt-4">
                {menuItems.map((menuItem, index) => {
                    if ((menuItem.title === 'Salary History' || menuItem.title === 'Register Teacher' || menuItem.title === 'Register Student' ||
                        menuItem.title === 'Student Fees') && authState.userDetails.role === 'Accountant' && authState.userDetails.department === 'Finance'
                    ) {
                        return (
                            <div
                                key={index}
                                onClick={() => handleClick(index)}
                                className={`cursor-pointer rounded-lg ${active === index ? 'bg-purple-200' : ''}`}
                            >
                                <ExpansionTile
    
                                    image={menuItem.image}
                                    alternateText={menuItem.alt}
                                    title={menuItem.title}
                                    childrens={menuItem.children}
                                    route={menuItem.route}
                                />
                            </div>
                        )
                    }
                    return null

                })}
            </div>
            {/* </div> */}
            <div className="flex h-fit justify-center my-2">
                <button
                    onClick={handleLogout}
                    className="bg-purple-200 border border-transparent rounded-xl px-4 py-2 flex items-center shadow-md"
                >
                    <img src={logout1} alt="logout" className="w-6 mr-2" />
                    <span className="text-black">Log out</span>
                </button>
            </div>
        </div>
    );
}
