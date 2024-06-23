import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios'
import ProfileIcon from './../../../../assets/profileIcon.png'
import NotificationIcon from './../../../../assets/notificationIcon.png'
import AuthContext from '../../../../Context/AuthContext'
import { Badge } from '@mui/material';

export default function ProfileCard(props) {
  const { authState } = useContext(AuthContext);
  const [teacher, setTeacher] = useState('');

  useEffect(() => {
    if (authState.accessToken) {
      fetchTeacher();
    }
  }, [authState.accessToken])

  const fetchTeacher = async () => {
    try {
      const response = await axios.post('https://class-teacher.onrender.com/classTeacher/fetch/single', {
        accessToken: authState.accessToken,
        class: authState.userDetails.currentClass,
        section: authState.userDetails.section
      });
      if (response.status === 200) {
        setTeacher(response.data.name)
        console.log(response.data.name);
      }
    } catch (error) {
      console.error("Error searching for teachers:", error);
    }
  }

  return (
    <div className="flex w-full mb-1 shadow-md rounded-lg bg-white p-2 h-fit">
      <img src={authState.userDetails.profileLink || ProfileIcon} alt="ProfileIcon" className="w-24 h-24 rounded-full" />
      <div className='ml-3'>
        <h3 className="mb-1 font-medium">Hi, <span className="mb-1 font-normal">{authState.userDetails.name}</span></h3>
        <h5 className="mb-1 font-medium">Class: <span className="mb-1 font-normal"> {authState.userDetails.currentClass}-{authState.userDetails.section}</span> | Roll No. <span className="mb-1 font-normal">{authState.userDetails.rollNumber}</span></h5>
        <h3 className="mb-1 font-medium">Class Teacher : <span className="mb-1 font-normal">{teacher || "Not found"}</span></h3>
        <p className='px-2 py-1 rounded-md bg-teal-100 w-fit border border-gray-300 shadow-md '>{authState.userDetails.session}</p>
      </div>
      <div className='ml-auto relative text-center'>
        <Badge badgeContent={4}
          color='red'
          overlap="circular"
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "red",
              color: "white",
              fontSize: "1rem",
              paddingY: "0.8rem",
              paddingX: "0.4rem",

            }
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}>

          <img src={NotificationIcon} alt="Notifications" className="block w-16 font-medium" />
        </Badge>

      </div>
    </div>
  );
}
