import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import { AuthProvider } from '../AuthContext';
import ProtectedRoute from '../ProtectedRoute';
import Home from '../components/Home';
import PurchaseService from '../components/PurchaseService';
import YourReservations from '../components/YouReservation';
import AdminDashboard from '../components/Admin/dashboardAdmin';

const AppRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route
            path="/Home"
            element={
              <ProtectedRoute >
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Services-items"
            element={
              <ProtectedRoute >
                <PurchaseService />
              </ProtectedRoute>
            }
          />
          <Route
            path="/yourReservations"
            element={
              <ProtectedRoute >
                <YourReservations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute >
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;
