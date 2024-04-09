import React, { useState, useEffect } from 'react';

export default function LinearProgressBar({ value, max }) {
  const [progressWidth, setProgressWidth] = useState(0);

  // Update progress width whenever value or max changes
  useEffect(() => {
    // Calculate target width based on value and max
    const targetWidth = `${(value / max) * 100}%`;

    // Update progressWidth to targetWidth with a transition
    setProgressWidth(targetWidth);
  }, [value, max]);

  // Define colors based on progress value
  const progressBarColor =
    (value / max) < 0.40 ? 'bg-red-500' : (value / max) < 0.70 ? 'bg-yellow-500' : 'bg-green-500';
  const trackColor =
    (value / max) < 0.40 ? 'bg-red-200' : (value / max) < 0.70 ? 'bg-yellow-200' : 'bg-green-200';

  return (
    <div className={`flex-1 h-3 rounded-xl overflow-hidden ${trackColor}`}>
      <div
        className={`h-full rounded-xl ${progressBarColor}`}
        style={{ width: progressWidth, transition: 'width 0.3s' }}
      ></div>
    </div>
  );
}
