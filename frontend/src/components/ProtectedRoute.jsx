import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../App';

export function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !user.is_admin) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}
