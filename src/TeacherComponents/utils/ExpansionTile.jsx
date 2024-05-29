import React, { useState } from 'react';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import ImageTextInRow from '../drawer/ImageTextInRow';
import { Link } from 'react-router-dom';

function ExpansionTile({ title, childrens, image, alternateText, route }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`${expanded ? 'bg-secondary rounded-xl px-2 py-3 mb-2' : 'px-2 py-3'}`}>
      {childrens.length > 0 
      ? 
      (
        <div className="cursor-pointer flex justify-between items-center" onClick={toggleExpanded}>
          <div className="flex">
            <img src={image} alt={alternateText} className="w-7 mr-3" />
            <span className="ttablet:text-lg mobile:max-tablet:text-sm whitespace-nowrap">{title}</span>
          </div>
          {expanded ? <FaAngleUp /> : <FaAngleDown />}
        </div>
      ) 
      : 
      (
        <Link to={route} className="flex justify-start items-center ">
          
            <img src={image} alt={alternateText} className="w-7 mr-3" />
            <span className="tablet:text-lg mobile:max-tablet:text-sm whitespace-nowrap">{title}</span>
          
        </Link>
      )
      }
      <div className={`transition-all duration-800 overflow-hidden self-center items-center ${expanded ? 'h-fit' : 'h-0'}`}>
        {childrens.map((children, index) => (
          <ImageTextInRow key={index} text={children.text} route={children.route} />
        ))}
      </div>
    </div>
  );
}

export default ExpansionTile;
