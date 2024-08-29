import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null); // Estado para almacenar el rol del usuario
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            if (token) {
                setIsAuthenticated(true);
                setLoading(false);
            } else {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.data.id_usuario);
        setUserRole(data.data.role); // Actualizar el rol en el estado
        setIsAuthenticated(true);
        console.log('User role set:', data.data.role);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setUserRole(null);
        setIsAuthenticated(false);
    };

    const hasRole = (role) => userRole === role;

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, userRole, hasRole, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
