import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ProgressCard from "../assignment_report/utils/progressCard"
import SubjectClassWorkTile from "./utils/SubjectClassworkTile"
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import Loading from "../../LoadingScreen/Loading";
import { BASE_URL_ClassWork } from "../../Config";

export default function SubjectClassWork(){
    const { name } = useParams();
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        const fetchClassWork = async () => {
            console.log(authState.userDetails.currentClass, new Date().getMonth() + 1, authState.userDetails.academicYear, authState.userDetails.section, name)
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL_ClassWork}/classwork/fetch/student?class=${authState.userDetails.currentClass}&month=${new Date().getMonth() + 1}&year=${authState.userDetails.academicYear}&section=${authState.userDetails.section}&subject=${name}`, {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
                    }
                });

                setDetails(response.data.classwork);
                console.log('fetch', response.data)
            } catch (error) {
                console.error("Error fetching student classwork:", error);
            }
            finally {
                setLoading(false)
            }
        };

        fetchClassWork();
    }, [authState.accessToken]);

    return (
        <div className=" flex flex-col px-3 h-screen overflow-y-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar">
            <h1 className="text-xl font-medium">{name} ClassWork</h1>
            <div className=" flex flex-col tablet:flex-row items-center gap-3 w-full py-2">
                <ProgressCard
                title={`Syllabus Completed in ${name} I`}
                percent='40'
                centerText='40%'
                trailColor='#c8ebc9'
                strokeColor='#4caf50'
            />
            <ProgressCard
                title={`Syllabus Completed in ${name} II`}
                percent='60'
                centerText='60%'
                trailColor='#90CAF9'
                strokeColor='#2196F3'
            />
            <ProgressCard
                title={`Syllabus Completed in ${name} III`}
                percent='70'
                centerText='70%'
                trailColor='#eac9fe'
                strokeColor='#9100ec'
            />

            </div>
            <h1 className="text-xl font-medium mt-4 ">List of ClassWork</h1>
            {loading ? (
                <Loading />
            ) : details.length === 0 ? (
                <div className="text-center w-full mt-2">No classwork found</div>
            ) : (
                <SubjectClassWorkTile subject={name} details={details} />

            )}
        </div>
        
    )
}