import React, { useEffect } from 'react';

const BeforeUnloadProvider = ({ children }) => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      // Chrome requires returnValue to be set.
      event.returnValue = ''; 
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return <>{children}</>;
};

export default BeforeUnloadProvider;
