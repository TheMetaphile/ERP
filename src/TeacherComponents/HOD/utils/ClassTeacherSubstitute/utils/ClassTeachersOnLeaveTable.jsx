import { useContext, useEffect, useState } from "react";
import ClassTeacherOnLeaveRow from "./ClassTeachersOnLeaveRow";
import axios from "axios";
import AuthContext from "../../../../../Context/AuthContext";
import { BASE_URL_Login } from "../../../../../Config";

export default function ClassTeacherOnLeaveTable() {
    const {authState} = useContext(AuthContext);
    const [TeachersOnLeave, SetTeachersOnLeave] = useState([]);
    const date = new Date();
    var month = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1; 
    const formattedDate = `${date.getFullYear()}-${month}-${date.getDate()}`;
    const session = getCurrentSession();
    const fetchTeacherOnLeaveList = async () => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BASE_URL_Login}/classTeacherSubstitute/fetch/checkLeave?date=${formattedDate}&session=${session}`,
            headers: {
                'Authorization': `Bearer ${authState.accessToken}`
            }
        };

        await axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data.ClassTeachers));
                SetTeachersOnLeave(response.data.ClassTeachers)
            })
            .catch((error) => {
                console.log(error);
            });

    }

    useEffect(()=>{
        fetchTeacherOnLeaveList();
    },[authState])

    return (
        <div className="w-full overflow-x-auto rounded-lg">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead>
                    <tr className="bg-secondary text-gray-600 text-lg ">

                        <th className="py-2 px-6 text-center rounded-t-r whitespace-nowrap">Employee Id</th>
                        <th className="py-2 px-6 ">Name</th>
                        <th className="py-2 px-6 text-center">Date</th>
                        <th className="py-2 px-6 text-center">Class</th>
                        <th className="py-2 px-6 text-center">Section</th>
                        <th className="py-2 px-6 text-center">Substitute</th>
                        <th className="py-2 px-6 text-center">Actions</th>

                    </tr>
                </thead>
                <tbody className="text-gray-600 text-md font-normal ">
                    {
                        TeachersOnLeave.map((teachers,index)=>{
                            return <ClassTeacherOnLeaveRow Teacher={teachers} index={index} date={formattedDate} session={session}/>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

function getCurrentSession() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    if (currentMonth >= 3) {
      return `${currentYear}-${(currentYear + 1).toString().slice(-2)}`;
    } else {
      return `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
    }
  }