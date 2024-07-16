import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';
import { BASE_URL_Login, BASE_URL_ClassTeacher } from '../../Config';
import Loading from "../../LoadingScreen/Loading";

const Certificates = () => {
    const [tcData, setTcData] = useState([]);
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [Class, setClass] = useState('');
    const [sectionsDetails, setSections] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(5);

    useEffect(() => {
        fetchUserTc();
        // fetchSections();
    }, []);

    const fetchUserTc = async () => {
        console.log('hit', authState.accessToken)
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL_Login}/terminate/terminatedStudents?Class=9th&session=2023-24&section=A&start=0&end=5`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            if (response.status === 200) {
                console.log("API response:", response.data.list);
                setTcData(response.data.list);
            }
            console.log('hit')


        } catch (err) {
            console.log(err);

        }
        finally {
            setLoading(false);
        }
    };

    console.log('aa')
    const data = [
        { sNo: 1, tcNo: 20, tcDate: '16/04/2024', admissionNo: 2484, name: 'Abhishek', class: "Xth 'A'" },
        { sNo: 2, tcNo: 21, tcDate: '16/04/2024', admissionNo: 4020, name: 'Shailesh', class: "Xth 'A'" },
        { sNo: 3, tcNo: 23, tcDate: '16/04/2024', admissionNo: 3519, name: 'Abhishek', class: "Xth 'A'" },
        { sNo: 4, tcNo: 16, tcDate: '16/04/2024', admissionNo: 3518, name: 'Abhishek', class: "Xth 'A'" },
        { sNo: 5, tcNo: 17, tcDate: '16/04/2024', admissionNo: 4066, name: 'Abhishek', class: "Xth 'A'" },
        { sNo: 6, tcNo: 18, tcDate: '16/04/2024', admissionNo: 4067, name: 'Abhishek', class: "Xth 'A'" },
        { sNo: 7, tcNo: 12, tcDate: '16/04/2024', admissionNo: 4190, name: 'Ashutosh', class: "Xth 'A'" },
        { sNo: 8, tcNo: 10, tcDate: '16/04/2024', admissionNo: 3940, name: 'Abhishek', class: "Xth 'A'" },
        { sNo: 9, tcNo: 14, tcDate: '16/04/2024', admissionNo: 3959, name: 'Abhishek', class: "Xth 'A'" },
        { sNo: 10, tcNo: 13, tcDate: '16/04/2024', admissionNo: 3880, name: 'Shubham', class: "Xth 'A'" },
        { sNo: 11, tcNo: 11, tcDate: '16/04/2024', admissionNo: 3879, name: 'Abhishek', class: "Xth 'A'" },
        { sNo: 12, tcNo: 6, tcDate: '16/04/2024', admissionNo: 4200, name: 'Abhishek', class: "Xth 'A'" }
    ];

    const handleClassChange = (event) => {
        setClass(event.target.value);
    };

    const fetchSections = async () => {
        try {
            if (sectionsDetails.length <= 0) {
                const response = await axios.post(`${BASE_URL_ClassTeacher}/classTeacher/fetch/sections`, {
                    accessToken: authState.accessToken,
                    class: Class,
                });
                const sectionsdetail = response.data.sections;
                console.log(Class);

                setSections(sectionsdetail);
            }
        } catch (error) {
            console.error("Error while fetching section:", error);
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className=" mx-auto p-4">
            <h1 className='text-3xl mobile:max-tablet:text-2xl pt-20'>Certificates</h1>
            <select id="class" value={Class} onChange={handleClassChange} className="rounded-lg shadow-md px-3 py-1 border-2 border-gray-200 text-lg mr-3 mobile:max-tablet:mr-0 flex-1">
                <option value="">Search by Class</option>
                <option value="Pre-Nursery">Pre-Nursery</option>
                <option value="Nursery">Nursery</option>
                <option value="L.K.J">L.K.J</option>
                <option value="U.K.J">U.K.J</option>
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
                <option value="3rd">3rd</option>
                <option value="4th">4th</option>
                <option value="5th">5th</option>
                <option value="6th">6th</option>
                <option value="7th">7th</option>
                <option value="8th">8th</option>
                <option value="9th">9th</option>
                <option value="10th">10th</option>
                <option value="11th">11th</option>
                <option value="12th">12th</option>
            </select>

            <div className="overflow-x-auto border-1 rounded-lg">
                <table className="table w-full border-2">
                    <thead className=" bg-purple-200">
                        <tr className="border border-gray-300 table-row whitespace-nowrap rounded-md ">
                            <th className=" font-normal mobile:max-laptop:text-base text-xl p-2">Roll No.</th>
                            {/* <th className=" font-normal mobile:max-laptop:text-base text-xl p-2">TC No</th>
                            <th className=" font-normal mobile:max-laptop:text-base text-xl p-2">TC Date</th> */}
                            <th className=" font-normal mobile:max-laptop:text-base text-xl p-2">Admission No</th>
                            <th className=" font-normal mobile:max-laptop:text-base text-xl p-2">Name</th>
                            <th className=" font-normal mobile:max-laptop:text-base text-xl p-2">Class</th>
                            <th className=" font-normal mobile:max-laptop:text-base text-xl p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody className=" table-row-group">
                        {tcData.map((item, index) => (
                            <tr key={index} className="border border-gray-300 text-center">
                                <td className=" p-2">{item.rollNumber}</td>
                                {/* <td className=" p-2">{item.tcNo}</td>
                                <td className=" p-2">{item.tcDate}</td> */}
                                <td className=" p-2">15</td>
                                <td className="flex items-center">
                                    <img src={item.profileLink} alt="" className="w-8 h-8 rounded-full"></img>
                                    <div className=" p-2">{item.name}</div>
                                </td>
                                <td className=" p-2 whitespace-nowrap">{item.currentClass}</td>
                                <td className=" p-2 whitespace-nowrap">
                                    <Link to={`/Sub-Admin/Certificates/character/${item._id}`} >
                                        <button className="bg-purple-100 text-purple-500 px-2 py-0.5 mr-2 rounded">CC</button>
                                    </Link>
                                    <Link to={`/Sub-Admin/Certificates/transfer/${item._id}`} >
                                        <button className="bg-purple-100 text-purple-500 px-2 py-0.5 mr-2 rounded">TC</button>
                                    </Link>

                                </td>
                            </tr>
                        ))}

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Certificates;
