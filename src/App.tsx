import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { MerchantDashboard } from './pages/merchant/MerchantDashboard';
import { LoginPage } from './pages/auth/LoginPage';
import { useAuthStore } from './stores/authStore';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { Toast } from './components/notifications/Toast';
import { useToast } from './hooks/useToast';

function App() {
  const { isAuthenticated, userType } = useAuthStore();
  const { isVisible, message, type, hideToast } = useToast();

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <ProtectedRoute userType="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />

          {/* Merchant Routes */}
          <Route path="/merchant/*" element={
            <ProtectedRoute userType="merchant">
              <MerchantDashboard />
            </ProtectedRoute>
          } />

          {/* Default redirect based on user type */}
          <Route path="/" element={
            isAuthenticated ? (
              <Navigate to={userType === 'admin' ? '/admin' : '/merchant'} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
        </Routes>

        {isVisible && (
          <div className="fixed bottom-4 right-4 z-50">
            <Toast
              type={type}
              message={message}
              onClose={hideToast}
            />
          </div>
        )}
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;