import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../../Context/AuthContext";
import axios from "axios";
import Loading from "../../../LoadingScreen/Loading";
import StudentTile from './StudentTile';
import { BASE_URL_Login } from "../../../Config";

export default function Student() {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [birthdays, setBirthDays] = useState([]);

    function getFormattedDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        const fetchBirthday = async () => {
            console.log(getFormattedDate());
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL_Login}/birthday/student?date=${getFormattedDate()}`, {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
                    }
                });

                setBirthDays(response.data);
                console.log('fetch', response.data);
            } catch (error) {
                console.error("Error fetching student birthday:", error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchBirthday();
    }, [authState.accessToken])
    
    return (
        <div className=''>
            {loading ? (
                <Loading />
            ) :  (
                <StudentTile birthdays={birthdays} />
            )
            }
        </div>
    )
}

