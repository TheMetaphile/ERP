import React, { useContext, useEffect } from 'react';
import AuthContext from './Context/AuthContext';

const BeforeUnloadProvider = ({ children }) => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      event.preventDefault();
      // Chrome requires returnValue to be set.
      event.returnValue = '';
      await logout();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [logout]);

  return <>{children}</>;
};

export default BeforeUnloadProvider;
