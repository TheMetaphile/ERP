import { useContext, useEffect, useState } from "react";
import ClassTeacherOnLeaveRow from "./ClassTeachersOnLeaveRow";
import axios from "axios";
import AuthContext from "../../../../../Context/AuthContext";
import { BASE_URL_Login } from "../../../../../Config";

export default function ClassTeacherSubstitutionHistory() {
    const { authState } = useContext(AuthContext);
    const [PrevioursSubstitutions, SetPrevioursSubstitutions] = useState([]);
    const [start, SetStart] = useState(10);

    const date = new Date();
    var month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const formattedDate = `${date.getFullYear()}-${month}-${date.getDate()}`;
    const session = getCurrentSession();
    const fetchTeacherOnLeaveList = async () => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BASE_URL_Login}/classTeacherSubstitute/fetch/completeHistory?date=${formattedDate}&start=${start}&end=10&session=${session}`,
            headers: {
                'Authorization': `Bearer ${authState.accessToken}`
            }
        };

        await axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data, "......................................"));
                SetPrevioursSubstitutions(response.data.history)
            })
            .catch((error) => {
                console.log(error);
            });

    }

    useEffect(() => {
        fetchTeacherOnLeaveList();
    }, [authState])

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

                    </tr>
                </thead>
                <tbody className="text-gray-600 text-md font-normal ">
                    {
                        PrevioursSubstitutions.map((teachers, index) =>
                        (
                            <tr key={index} className="border-b border-gray-200  last:border-none">
                                <td className="py-3 px-6 text-center whitespace-nowrap">{teachers.classTeacherDetails.employeeId}</td>
                                <td className="flex py-3 px-6 justify-start   items-center gap-2 whitespace-nowrap"><img src={teachers.classTeacherDetails.profileLink} alt="img" className="rounded-full h-12 w-12" />{teachers.classTeacherDetails.name}</td>
                                <td className="py-3 px-6 text-center whitespace-nowrap">{teachers.date}</td>
                                <td className="py-3 px-6 text-center whitespace-nowrap">{teachers.class}</td>
                                <td className="py-3 px-6 text-center whitespace-nowrap">{teachers.section}</td>
                                <div className="flex justify-start gap-2 items-center">
                                    <img src={teachers.substituteTeacherDetails.profileLink} alt="img" className="rounded-full h-12 w-12" />
                                    <div className="text-start">
                                        <p> {teachers.substituteTeacherDetails.name}</p>
                                        {teachers.substituteTeacherDetails.employeeId}

                                    </div>
                                </div>

                            </tr>
                        )
                        )
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