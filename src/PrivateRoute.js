import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { isAuth } = useSelector(state => state.login);

    if (!isAuth) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    return children;
};




