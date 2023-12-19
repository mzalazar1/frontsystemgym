import React from 'react';
import { useSelector } from 'react-redux';



const AuthorizationComponent = ({ requiredRole, children }) => {

    const rolesData = useSelector((state) => state.empleados); // Ajusta esto según tu estructura de almacenamiento
    // Verificar si el usuario tiene el rol necesario
    const userEmail = localStorage.getItem('email');
    const userRole = rolesData.find((user) => user.mail === userEmail)?.rol;

    const hasRequiredRole = userRole === requiredRole;

    // Renderizar el contenido solo si el usuario tiene el rol necesario
    return hasRequiredRole ? <>{children}</> : null;
};

export default AuthorizationComponent;