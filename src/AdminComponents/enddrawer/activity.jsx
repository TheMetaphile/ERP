import React, { useContext } from 'react';
import Clock from './../../assets/clock-blue.png';
import AuthContext from '../../Context/AuthContext';

export default function Activity(props) {
  const { darkMode } = useContext(AuthContext);

  return (
    <div className={`w-88 h-17 rounded-xl text-left mt-2 mb-3 shadow-md pl-1 pr-2 pb-1 pt-1 ${darkMode
      ? 'bg-gray-800 border border-gray-700 text-gray-200'
      : 'bg-teal-100 border border-gray-300 text-gray-800'
      }`}>
      <p className={`font-normal text-sm ${darkMode ? 'text-gray-200' : ''}`}>{props.title}</p>

      <div className="flex items-start mt-2">
        <img src={props.image} alt="Ballroom" className="w-16 h-16" />
        <div className={`text-xs font-normal ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <div className="flex items-center">
            <img src={Clock} alt="Clock" className="w-4 h-4" />
            <span className="font-medium ml-2 text-xs whitespace-nowrap">{props.time}</span>
          </div>
          <p className="font-normal mt-1 ml-1 text-justify">{props.description}</p>
        </div>
      </div>
    </div>
  );
}