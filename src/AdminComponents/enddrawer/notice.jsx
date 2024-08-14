import React from 'react';

export default function Notice(props) {
  return (
    <div className="mt-3 mb-30 ">
      <h4 className="font-normal text-sm">{props.title}</h4>
      <p className="text-gray-500 text-left text-xs">{props.description}</p>
    </div>
  );
}
