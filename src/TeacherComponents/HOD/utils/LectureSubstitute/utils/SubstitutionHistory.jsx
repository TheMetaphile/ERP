import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../../../../Context/AuthContext";
import { BASE_URL_Login } from "../../../../../Config";
import { toast } from "react-toastify";

export default function ClassTeacherSubstitutionHistory() {
    const { authState } = useContext(AuthContext);
    const [PrevioursSubstitutions, SetPrevioursSubstitutions] = useState([]);
    const [start, setStart] = useState(0);
    const end = 4;
    const [allDataFetched, setAllDataFetched] = useState(false);

    const date = new Date();
    var month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const formattedDate = `${date.getFullYear()}-${month}-${date.getDate()}`;
    const session = getCurrentSession();
    const fetchTeacherOnLeaveList = async () => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BASE_URL_Login}/LectureSubstitute/fetch/completeHistory?date=${formattedDate}&start=${start}&end=${end}&session=${session}`,
            headers: {
                'Authorization': `Bearer ${authState.accessToken}`
            }
        };

        await axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data, "......................................"));

                const data = response.data.history.length;
                if (data < end) {
                    toast.success('All data fetched');
                    console.log('All data fetched')
                    setAllDataFetched(true);
                }
                SetPrevioursSubstitutions(prevData => [...prevData, ...response.data.history]);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    useEffect(() => {
        fetchTeacherOnLeaveList();
    }, [authState])

    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

    useEffect(() => {
        if (start !== 0) {
            fetchTeacherOnLeaveList();
        }
    }, [start]);

    return (
        <div className=" rounded-lg overflow-auto pt-3">
            <table className="min-w-fit bg-white border border-gray-300 rounded-lg">
                <thead>
                    <tr className="bg-gradient-to-r from-indigo-400  to-indigo-200 text-lg ">
                        <th className="py-2 px-6 text-center">Lecture</th>
                        <th className="py-2 px-6 text-center">Date</th>
                        <th className="py-2 px-6 text-center">Class</th>
                        <th className="py-2 px-6 text-center rounded-t-r whitespace-nowrap">Employee Id</th>
                        <th className="py-2 px-6 w-64">Name</th>
                        <th className="py-2 px-6 text-center">Section</th>
                        <th className="py-2 px-6 text-center">Subject</th>
                        <th className="py-2 px-6 text-center w-72">Substitute</th>

                    </tr>
                </thead>
                <tbody className="text-gray-600 text-md font-normal min-h-10 max-h-screen overflow-x-auto overflow-y-auto">
                    {PrevioursSubstitutions.length === 0 ? (
                        <div className="w-full whitespace-nowrap">Teacher leave history not available</div>
                    ) : (
                        <>
                            {
                                PrevioursSubstitutions.map((teachers, index) =>
                                (
                                    <tr key={index} className="border-b border-gray-200  last:border-none">
                                        <td className="py-3 px-6 text-center whitespace-nowrap">{teachers.Lecture}</td>
                                        <td className="py-3 px-6 text-center whitespace-nowrap">{teachers.date}</td>
                                        <td className="py-3 px-6 text-center whitespace-nowrap">{teachers.class}</td>
                                        <td className="py-3 px-6 text-center whitespace-nowrap">{teachers.classTeacherDetails.employeeId}</td>
                                        <td className="flex py-3 px-6 justify-start   items-center gap-2 whitespace-nowrap w-64"><img src={teachers.classTeacherDetails.profileLink} alt="img" className="rounded-full h-12 w-12" />{teachers.classTeacherDetails.name}</td>
                                        <td className="py-3 px-6 text-center whitespace-nowrap">{teachers.section}</td>
                                        <td className="py-3 px-6 text-center whitespace-nowrap">{teachers.subject}</td>

                                        <div className="flex justify-start gap-2 items-center w-72">
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

                            {!allDataFetched && (
                                <h1 className='text-blue-500 hover:text-blue-800 mt-3 cursor-pointer text-center' onClick={handleViewMore}>View More</h1>
                            )}
                        </>
                    )}

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