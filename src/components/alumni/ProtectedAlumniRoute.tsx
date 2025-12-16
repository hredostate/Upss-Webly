import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAlumniAuth } from '../../context/AlumniAuthContext';
import { BrandSpinner } from '../common/BrandSpinner';

interface ProtectedAlumniRouteProps {
  children: ReactNode;
}

export function ProtectedAlumniRoute({ children }: ProtectedAlumniRouteProps) {
  const { user, profile, loading } = useAlumniAuth();

  if (loading) {
    return <BrandSpinner fullscreen label="Loading your alumni access" />;
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
