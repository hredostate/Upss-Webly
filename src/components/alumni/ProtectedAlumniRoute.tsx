import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAlumniAuth } from '../../context/AlumniAuthContext';

interface ProtectedAlumniRouteProps {
  children: ReactNode;
}

export function ProtectedAlumniRoute({ children }: ProtectedAlumniRouteProps) {
  const { user, profile, loading } = useAlumniAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/alumni/login" replace />;
  }

  // If user exists but no profile, redirect to complete registration
  if (!profile) {
    return <Navigate to="/alumni/register" replace />;
  }

  return <>{children}</>;
}
