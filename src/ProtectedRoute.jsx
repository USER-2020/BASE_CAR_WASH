import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';





const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>; // Puedes agregar un spinner de carga aquí
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
