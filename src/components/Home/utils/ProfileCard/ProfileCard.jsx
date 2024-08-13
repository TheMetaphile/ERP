import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import ProfileIcon from './../../../../assets/profileIcon.png';
import NotificationIcon from './../../../../assets/notificationIcon.png';
import AuthContext from '../../../../Context/AuthContext';
import { Badge } from '@mui/material';
import { BASE_URL_ClassTeacher } from "../../../../Config";

export default function ProfileCard() {
  const { authState } = useContext(AuthContext);
  const [teacher, setTeacher] = useState('');

  useEffect(() => {
    if (authState.accessToken) {
      fetchTeacher();
    }
  }, [authState.accessToken]);

  const fetchTeacher = async () => {
    try {
      const response = await axios.post(`${BASE_URL_ClassTeacher}/classTeacher/fetch/single`, {
        accessToken: authState.accessToken,
        class: authState.userDetails.currentClass,
        section: authState.userDetails.section
      });
      if (response.status === 200) {
        setTeacher(response.data.name);
      }
    } catch (error) {
      console.error("Error searching for teachers:", error);
    }
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-teal-50 w-full rounded-xl shadow-lg p-6 border border-gray-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 mobile:max-tablet:flex-col mobile:max-tablet:text-center">
          <img 
            src={authState.userDetails.profileLink || ProfileIcon} 
            alt="Profile" 
            className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              Hi, {authState.userDetails.name}
            </h2>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Class: {authState.userDetails.currentClass}-{authState.userDetails.section} | Roll No. {authState.userDetails.rollNumber}</p>
              <p>Class Teacher: {teacher || "Not found"}</p>
              <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full font-medium">
                {authState.userDetails.session}
              </span>
            </div>
          </div>
        </div>
        <div className="relative">
          <Badge 
            badgeContent={4}
            color="error"
            overlap="circular"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200">
              <img src={NotificationIcon} alt="Notifications" className="w-8 h-8" />
            </button>
          </Badge>
        </div>
      </div>
    </div>
  );
}