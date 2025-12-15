import { Navigate } from 'react-router';
import useRole from '../hooks/useRole';

const AdminRoute = ({ children }) => {
  const { role, roleLoading } = useRole();

  if (roleLoading) return <p>Loading...</p>;

  if (role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
