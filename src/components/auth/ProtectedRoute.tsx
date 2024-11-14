import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  userType: 'admin' | 'merchant';
}

export function ProtectedRoute({ children, userType }: ProtectedRouteProps) {
  const { isAuthenticated, userType: currentUserType } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (currentUserType !== userType) {
    return <Navigate to={`/${currentUserType}`} replace />;
  }

  return <>{children}</>;
}