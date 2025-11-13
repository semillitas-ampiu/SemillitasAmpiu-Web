import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext'; 


const PrivateRoute = ({ children }) => {
    const { usuario } = useContext(AuthContext);
    if (!usuario) {
        return <Navigate to="/login?message=Debe Iniciar Sesión para acceder" replace />;
    }


    return children;
};

export default PrivateRoute;