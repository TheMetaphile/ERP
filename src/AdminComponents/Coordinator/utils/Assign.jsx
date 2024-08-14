import React, { useContext, useEffect, useRef, useState } from 'react';

import Row from './Row';
import AuthContext from '../../../Context/AuthContext';
import axios from 'axios';
import { BASE_URL_Login } from '../../../Config';
import { toast } from 'react-toastify';

function Assign() {
    const { authState } = useContext(AuthContext);


    const [content, setContent] = useState([
        { id: 1, classRange: 'Pre-Nursery-U.K.G', name: '', profileLink: '', employeeId: '', },
        { id: 2, classRange: '1st-2nd', name: '', profileLink: '', employeeId: '', },
        { id: 3, classRange: '3rd-5th', name: '', profileLink: '', employeeId: '', },
        { id: 4, classRange: '6th-8th', name: '', profileLink: '', employeeId: '', },
        { id: 5, classRange: '9th-12th', name: '', profileLink: '', employeeId: '', },
    ]);

    const fetchCoordinator = async () => {
        try {
            const response = await axios.get(`${BASE_URL_Login}/co_ordinator/fetch`, {
                headers: {
                    'Authorization': `Bearer ${authState.accessToken}`
                }
            });

            if (response.status === 200) {
                const coordinators = response.data.coordinators;
                setContent(prevContent =>
                    prevContent.map(item => {
                        const coordinator = coordinators.find(c => c.co_ordinator_wing === item.classRange);
                        console.log(coordinator,"rerere", item.classRange );
                        return coordinator ? {
                            ...item,
                            name: coordinator.name,
                            profileLink: coordinator.profileLink,
                            employeeId: coordinator.employeeId
                        } : item;
                    })
                );
                console.log(coordinators, "ioasduh aekj k ");
                toast.success('Fetched Successfully');
            }
        } catch (error) {
            console.error('Failed to fetch coordinator', error);
            toast.error('Failed to fetch coordinator');
        }
    };

    useEffect(() => {
        fetchCoordinator();
    }, [authState.accessToken]);

    return (
        <div className="flex mobile:max-tablet:flex-col w-full px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 mb-3 no-scrollbar">
            <div className="border py-4 mobile:max-tablet:px-2 rounded-lg gap-5 shadow-md w-full flex flex-col px-3 overflow-y-auto items-start mt-2 mb-3 no-scrollbar">
                {content.map((con) => (
                    <Row con={con} />
                ))}
            </div>
        </div>

    );
}

export default Assign;
