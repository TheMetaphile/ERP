import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios'
import ProfileIcon from './../../../../assets/profileIcon.png'
import NotificationIcon from './../../../../assets/notificationIcon.png'
import AuthContext from '../../../../Context/AuthContext'

export default function ProfileCard(props) {
  const { authState } = useContext(AuthContext);
  const [teacher,setTeacher]=useState('');

  useEffect(() => {
    if (authState.accessToken) {
      fetchTeacher();
    }
  },[authState.accessToken])

  const fetchTeacher = async () => {
    try {
        const response = await axios.post('https://class-teacher.onrender.com/classTeacher/fetch/single', {
          accessToken: authState.accessToken,
          class: authState.userDetails.currentClass,
          section: authState.userDetails.section
        });
        if(response.status===200){
          setTeacher(response.data.name)
          console.log(response.data.name);
        }   
    } catch (error) {
      console.error("Error searching for teachers:", error);
    }
  }

  return (
    <div className="flex w-full mb-1 shadow-md rounded-lg bg-white p-2 h-fit">
      <img src={authState.userDetails.profileLink || ProfileIcon} alt="ProfileIcon" className="w-20 h-20" />
      <div className='ml-3'>
        <h3 className="mb-1">Hi, {authState.userDetails.name}</h3>
        <h5 className="mb-1">Class {authState.userDetails.currentClass}-{authState.userDetails.section} | Roll No. {authState.userDetails.rollNumber}</h5>
        <p className='px-2 py-1 rounded-md bg-teal-100 w-fit shadow-md'>{authState.userDetails.session}</p>
        <h3 className="mb-1">Class Teacher : {teacher}</h3>
      </div>
      <div className='ml-auto relative text-center'>
        <img src={NotificationIcon} alt="Notifications" className="block w-16 h-16" />
        <span className='absolute bg-red-500 rounded-full text-white text-xs px-2 py-1 right-2 bottom-6'>{props.notification}</span>
      </div>
    </div>
  );
}
