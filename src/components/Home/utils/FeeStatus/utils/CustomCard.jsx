import React from 'react';

export default function FeeCard({ img, amount, title, color }) {
  return (
    <div className={`${color} rounded-lg shadow-md p-3 tablet:p-4 flex items-center space-x-3 tablet:space-x-4 transition-transform hover:scale-105`}>
      <img src={img} alt={title} className="w-8 h-8 tablet:w-12 tablet:h-12" />
      <div>
        <h3 className="text-sm tablet:text-lg font-semibold text-text_blue">{title}</h3>
        <p className="text-lg tablet:text-2xl font-bold text-text_blue">₹{amount.toLocaleString()}</p>
      </div>
    </div>
  );
}