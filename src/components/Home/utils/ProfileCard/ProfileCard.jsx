import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import ProfileIcon from './../../../../assets/profileIcon.png';
import NotificationIcon from './../../../../assets/notificationIcon.png';
import AuthContext from '../../../../Context/AuthContext';
import { Badge } from '@mui/material';
import { BASE_URL } from "../../../../Config";
import { refreshAccessToken } from '../../../../RefreshTokenHelper';
import { toast } from 'react-toastify';

export default function ProfileCard({ darkMode }) {
  const { authState, updateAccessToken, logout } = useContext(AuthContext);
  const [teacher, setTeacher] = useState('');

  const bgClass = darkMode
    ? 'bg-gradient-to-r from-gray-800 to-gray-900'
    : 'bg-gradient-to-r from-blue-50 to-teal-50';
  const textClass = darkMode ? 'text-white' : 'text-gray-800';
  const subTextClass = darkMode ? 'text-gray-300' : 'text-gray-600';
  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-300';
  const sessionBadgeClass = darkMode
    ? 'bg-teal-900 text-teal-300'
    : 'bg-teal-100 text-teal-800';
  const notificationBgClass = darkMode
    ? 'bg-gray-700 hover:bg-gray-600'
    : 'bg-white hover:bg-gray-100';

  useEffect(() => {
    if (authState?.accessToken) {
      fetchTeacher();
    }
  }, [authState?.accessToken]);

  const fetchTeacher = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/classTeacher/fetch/single`, {
        accessToken: authState?.accessToken,
        class: authState?.userDetails?.currentClass,
        section: authState?.userDetails?.section
      });
      if (response.status === 200) {
        setTeacher(response.data.name);
      }
    } catch (error) {
      console.error("Error searching for teachers:", error);
      if (
        error.response &&
        error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
      ) {
        toast.warn('Access denied. Attempting to refresh token...');
        try {
          const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
          await fetchTeacher();
        } catch (refreshError) {
        }
      } else {
        toast.error(error.response?.data?.error || "An error occurred");
      }
    }
  }

  return (
    <div
      className={`
        w-full rounded-xl shadow-lg p-6 border 
        ${bgClass} ${borderClass}
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 mobile:max-tablet:flex-col mobile:max-tablet:text-center">
          <img
            src={authState?.userDetails?.profileLink || ProfileIcon}
            alt="Profile"
            className={`
              w-24 h-24 rounded-full border-4 
              ${darkMode ? 'border-gray-700' : 'border-white'} 
              shadow-md object-cover
            `}
          />
          <div>
            <h2 className={`text-2xl font-bold ${textClass} mb-1`}>
              Hi, {authState?.userDetails?.name}
            </h2>
            <div className={`text-sm ${subTextClass} space-y-1`}>
              <p>
                Class: {authState?.userDetails?.currentClass}-{authState?.userDetails?.section} |
                Roll No. {authState?.userDetails?.rollNumber}
              </p>
              <p>Class Teacher: {teacher || "Not found"}</p>
              <span
                className={`
                  inline-block px-3 py-1 rounded-full 
                  font-medium ${sessionBadgeClass}
                `}
              >
                {authState?.userDetails?.session}
              </span>
            </div>
          </div>
        </div>
        <div className="relative">
          <Badge
            badgeContent={4}
            color={darkMode ? "primary" : "error"}
            overlap="circular"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <button
              className={`
                p-2 rounded-full shadow-md 
                transition-colors duration-200 
                ${notificationBgClass}
              `}
            >
              <img
                src={NotificationIcon}
                alt="Notifications"
                className="w-8 h-8"
              />
            </button>
          </Badge>
        </div>
      </div>
    </div>
  );
}