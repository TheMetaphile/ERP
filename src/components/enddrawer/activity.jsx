import React from 'react';
import Clock from './../../assets/clock-blue.png';

export default function Activity(props) {
  return (
    <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="p-4">
        <h3 className="font-semibold text-lg text-teal-800 mb-2">{props.title}</h3>
        
        <div className="flex items-start space-x-4">
          {/* <img 
            src={props.image} 
            alt={props.title} 
            className="w-12 h-12 object-cover rounded-lg shadow-md" 
          /> */}
          
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <img src={Clock} alt="Clock" className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium text-teal-700">{props.time}</span>
            </div>
            
            <p className="text-sm text-gray-600 line-clamp-3">{props.description}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-teal-200 px-4 py-2">
        <button className="text-teal-800 font-medium text-sm hover:text-teal-600 transition-colors duration-200">
          Learn More
        </button>
      </div>
    </div>
  );
}