import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronRight, FaCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function ExpansionTile({ title, childrens, image, alternateText, route, darkMode = false, isActive = false }) {
  const [expanded, setExpanded] = useState(isActive);

  const toggleExpanded = (e) => {
    if (childrens.length > 0) {
      e.preventDefault();
      setExpanded(!expanded);
    }
  };

  const childVariants = {
    hidden: { 
      height: 0,
      opacity: 0
    },
    visible: { 
      height: 'auto',
      opacity: 1,
      transition: { 
        height: {
          duration: 0.3
        },
        opacity: { 
          duration: 0.25,
          delay: 0.1
        }
      }
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: { 
        height: {
          duration: 0.2
        },
        opacity: { 
          duration: 0.15 
        }
      }
    }
  };

  const iconVariants = {
    collapsed: { rotate: 0 },
    expanded: { rotate: 90 }
  };

  const itemClasses = `
    flex  px-2 py-2 
    ${darkMode ? 'text-gray-200' : 'text-gray-700'}
    ${isActive ? (darkMode ? 'bg-transparent' : 'bg-transparent') : ''}
    rounded-lg transition-colors
  `;

  const childClasses = `
    flex items-center gap-2.5 pl-9 py-2.5 my-1 rounded-md
    ${darkMode 
      ? 'text-gray-300 hover:bg-gray-800' 
      : 'text-gray-600 hover:bg-purple-50'
    }
    cursor-pointer transition-colors
  `;

  const svgFilter = darkMode 
    ? 'invert(100%) opacity(80%)' 
    : 'none';

  return (
    <div className="w-full ">
      {childrens && childrens.length > 0 ? (
        <>
          <div className={itemClasses} onClick={toggleExpanded}>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 flex items-center justify-center rounded-md ${
                  isActive
                    ? darkMode
                      ? 'bg-purple-900/60 text-purple-400'
                      : 'bg-purple-200/70 text-purple-700'
                    : darkMode
                      ? 'bg-gray-800 text-gray-300'
                      : 'bg-gray-100 text-gray-500'
                }`}>
                  {image ? (
                    <img 
                      src={image} 
                      alt={alternateText} 
                      className="w-8 h-8 object-contain"
                      style={{ filter: svgFilter }} 
                    />
                  ) : (
                    <span className="text-lg">•</span>
                  )}
                </div>
                <span className={`text-base ${
                  isActive 
                    ? darkMode
                      ? 'text-purple-400 font-medium'
                      : 'text-purple-800 font-medium'
                    : 'font-normal'
                }`}>
                  {title}
                </span>
              </div>
              <motion.div
                variants={iconVariants}
                initial="collapsed"
                animate={expanded ? "expanded" : "collapsed"}
                transition={{ duration: 0.2 }}
              >
                <FaChevronRight size={12} className={isActive && darkMode ? 'text-purple-400' : isActive ? 'text-purple-600' : ''} />
              </motion.div>
            </div>
          </div>
          
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                variants={childVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="overflow-hidden ml-2 mr-1 mt-1"
              >
                {childrens.map((child, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link to={child.route} className={childClasses}>
                      <FaCircle size={6} className={darkMode ? 'text-purple-400' : 'text-purple-600'} />
                      <span className="text-sm">{child.text}</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <Link to={route} className={itemClasses}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 flex items-center justify-center rounded-md ${
              isActive
                ? darkMode
                  ? 'bg-purple-900/60 text-purple-400'
                  : 'bg-purple-200/70 text-purple-700'
                : darkMode
                  ? 'bg-gray-800 text-gray-300'
                  : 'bg-gray-100 text-gray-500'
            }`}>
              {image ? (
                <img 
                  src={image} 
                  alt={alternateText} 
                  className="w-8 h-8 object-contain"
                  style={{ filter: svgFilter }} 
                />
              ) : (
                <span className="text-lg">•</span>
              )}
            </div>
            <span className={`text-base ${
              isActive 
                ? darkMode
                  ? 'text-purple-400 font-medium'
                  : 'text-purple-800 font-medium'
                : 'font-normal'
            }`}>
              {title}
            </span>
          </div>
        </Link>
      )}
    </div>
  );
}

export default ExpansionTile;