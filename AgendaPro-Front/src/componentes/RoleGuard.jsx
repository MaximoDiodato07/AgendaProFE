import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRole } from '../utils/role.utils'; 


const RoleGuard = ({ allowedRoles, children }) => {
    
    const userRole = getUserRole(); 
    
    if (userRole === null) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles.includes(userRole)) {
        return children; // <-- Componente a renderizar
    }
    

    return <Navigate to="/login" replace />;
    
};

export default RoleGuard;