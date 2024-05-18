import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';

const PrivateRoutes = ({ children }) => {
    const { authState } = useContext(AuthContext);

    if (!authState.accessToken) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoutes;
