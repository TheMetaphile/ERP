import React, { useState } from 'react';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'; // Example icons from react-icons library
import ImageTextInRow from '../drawer/ImageTextInRow';
import { Link } from 'react-router-dom';

function ExpansionTile({ title, childrens ,image, alternateText,route}) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`${expanded ? 'bg-secondary rounded-xl px-2 py-3 mb-2' : 'px-2 py-3'}`}>
      <Link to={route} onClick={toggleExpanded} className="cursor-pointer flex justify-between items-center ">
      <div className='flex'>
      <img src={image} alt={alternateText} className="w-7 mr-3" />
        <span className='text-lg'>{title}</span>
      </div>
        {childrens.length>0 ? expanded ? <FaAngleUp /> : <FaAngleDown /> : <></>}
      </Link>
      <div className={`overflow-hidden self-center items-center ${expanded ? 'h-auto' : 'h-0'}`}>
      {childrens.map((children, index) => (
            <ImageTextInRow
              key={index}
              text={children.text}
              route={children.route}
            />
          ))}
      </div>
    </div>
  );
}

export default ExpansionTile;
