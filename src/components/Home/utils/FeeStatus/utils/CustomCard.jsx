import React from 'react';

export default function FeeCard({
  img,
  amount,
  title,
  color,
  darkMode,
  textColor
}) {

  const titleTextClass = darkMode
    ? 'text-gray-300'
    : 'text-text_blue';
  const amountTextClass = darkMode
    ? (textColor || 'text-white')
    : 'text-text_blue';
  const bgColorClass = darkMode
    ? (color.replace('bg-', 'bg-') + ' bg-opacity-20')
    : color;

  return (
    <div
      className={`
        ${bgColorClass} 
        rounded-lg shadow-md 
        p-3 tablet:p-4 
        flex items-center 
        space-x-3 tablet:space-x-4 
        transition-transform 
        hover:scale-105
      `}
    >
      <img
        src={img}
        alt={title}
        className="w-8 h-8 tablet:w-12 tablet:h-12"
      />
      <div>
        <h3
          className={`
            text-sm tablet:text-lg 
            font-semibold 
            ${titleTextClass}
          `}
        >
          {title}
        </h3>
        <p
          className={`
            text-lg tablet:text-2xl 
            font-bold 
            ${amountTextClass}
          `}
        >
          ₹{amount.toLocaleString()}
        </p>
      </div>
    </div>
  );
}